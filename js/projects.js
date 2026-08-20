/**
 * PROJECTS
 * ------------------------------------------------------------
 * To add a new project, copy one object below (between the {
 * and }, comma-separated) and edit the fields. That's it —
 * the projects hub grid AND the individual project page both
 * rebuild automatically. You never need to create a new HTML
 * file per project: project.html is a single template that
 * looks up the right entry by `slug` from the URL
 * (project.html?slug=your-slug).
 *
 * Fields:
 *   slug        - short URL-safe id, unique, no spaces (string) — required
 *   title       - project name (string)
 *   summary     - 1-2 sentence description, used on the hub card (string)
 *   tags        - short list of tech/skill tags (array of strings)
 *   type        - one of "tool" | "writeup" | "research"  (controls the badge)
 *   status      - short status label, e.g. "In development" (string, optional)
 *   link        - URL to GitHub repo, writeup, or blog post (string, optional)
 *   linkLabel   - text for the link button, e.g. "View on GitHub" (string, optional)
 *   featured    - true to visually highlight this card (boolean, optional)
 *   details     - array of paragraph strings for the full project page
 *                 (optional — falls back to `summary` if omitted)
 *   highlights  - array of short bullet strings for the full project page
 *                 (optional — omit the whole section if not needed)
 * ------------------------------------------------------------
 */

const PROJECTS = [
  {
    slug: "pentestreporter",
    title: "PentestReporter",
    summary: "An AI-assisted pipeline that turns raw pentest evidence — screenshots, tool exports, and rough notes — into structured, client-ready report drafts. Runs locally on modest hardware using quantized models and retrieval-augmented generation.",
    tags: ["Python", "RAG", "Local LLMs", "OOP", "Report Automation"],
    type: "tool",
    status: "In development",
    link: "",
    linkLabel: "View on GitHub",
    featured: true,
    details: [
      "PentestReporter takes the least enjoyable part of an engagement — turning a folder of screenshots, tool exports, and scratch notes into a structured report — and automates the first pass of it.",
      "It runs entirely on local, quantized LLMs via Ollama, so evidence never leaves the machine it was collected on. A retrieval-augmented generation layer keeps each finding grounded in an Evidence ID that traces back to the exact screenshot or tool output it came from, rather than letting the model invent detail.",
      "The goal isn't to replace the write-up — it's to remove the blank-page problem and let more time go toward the technical narrative and remediation guidance that actually needs a human."
    ],
    highlights: [
      "Local-only inference — no evidence leaves the host",
      "Evidence ID system traces every claim back to its source",
      "RAG architecture to keep generated findings grounded"
    ]
  },
  {
    slug: "custom-c2-csharp",
    title: "Custom C2 Server (C#)",
    summary: "A from-scratch command-and-control server built in C#, using heap-memory techniques to reduce on-disk and in-memory footprint for stealthier operation during red team engagements.",
    tags: ["C#", "C2 Development", "Evasion", ".NET Internals"],
    type: "tool",
    status: "",
    link: "",
    linkLabel: "View on GitHub",
    details: [
      "A command-and-control server built from scratch in C# as a way to get hands-on with .NET internals and evasion tradecraft, rather than relying on an off-the-shelf framework.",
      "The implant leans on heap-memory techniques to keep its on-disk and in-memory footprint small, aiming to reduce the signal available to EDR and memory-scanning defenses during an engagement."
    ],
    highlights: [
      "Heap-memory techniques for a reduced footprint",
      "Built without a framework, to understand every layer",
      "Used as a learning vehicle ahead of AlloyNet (Go/Rust)"
    ]
  },
  {
    slug: "greenharvest",
    title: "GreenHarvest — Inventory Management Backend",
    summary: "A Spring Boot backend for inventory management, built with modular auth scaffolding and integrated into a larger multi-service project. Included for engineering breadth alongside the offensive security work.",
    tags: ["Java", "Spring Boot", "REST APIs", "Auth"],
    type: "tool",
    status: "",
    link: "",
    linkLabel: "View on GitHub",
    details: [
      "GreenHarvest is a Spring Boot backend for inventory management, covering JWT-based auth, role-based access control, and a PostgreSQL data layer.",
      "It follows a feature-per-module package structure — each domain area (inventory, adjustments, auth) is self-contained — which has become a personal convention carried across other backend projects."
    ],
    highlights: [
      "JWT auth + RBAC",
      "PostgreSQL persistence layer",
      "Inventory Adjustment Module",
      "Feature-per-module package structure"
    ]
  }
];
