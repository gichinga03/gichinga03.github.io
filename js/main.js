/**
 * MAIN.JS
 * Renders content from the data files (config.js, projects.js,
 * writeups.js, azure-*.js) into the DOM, plus a few small
 * interactions (typewriter, scroll reveal, tabs).
 *
 * This one file is shared across every page. Every render
 * function checks for its target element before doing anything,
 * so it's safe to include on a page that doesn't have that
 * section — it just no-ops. You shouldn't need to edit this
 * file for normal content updates; edit the data files instead.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderIdentity();
  renderCerts();
  renderChain();
  renderToolkit();
  renderContact();
  initTypewriter();

  renderProjectsHub();
  renderProjectDetail();

  renderWriteupList(typeof WRITEUPS !== "undefined" ? WRITEUPS : [], "writeup-list");

  renderAzureNotes();
  renderAzureTools();
  renderAzureWriteups();
  initTabs();

  markActiveNav();
  initScrollReveal();
});

/* ---------------- Identity / hero / about ---------------- */
function renderIdentity() {
  const c = SITE_CONFIG;
  if (typeof c === "undefined") return;

  const navHandle = document.getElementById("nav-handle");
  if (navHandle) navHandle.textContent = c.handle;

  const footerName = document.getElementById("footer-name");
  if (footerName) footerName.textContent = c.name;

  const heroName = document.getElementById("hero-name");
  if (heroName) {
    document.title = `${c.name} — ${c.role}`;
    const nameParts = c.name.split(" ");
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
  if (!grid || typeof SITE_CONFIG === "undefined") return;
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
  if (!grid || typeof SITE_CONFIG === "undefined") return;
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
  if (!chips || typeof SITE_CONFIG === "undefined") return;
  chips.innerHTML = SITE_CONFIG.toolkit.map(t => `<span class="chip">${t}</span>`).join("");
}

/* ---------------- Projects: hub grid ---------------- */
function renderProjectsHub() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  if (typeof PROJECTS === "undefined" || PROJECTS.length === 0) {
    grid.innerHTML = `<div class="empty-state">No projects added yet — add one in js/projects.js</div>`;
    return;
  }

  grid.innerHTML = PROJECTS.map(p => {
    const featuredClass = p.featured ? " featured" : "";
    const badgeLabel = { tool: "Tool", writeup: "Writeup", research: "Research" }[p.type] || "Project";
    const href = p.slug ? `project.html?slug=${encodeURIComponent(p.slug)}` : null;

    return `
      <a class="project-card${featuredClass} reveal" href="${href || "#"}"${href ? "" : " aria-disabled=\"true\""}>
        <div class="project-top">
          <div class="project-title">${p.title}</div>
          <span class="badge ${p.type}">${badgeLabel}</span>
        </div>
        <p class="project-summary">${p.summary}</p>
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <span class="project-link">${href ? "View project" : "No detail page"}</span>
      </a>
    `;
  }).join("");
}

/* ---------------- Projects: single detail page (project.html?slug=...) ---------------- */
function renderProjectDetail() {
  const root = document.getElementById("project-detail");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const project = (typeof PROJECTS !== "undefined" ? PROJECTS : []).find(p => p.slug === slug);

  if (!project) {
    root.innerHTML = `
      <div class="empty-state">
        Couldn't find that project. <a href="projects.html" class="project-link" style="display:inline-flex;margin-top:10px;">Back to all projects</a>
      </div>
    `;
    document.title = "Project not found — " + (typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.name : "");
    return;
  }

  const badgeLabel = { tool: "Tool", writeup: "Writeup", research: "Research" }[project.type] || "Project";
  const details = project.details && project.details.length ? project.details : [project.summary];
  const link = project.link && project.link.trim() !== ""
    ? `<a class="btn btn-primary" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkLabel || "View project"}</a>`
    : "";

  document.title = `${project.title} — ${typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.name : ""}`;

  root.innerHTML = `
    <a href="projects.html" class="back-link">&larr; All projects</a>
    <div class="detail-head reveal in">
      <div class="detail-badges">
        <span class="badge ${project.type}">${badgeLabel}</span>
        ${project.status ? `<span class="badge status">${project.status}</span>` : ""}
      </div>
      <h1>${project.title}</h1>
      <div class="detail-tags">
        ${(project.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
    <div class="detail-body reveal in">
      ${details.map(p => `<p>${p}</p>`).join("")}
    </div>
    ${project.highlights && project.highlights.length ? `
      <div class="detail-highlights reveal in">
        <div class="toolkit-label">Highlights</div>
        <ul>${project.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
      </div>
    ` : ""}
    ${link ? `<div class="detail-actions reveal in">${link}</div>` : ""}
  `;
}

/* ---------------- Writeups (generic — used by writeups.html and as part of Azure page) ---------------- */
function renderWriteupList(data, containerId) {
  const list = document.getElementById(containerId);
  if (!list) return;

  if (!data || data.length === 0) {
    list.innerHTML = `<div class="empty-state">Nothing here yet.</div>`;
    return;
  }

  list.innerHTML = data.map(w => {
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
  if (typeof SITE_CONFIG === "undefined") return;
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

/* ---------------- Azure: notes ---------------- */
function renderAzureNotes() {
  const grid = document.getElementById("azure-notes-grid");
  if (!grid) return;
  const data = typeof AZURE_NOTES !== "undefined" ? AZURE_NOTES : [];

  if (data.length === 0) {
    grid.innerHTML = `<div class="empty-state">No notes added yet — add one in js/azure-notes.js</div>`;
    return;
  }

  grid.innerHTML = data.map(n => `
    <div class="note-card reveal in">
      ${n.category ? `<div class="note-category mono">${n.category}</div>` : ""}
      <div class="note-title">${n.title}</div>
      <p class="note-body">${n.body}</p>
      <div class="project-tags">
        ${(n.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------------- Azure: tools ---------------- */
function renderAzureTools() {
  const list = document.getElementById("azure-tools-list");
  if (!list) return;
  const data = typeof AZURE_TOOLS !== "undefined" ? AZURE_TOOLS : [];

  if (data.length === 0) {
    list.innerHTML = `<div class="empty-state">No tools added yet — add one in js/azure-tools.js</div>`;
    return;
  }

  list.innerHTML = data.map(t => {
    const inner = `
      <div class="tool-name">${t.name}</div>
      <p class="tool-description">${t.description}</p>
      <div class="project-tags">
        ${(t.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;
    return t.link && t.link.trim() !== ""
      ? `<a class="tool-row" href="${t.link}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<div class="tool-row disabled">${inner}</div>`;
  }).join("");
}

/* ---------------- Azure: writeups ---------------- */
function renderAzureWriteups() {
  renderWriteupList(typeof AZURE_WRITEUPS !== "undefined" ? AZURE_WRITEUPS : [], "azure-writeup-list");
}

/* ---------------- Tabs (used on azure.html) ---------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab-target");
      const group = btn.closest("[data-tab-group]");
      if (!group) return;

      group.querySelectorAll("[data-tab-target]").forEach(b => b.classList.remove("active"));
      group.querySelectorAll("[data-tab-panel]").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const panel = document.querySelector(`[data-tab-panel="${targetId}"]`);
      if (panel) panel.classList.add("active");
    });
  });
}

/* ---------------- Active nav highlighting ---------------- */
function markActiveNav() {
  const current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href") || "";
    const hrefPage = href.split("#")[0];
    // Only highlight links that point at another physical page (writeups.html,
    // projects.html, azure.html). Same-page anchors (#about, #skills, #contact)
    // are left alone so they don't all light up at once.
    if (hrefPage && hrefPage !== "index.html" && hrefPage === current) {
      a.classList.add("current");
    }
  });
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
