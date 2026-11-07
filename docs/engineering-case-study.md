# Engineering case study

## The product problem

First-year medical study brings together a large body of material, repeated practice, and questions that need human support. A useful platform must organize that work for students while giving the teaching team a manageable way to publish and operate it.

MedLine brings the study experience and its operational workflows into one full-stack application: content organization, lesson playback, documents, QCM correction, live events, replays, tutor conversations, payment review, subscriptions, and administrative reporting.

## Engineering scope

The project represents full-stack application development: React interfaces, Next.js server-side flows, TypeScript domain logic, PostgreSQL modeling, third-party integrations, reporting, regression tests, and container-oriented deployment configuration. The current implementation supports student, tutor, and administrator experiences within a shared application.

## Content architecture: one learning model, several formats

**Challenge:** Courses, individual lessons, assessment questions, documents, and replays need consistent organization and navigation.

**Approach:** The application models subjects and courses alongside ordered lessons, assessments, attachments, and recording collections. Dedicated administration interfaces manage publication and ordering. Replay collections support multiple video parts and aggregate duration information. Search brings lesson and recording results into a shared discovery experience.

**Engineering value:** Content remains connected to the learning journey. Common concerns such as ordering, access experience, and document presentation can be handled coherently across different formats.

## Subscription operations: coordinate a complete business workflow

**Challenge:** A plan purchase changes multiple pieces of state: available balance, plan selection, access duration, and transaction history.

**Approach:** The implementation validates purchases on the server and groups related database mutations into transactions. Subject-specific and broader-access plans share a common purchase experience. The wallet workflow supports payment requests and administrator review, reflecting the payment methods used by the product's audience.

**Engineering value:** The feature goes beyond a pricing page. It connects the customer experience, relational persistence, and the administration work required to run a subscription product.

## Tutor support: model responsibilities, not just messages

**Challenge:** Students need contextual help, while tutors need conversations related to the subjects they support and administrators need oversight tools.

**Approach:** The forum supports subject spaces, student/staff conversations, announcements, attachments, unread state, and tutor assignments. The client updates conversations incrementally. Background email follow-up is modeled separately from the interactive request, with delivery state and retry handling.

**Engineering value:** Conversation, role responsibility, and notifications are treated as connected application concerns. It is more substantial than linking users to an external chat group.

## Assessment publishing: turn editorial material into usable practice

**Challenge:** A large assessment library needs efficient content entry and clear feedback when an import is malformed.

**Approach:** The QCM workflow supports question editing and spreadsheet-based import with validation and structured feedback. The learner interface distinguishes correct, incomplete, and incorrect selections and provides corrections and navigation.

**Engineering value:** The feature addresses both sides of the assessment workflow: publisher productivity and the student's practice experience. It is presented as practice and correction, not as a certified examination or adaptive-learning system.

## Reporting: distinguish learning activity from browser activity

**Challenge:** An open browser tab is not the same thing as active learning, and reporting periods need consistent local calendar behavior.

**Approach:** The implementation separates activity context, engagement signals, visits, and reporting windows. Client coordination reduces duplicate activity across tabs. Server-side aggregation supports activity summaries, content breakdowns, audience filters, and period comparisons.

**Engineering value:** The reporting design reflects domain meaning. It provides a foundation for operational decisions rather than relying solely on traffic counters.

## Delivery and maintainability

The codebase separates route-level experiences, reusable interface components, domain functions, service integrations, and relational persistence. Versioned migrations document schema evolution. The deployment configuration uses multi-stage container builds, runtime configuration, and persistent storage responsibilities.

Focused unit tests cover domain behavior such as reporting periods, engagement calculations, assessment import, document composition, and email delivery handling. Additional integration and browser scenarios exist for cross-layer workflows. [Verification scope](quality.md).

## What this demonstrates in an interview

- Translating a real product's student, teaching, and administration needs into application workflows.
- Working across UI composition, server-side logic, relational data, and external integrations.
- Reasoning about transactions, role-specific responsibilities, notification delivery, and time-aware reporting.
- Maintaining a changing production codebase through migrations and focused regression tests.

The diagrams and descriptions in this showcase intentionally explain responsibilities and engineering decisions at a public level. Production implementation and operational configuration remain private.
