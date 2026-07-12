/**
 * WRITEUPS
 * ------------------------------------------------------------
 * Blog posts, lab writeups, and research notes — shown in their
 * own section, separate from tools/projects.
 *
 * To add one, copy an object below and edit the fields:
 *   title    - post title (string)
 *   date     - short date label, e.g. "Jun 2026" (string)
 *   excerpt  - 1-2 sentence summary (string)
 *   tags     - short list of topics (array of strings, optional)
 *   link     - URL to the full post (string, optional — leave ""
 *              if not published yet, it'll show as "coming soon")
 * ------------------------------------------------------------
 */

const WRITEUPS = [
  {
    title: "Cross-Forest Trust Abuse in a Live CRTO Lab",
    date: "2026",
    excerpt: "Walking through a multi-domain attack chain — token impersonation for a foothold, constrained delegation abuse to reach SQL, and enumeration of a one-way forest trust with SID filtering active.",
    tags: ["Active Directory", "Kerberos", "Trust Abuse"],
    link: ""
  },
  {
    title: "Fixing a Malformed SPN in Rubeus: A Debugging Log",
    date: "2026",
    excerpt: "A short field note on tracking down and resolving an SPN formatting issue that was silently breaking S4U2Proxy requests mid-chain.",
    tags: ["Kerberos", "Rubeus", "Debugging"],
    link: ""
  },
  {
    title: "What OPSEC Failures Actually Cost You in a Red Team Exam",
    date: "2026",
    excerpt: "Notes from a CRTO retake — on how detection evasion and Malleable C2 profile hygiene matter as much as the technical attack path itself.",
    tags: ["OPSEC", "Cobalt Strike", "Detection Evasion"],
    link: ""
  }
];
