# MedLine Platform: recruiter brief

| Field | Summary |
| --- | --- |
| Developer | Mohamed Yassine Turki |
| Discipline | Full-stack application engineering |
| Context | Production medical education platform for first-year medical students in Tunisia |
| Live product | https://medlineplatform.com |
| GitHub | https://github.com/MohamedYassineTurki |

## Project summary

Developed a full-stack learning platform that connects a structured course library, video lessons, documents, corrected QCM practice, live sessions, replay collections, tutor interaction, wallet-funded subscriptions, and administration in a single product.

The application supports three role-specific experiences: students, tutors, and administrators. Its scope includes frontend interfaces, server-side business workflows, relational persistence, external services, reporting, regression tests, and containerized delivery configuration.

## Technical capabilities demonstrated

| Capability | Project evidence |
| --- | --- |
| TypeScript and React development | Typed domain functions, reusable components, interactive learning and administration screens |
| Next.js application architecture | App Router, Server Components, Server Actions, role-specific layouts |
| Relational modeling | PostgreSQL, Drizzle ORM, content relationships, versioned SQL migrations |
| Business workflow design | Payment review, wallet balances, plan purchase, subscription lifecycle |
| Assessment tooling | Corrected multiple-choice practice and validated spreadsheet imports |
| Service integration | Video delivery, PDF processing, transactional email, live-session links |
| Data and reporting | Learning activity, content engagement, audience filters, reporting-period comparisons |
| Testing | Focused TypeScript unit tests and separate integration/browser scenarios |
| Application delivery | Multi-stage Docker builds and deployment configuration |

## Evidence

- The product is publicly accessible at its live domain.
- The reviewed source contains 22 focused TypeScript test modules and 42 SQL migration files.
- Screenshots in this showcase come from public product pages and are labeled with their context.
- Production source remains private; this repository provides architecture, implementation narratives, and verification notes.

For technical discussion, start with [the engineering case study](engineering-case-study.md), then [architecture](architecture.md) and [quality](quality.md).
