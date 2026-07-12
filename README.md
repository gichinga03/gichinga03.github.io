# Portfolio Site

A single-page portfolio site — static HTML/CSS/JS, no build step, ready for GitHub Pages.

## File structure

```
index.html          the page structure (you shouldn't need to edit this)
css/style.css        all styling
js/config.js         YOUR INFO: name, bio, socials, certifications, skills, resume path
js/projects.js        YOUR PROJECTS: add/edit/remove project cards here
js/writeups.js         YOUR WRITEUPS: add/edit/remove writeup/blog entries here
js/main.js             renders config.js + projects.js + writeups.js (rarely needs edits)
assets/               put resume.pdf (and any other static files) here
```

## Editing your content

**To update your bio, socials, certifications, or skills:** open `js/config.js` and edit
the values. Every field has a comment explaining what it does.

**To add a project:** open `js/projects.js` and copy one of the existing objects inside
the `PROJECTS` array, then edit the fields:

```js
{
  title: "New Tool Name",
  summary: "One or two sentences on what it does and why it's interesting.",
  tags: ["Python", "Active Directory"],
  type: "tool",              // "tool" | "writeup" | "research"
  link: "https://github.com/you/repo",
  linkLabel: "View on GitHub",
  featured: false             // true = visually highlighted card
}
```

Save the file — the project grid rebuilds automatically, no other changes needed.

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
