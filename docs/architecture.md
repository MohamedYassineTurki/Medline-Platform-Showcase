# Conceptual architecture

MedLine is a full-stack Next.js application organized into domain modules. It is presented here as a modular application, not as a microservices system.

```mermaid
flowchart TB
    subgraph Experiences
        S[Student learning experience]
        T[Tutor workspace]
        A[Administration workspace]
    end
    S --> UI[React interfaces and Next.js application]
    T --> UI
    A --> UI
    UI --> D[Domain services and server-side workflows]
    D --> L[Learning and assessment]
    D --> C[Community and communication]
    D --> B[Wallet and subscriptions]
    D --> R[Progress and reporting]
    L --> DB[Relational persistence]
    C --> DB
    B --> DB
    R --> DB
    L --> M[External media services]
    C --> E[Transactional messaging]
    D --> O[Application operations]
```

This diagram shows logical responsibilities, not production network topology, hostnames, endpoint inventories, or security configuration.

## Application responsibilities

| Layer | Responsibility | Representative technologies |
| --- | --- | --- |
| Experience | Role-specific navigation, learning screens, forms, charts, and responsive layouts | React, Tailwind CSS, Lucide, Recharts |
| Application | Rendering, user workflows, requests, and server-side mutations | Next.js App Router, Server Components, Server Actions |
| Domain | Content organization, assessment, subscriptions, community, reporting | TypeScript, Zod |
| Persistence | Related business records, transactions, schema evolution | PostgreSQL, Drizzle ORM, SQL migrations |
| Integrations | Video delivery, document processing, transactional messages | Media provider, PDF.js, email provider |
| Delivery | Packaged application builds and environment-specific runtime configuration | Docker, Docker Compose, Dokploy-oriented configuration |

## Domain model at a public level

```mermaid
flowchart LR
    Subject[Subject] --> Course[Course]
    Course --> Lessons[Ordered lessons]
    Course --> Questions[Practice questions]
    Lessons --> Documents[Supporting documents]
    Subject --> Live[Live sessions]
    Live --> Replay[Replay collections]
    Replay --> Parts[Recording parts]
    Student[Student experience] --> Study[Learning progress]
    Student --> Access[Subscription experience]
    Student --> Support[Tutor conversations]
```

These are product concepts rather than a database schema. The production schema, identifiers, storage layout, and access-policy implementation are not distributed here.

## Key architectural choices

**A shared application with domain boundaries.** Student, tutor, and administrator workflows share common infrastructure and reusable services. This keeps connected product behavior in one deployable application while separating responsibilities in the codebase.

**Relational persistence for business state.** Content, subscriptions, transactions, and learning activity have meaningful relationships. PostgreSQL and Drizzle support those relationships, transactional updates, and incremental schema evolution.

**External media delivery.** The platform integrates a specialist provider for video delivery while keeping catalog organization, the learning interface, documents, and related workflows in the application.

**Background communication.** Follow-up messages are handled through explicit delivery workflows, separately from the interactive learning experience.

**Domain-aware reporting.** Reporting considers learning context and local calendar periods instead of treating every page interaction as equivalent.

The public showcase makes no claim about audited security, regulatory certification, production load capacity, or uptime guarantees.
