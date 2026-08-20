/**
 * SITE CONFIG
 * ------------------------------------------------------------
 * Edit the values below to update your site. You should not
 * need to touch index.html, style.css, or main.js for basic
 * changes — everything editable lives in this file and in
 * js/projects.js.
 * ------------------------------------------------------------
 */

const SITE_CONFIG = {
  name: "Maxwell Gichinga Mwaura",
  shortName: "M. Gichinga Mwaura",
  handle: "0x4D67",                 // shown in the nav / terminal readout
  role: "Offensive Security Engineer",
  location: "Nairobi, Kenya",
  tagline: "I break Active Directory environments for a living — then write down exactly how, so defenders can close the gap.",

  // Short bio — a couple of sentences, plain language, no jargon overload.
  bio: [
    "I'm a fourth-year Computer Science student at the University of Nairobi, focused on offensive security and Active Directory red teaming.",
    "My work centers on adversary emulation — foothold, privilege escalation, lateral movement, and persistence — practiced in live lab ranges and documented like production engagements. I'm currently building toward full-time and remote red team roles across Kenya and internationally."
  ],

  email: "gichinga03@example.com",          // TODO: replace
  github: "https://github.com/gichinga03", // TODO: replace
  linkedin: "https://linkedin.com/in/gichinga03", // TODO: replace
  twitter: "",                               // optional, leave blank to hide
  // Path to your resume PDF. Drop your file at assets/resume.pdf (same
  // filename) and it'll work as-is. Set to "" to hide the resume button/link entirely.
  resumeUrl: "assets/resume.pdf",

  certifications: [
    { code: "PNPT",   name: "Practical Network Penetration Tester", issuer: "TCM Security" },
    { code: "CRTP",   name: "Certified Red Team Professional",      issuer: "Altered Security" },
    { code: "CRTO",   name: "Certified Red Team Operator",          issuer: "Zero-Point Security" },
    { code: "CRTO II",name: "Certified Red Team Operator II",       issuer: "Zero-Point Security" },
    { code: "CARTE",  name: "Certified Azure Red Team Expert",     issuer: "Altered Security" }
  ],

  // Kill-chain style skill stages. Each "stage" is a real phase of an
  // engagement — edit freely, add/remove skills per stage.
  stages: [
    {
      id: "recon",
      label: "Recon",
      skills: ["OSINT & attack surface mapping", "AD enumeration (BloodHound, PowerView)", "Service & SPN discovery"]
    },
    {
      id: "access",
      label: "Initial Access",
      skills: ["Phishing & payload delivery", "C2 frameworks (Cobalt Strike)", "Token impersonation"]
    },
    {
      id: "escalate",
      label: "Escalate",
      skills: ["Kerberoasting / AS-REP roasting", "Constrained & unconstrained delegation abuse", "ACL / GPO abuse"]
    },
    {
      id: "lateral",
      label: "Lateral Movement",
      skills: ["S4U2Self / S4U2Proxy abuse", "Trust & forest boundary traversal", "SID filtering bypass techniques"]
    },
    {
      id: "persist",
      label: "Persist & Evade",
      skills: ["Malleable C2 profile tuning", "EDR / detection evasion", "OPSEC-conscious tradecraft"]
    }
  ],

  // Free-form tool chips shown under "Toolkit"
  toolkit: [
    "Cobalt Strike", "BloodHound", "Rubeus", "Mimikatz", "PowerView",
    "Impacket", "Burp Suite", "Nmap", "C#", "Python", "PowerShell", "GO"
  ]
};
