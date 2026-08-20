# Portfolio Site

A multi-page portfolio site — static HTML/CSS/JS, no build step, ready for GitHub Pages.

## Pages

```
index.html       Home — hero, about, certifications, skills, an "explore" strip, contact
projects.html    Projects hub — a card grid of everything in js/projects.js
project.html     Single project template. Which project shows is decided by a URL
                 query param, e.g. project.html?slug=pentestreporter — you never
                 create a new HTML file for a new project, just add it to
                 js/projects.js with a unique `slug`
writeups.html    Full writeups list, from js/writeups.js
azure.html       Azure / CARTE page — Notes / Tools / Writeups tabs, backed by
                 js/azure-notes.js, js/azure-tools.js, js/azure-writeups.js
```

Every page shares the same nav, footer, css/style.css, and js/main.js — you shouldn't
need to touch any of the HTML files for normal content updates, only the data files below.

## File structure

```
index.html, projects.html, project.html, writeups.html, azure.html
                        the page shells (you shouldn't need to edit these)
css/style.css           all styling
js/config.js            YOUR INFO: name, bio, socials, certifications, skills, resume path
js/projects.js          YOUR PROJECTS: add/edit/remove project cards here (each needs
                         a unique `slug` — that's what project.html?slug=... looks up)
js/writeups.js          YOUR WRITEUPS: add/edit/remove general writeup/blog entries here
js/azure-notes.js       YOUR AZURE NOTES: short CARTE/Entra ID study notes
js/azure-tools.js       YOUR AZURE TOOLS: cloud-specific tooling, separate from the
                         general toolkit chips in config.js
js/azure-writeups.js    YOUR AZURE WRITEUPS: full writeups specific to Azure/Entra ID
js/main.js              renders every data file into the DOM (rarely needs edits —
                         every render function checks for its target element first,
                         so this one file works safely across all five pages)
assets/                 put resume.pdf (and any other static files) here
```

## Editing your content

**To update your bio, socials, certifications, or skills:** open `js/config.js` and edit
the values. Every field has a comment explaining what it does.

**To add a project:** open `js/projects.js` and copy one of the existing objects inside
the `PROJECTS` array, then edit the fields:

```js
{
  slug: "new-tool-name",      // unique, no spaces — becomes project.html?slug=new-tool-name
  title: "New Tool Name",
  summary: "One or two sentences on what it does and why it's interesting.",
  tags: ["Python", "Active Directory"],
  type: "tool",                // "tool" | "writeup" | "research"
  status: "",                  // optional, e.g. "In development"
  link: "https://github.com/you/repo",
  linkLabel: "View on GitHub",
  featured: false,              // true = visually highlighted card on the hub
  details: ["Longer paragraph one.", "Longer paragraph two."], // optional, shown
                                                                 // on the project page
  highlights: ["Key point one", "Key point two"]                // optional bullet list
}
```

Save the file — the projects hub grid and the project's own page (`project.html?slug=...`)
both rebuild automatically. No new HTML file needed per project.

**To add Azure/CARTE content:** open `js/azure-notes.js`, `js/azure-tools.js`, or
`js/azure-writeups.js` and add an object to the relevant array (each file has its
field reference in a comment at the top). The Notes / Tools / Writeups tabs on
`azure.html` rebuild automatically.

**To add a writeup:** open `js/writeups.js` and copy one of the existing objects inside
the `WRITEUPS` array:

```js
{
  title: "New Writeup Title",
  date: "Jul 2026",
  excerpt: "One or two sentences summarizing what it covers.",
  tags: ["Active Directory", "OPSEC"],
  link: "https://your-blog.com/post-slug"   // leave "" if not published yet
}
```

Save the file — the writeups list rebuilds automatically.

**To add your resume:** drop a PDF at `assets/resume.pdf` (create the `assets`
folder if it isn't there). The "Download résumé" button in the hero and the
resume link in Contact both point to `assets/resume.pdf` by default — as long
as your file uses that exact name and location, no other config is needed. If
you'd rather not show a resume link at all, set `resumeUrl: ""` in `js/config.js`.

## Before you publish — fill these in

Open `js/config.js` and replace the placeholders:
- `email`
- `github`
- `linkedin`
- `resumeUrl` (set to `""` if you don't want a resume button, or leave the
  default path and add `assets/resume.pdf`)

## Deploying to GitHub Pages

1. Create a new repository named exactly `your-github-username.github.io`
   (replace with your actual GitHub username).
2. Push these files to the repository's `main` branch, at the root (not in a subfolder):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/your-github-username/your-github-username.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, and under "Build and deployment" set
   **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Your site will be live at `https://your-github-username.github.io` within a
   minute or two.

If you'd rather host it as a project page instead of your main profile page,
name the repo anything else and it'll be served at
`https://your-github-username.github.io/repo-name/`.

## Local preview

No build tools needed. From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts via CDN —
  no local font files needed.
- The hero graphic and skill "stages" are hand-built to reflect an actual AD
  attack chain (recon → access → escalate → lateral movement → persistence).
  Feel free to adjust wording in `config.js` as your focus evolves.
- Respects `prefers-reduced-motion` for anyone with that OS setting enabled.
