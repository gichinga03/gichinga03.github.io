/**
 * MAIN.JS
 * Renders content from config.js and projects.js into the DOM,
 * plus a few small interactions (typewriter, scroll reveal).
 * You shouldn't need to edit this file for normal content updates.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderIdentity();
  renderCerts();
  renderChain();
  renderToolkit();
  renderProjects();
  renderWriteups();
  renderContact();
  initTypewriter();
  initScrollReveal();
});

/* ---------------- Identity / hero / about ---------------- */
function renderIdentity() {
  const c = SITE_CONFIG;

  document.title = `${c.name} — ${c.role}`;
  document.getElementById("nav-handle").textContent = c.handle;
  document.getElementById("footer-name").textContent = c.name;

  const nameParts = c.name.split(" ");
  const heroName = document.getElementById("hero-name");
  if (heroName) {
    const last = nameParts.pop();
    heroName.innerHTML = `${nameParts.join(" ")}<br><span class="accent">${last}</span>`;
  }

  const tagline = document.getElementById("hero-tagline");
  if (tagline) tagline.textContent = c.tagline;

  const heroActions = document.getElementById("hero-actions");
  if (heroActions && c.resumeUrl && c.resumeUrl.trim() !== "") {
    const resumeBtn = document.createElement("a");
    resumeBtn.href = c.resumeUrl;
    resumeBtn.target = "_blank";
    resumeBtn.rel = "noopener noreferrer";
    resumeBtn.className = "btn btn-ghost";
    resumeBtn.textContent = "Download résumé";
    heroActions.appendChild(resumeBtn);
  }

  const meta = document.getElementById("hero-meta");
  if (meta) {
    meta.innerHTML = `
      <span><strong>Based in</strong> ${c.location}</span>
      <span><strong>Focus</strong> ${c.role}</span>
      <span><strong>Handle</strong> ${c.handle}</span>
    `;
  }

  const aboutCopy = document.getElementById("about-copy");
  if (aboutCopy) {
    aboutCopy.innerHTML = c.bio.map(p => `<p>${p}</p>`).join("");
  }

  const facts = [
    { k: "Name", v: c.name },
    { k: "Location", v: c.location },
    { k: "Role", v: c.role },
    { k: "Certifications", v: c.certifications.map(x => x.code).join(" · ") }
  ];
  const factList = document.getElementById("fact-list");
  if (factList) {
    factList.innerHTML = facts.map(f => `
      <div class="fact-row">
        <div class="k">${f.k}</div>
        <div class="v">${f.v}</div>
      </div>
    `).join("");
  }
}

/* ---------------- Certifications ---------------- */
function renderCerts() {
  const grid = document.getElementById("cert-grid");
  if (!grid) return;
  grid.innerHTML = SITE_CONFIG.certifications.map(cert => `
    <div class="cert-card reveal">
      <div class="cert-code">${cert.code}</div>
      <div class="cert-name">${cert.name}</div>
      <div class="cert-issuer">${cert.issuer}</div>
    </div>
  `).join("");
}

/* ---------------- Kill-chain skill stages ---------------- */
function renderChain() {
  const grid = document.getElementById("chain-grid");
  if (!grid) return;
  grid.innerHTML = SITE_CONFIG.stages.map((stage, i) => `
    <div class="chain-stage reveal" data-n="0${i + 1}">
      <h4>${stage.label}</h4>
      <ul>
        ${stage.skills.map(s => `<li>${s}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

function renderToolkit() {
  const chips = document.getElementById("toolkit-chips");
  if (!chips) return;
  chips.innerHTML = SITE_CONFIG.toolkit.map(t => `<span class="chip">${t}</span>`).join("");
}

/* ---------------- Projects ---------------- */
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  if (typeof PROJECTS === "undefined" || PROJECTS.length === 0) {
    grid.innerHTML = `<div class="projects-empty">No projects added yet — add one in js/projects.js</div>`;
    return;
  }

  grid.innerHTML = PROJECTS.map(p => {
    const featuredClass = p.featured ? " featured" : "";
    const badgeLabel = { tool: "Tool", writeup: "Writeup", research: "Research" }[p.type] || "Project";
    const link = p.link && p.link.trim() !== ""
      ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener noreferrer">${p.linkLabel || "View"}</a>`
      : `<span class="project-link disabled">Link coming soon</span>`;

    return `
      <div class="project-card${featuredClass} reveal">
        <div class="project-top">
          <div class="project-title">${p.title}</div>
          <span class="badge ${p.type}">${badgeLabel}</span>
        </div>
        <p class="project-summary">${p.summary}</p>
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        ${link}
      </div>
    `;
  }).join("");
}

/* ---------------- Writeups ---------------- */
function renderWriteups() {
  const list = document.getElementById("writeup-list");
  if (!list) return;

  if (typeof WRITEUPS === "undefined" || WRITEUPS.length === 0) {
    list.innerHTML = `<div class="projects-empty">No writeups added yet — add one in js/writeups.js</div>`;
    return;
  }

  list.innerHTML = WRITEUPS.map(w => {
    const hasLink = w.link && w.link.trim() !== "";
    const inner = `
      <div class="writeup-date mono">${w.date || ""}</div>
      <div class="writeup-body">
        <div class="writeup-title">${w.title}</div>
        <p class="writeup-excerpt">${w.excerpt}</p>
        <div class="writeup-tags">
          ${(w.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="writeup-arrow">${hasLink ? "→" : "soon"}</div>
    `;

    return hasLink
      ? `<a class="writeup-row" href="${w.link}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<div class="writeup-row disabled">${inner}</div>`;
  }).join("");
}

/* ---------------- Contact ---------------- */
function renderContact() {
  const c = SITE_CONFIG;
  const wrap = document.getElementById("contact-links");
  if (!wrap) return;

  const links = [];
  if (c.email) links.push({ idx: "01", label: c.email, href: `mailto:${c.email}` });
  if (c.github) links.push({ idx: "02", label: "GitHub", href: c.github });
  if (c.linkedin) links.push({ idx: "03", label: "LinkedIn", href: c.linkedin });
  if (c.twitter) links.push({ idx: "04", label: "Twitter / X", href: c.twitter });
  if (c.resumeUrl) links.push({ idx: "05", label: "Resume (PDF)", href: c.resumeUrl });

  wrap.innerHTML = links.map(l => `
    <a href="${l.href}" target="_blank" rel="noopener noreferrer">
      <span class="idx">${l.idx}</span> ${l.label}
    </a>
  `).join("");
}

/* ---------------- Hero terminal typewriter ---------------- */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const lines = [
    "enumerating trust relationships...",
    "dublin.contoso.com -> contoso.com [bidirectional]",
    "contoso.com -> contoso.enclave [inbound, sid filtering: on]",
    "resolving path to high-value target..."
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = lines[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? 18 : 32);
  }

  tick();
}

/* ---------------- Scroll reveal ---------------- */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(el => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}
