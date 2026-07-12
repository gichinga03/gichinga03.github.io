/**
 * PROJECTS
 * ------------------------------------------------------------
 * To add a new project, copy one object below (between the {
 * and }, comma-separated) and edit the fields. That's it —
 * the site rebuilds the grid automatically.
 *
 * Fields:
 *   title       - project name (string)
 *   summary     - 1-2 sentence description (string)
 *   tags        - short list of tech/skill tags (array of strings)
 *   type        - one of "tool" | "writeup" | "research"  (controls the badge)
 *   link        - URL to GitHub repo, writeup, or blog post (string, optional)
 *   linkLabel   - text for the link button, e.g. "View on GitHub" (string, optional)
 *   featured    - true to visually highlight this card (boolean, optional)
 * ------------------------------------------------------------
 */

const PROJECTS = [
  {
    title: "PentestReporter",
    summary: "An AI-assisted pipeline that turns raw pentest evidence — screenshots, tool exports, and rough notes — into structured, client-ready report drafts. Runs locally on modest hardware using quantized models and retrieval-augmented generation.",
    tags: ["Python", "RAG", "Local LLMs", "OOP", "Report Automation"],
    type: "tool",
    link: "",
    linkLabel: "View on GitHub",
    featured: true
  },
  {
    title: "Custom C2 Server (C#)",
    summary: "A from-scratch command-and-control server built in C#, using heap-memory techniques to reduce on-disk and in-memory footprint for stealthier operation during red team engagements.",
    tags: ["C#", "C2 Development", "Evasion", ".NET Internals"],
    type: "tool",
    link: "",
    linkLabel: "View on GitHub"
  },
  {
    title: "GreenHarvest — Inventory Management Backend",
    summary: "A Spring Boot backend for inventory management, built with modular auth scaffolding and integrated into a larger multi-service project. Included for engineering breadth alongside the offensive security work.",
    tags: ["Java", "Spring Boot", "REST APIs", "Auth"],
    type: "tool",
    link: "",
    linkLabel: "View on GitHub"
  }
];
