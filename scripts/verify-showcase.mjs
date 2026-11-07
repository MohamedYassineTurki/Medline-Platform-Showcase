import fs from "node:fs/promises";
import path from "node:path";

const roots = new Set(["README.md", "NOTICE.md", ".gitignore", ".gitattributes", "project-summary.json"]);
const folders = new Set(["assets", "docs", "scripts", ".github"]);
const required = ["README.md", "project-summary.json", "assets/cover.svg", "assets/medline-logo.svg", "docs/recruiter-brief.md", "docs/engineering-case-study.md", "docs/architecture.md", "docs/quality.md", "docs/evidence.md", "docs/product-tour.md"];
const failures = [];
let inspected = 0;
const credentialPatterns = [
  /(?:ntn_|secret_)[a-zA-Z0-9]{20,}/,
  /(?:gh[pousr]_|github_pat_)[a-zA-Z0-9_]{30,}/,
  /sk-(?:proj-)?[a-zA-Z0-9_-]{30,}/,
  /AIza[a-zA-Z0-9_-]{30,}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(?:postgres(?:ql)?|redis):\/\/[^\s]+/i,
  /C:[\\/]+Users[\\/]+[^\s]+/i
];

async function walk(directory = ".") {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const file = path.join(directory, entry.name);
    const relative = path.relative(".", file).split(path.sep).join("/");
    if (directory === "." && !roots.has(entry.name) && !folders.has(entry.name)) failures.push(`Unexpected root entry: ${relative}`);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (/\.(sql|db|sqlite|dump|zip|log|ts|tsx)$/i.test(entry.name) || entry.name.startsWith(".env")) failures.push(`Disallowed release file: ${relative}`);
    const data = await fs.readFile(file);
    inspected += 1;
    if (entry.name.endsWith(".png")) {
      if (data.length < 5000 || data.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") failures.push(`Invalid screenshot: ${relative}`);
      continue;
    }
    const text = data.toString("utf8");
    for (const pattern of credentialPatterns) if (pattern.test(text)) failures.push(`Sensitive-looking material: ${relative}`);
    if (entry.name.endsWith(".md")) {
      const links = [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
      for (const link of links) {
        if (/^(https?:|mailto:|#)/.test(link)) continue;
        const target = path.resolve(path.dirname(file), link.split("#")[0]);
        try { await fs.access(target); } catch { failures.push(`Broken local link in ${relative}: ${link}`); }
      }
    }
    if (entry.name.endsWith(".svg") && /<script\b|<foreignObject\b|https?:\/\//i.test(text.replace('xmlns="http://www.w3.org/2000/svg"', ""))) failures.push(`Unexpected active or remote SVG content: ${relative}`);
  }
}

for (const file of required) { try { await fs.access(file); } catch { failures.push(`Missing document: ${file}`); } }
await walk();
const summary = JSON.parse(await fs.readFile("project-summary.json", "utf8"));
if (summary.roles?.length !== 3 || summary.sourceReviewEvidence?.focusedTypeScriptTestModules !== 22) failures.push("Structured summary does not match reviewed scope.");
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log(`Showcase checks passed: ${inspected} files, local documentation links, image signatures, release scope and common credential patterns.`);
