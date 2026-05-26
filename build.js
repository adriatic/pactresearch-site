const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const BLOG_DIR = path.join(__dirname, "blog");
const TEMPLATE = fs.readFileSync(path.join(__dirname, "template.html"), "utf-8");

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));

const posts = [];

for (const file of files) {
  const slug = file.replace(".md", "");
  const md = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");

  // Extract title from first # heading
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  // Extract date/author from *May 23, 2026 · Nikolaj Ivancic*
  const metaMatch = md.match(/^\*(.+)\*/m);
  const meta = metaMatch ? metaMatch[1] : "";

  // Extract date portion only for sorting (first part before ·)
  const datePart = meta.split("·")[0].trim();

  // Extract tag: line
  const tagMatch = md.match(/^tag:\s*(.+)$/m);
  const tag = tagMatch ? tagMatch[1].trim() : "General";

  // Extract excerpt: line
  const excerptMatch = md.match(/^excerpt:\s*(.+)$/m);
  const excerpt = excerptMatch ? excerptMatch[1].trim() : "";

  // Build article HTML
  const body = marked(md);
  const html = TEMPLATE
    .replace("{{title}}", title)
    .replace("{{meta}}", meta)
    .replace("{{body}}", body);

  const outPath = path.join(BLOG_DIR, slug + ".html");
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(`Built: blog/${slug}.html`);

  posts.push({ slug, title, datePart, tag, excerpt, meta });
}

// Sort posts by date descending (newest first)
posts.sort((a, b) => new Date(b.datePart) - new Date(a.datePart));

// Generate blog/index.html
const postItems = posts.map(p => `
      <li class="post-item">
        <div class="post-meta">
          <span>${p.datePart}</span>
          <span class="post-tag">${p.tag}</span>
        </div>
        <div class="post-title">
          <a href="/blog/${p.slug}.html">${p.title}</a>
        </div>
        <p class="post-excerpt">${p.excerpt}</p>
      </li>`).join("\n");

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog — PACT Research</title>
  <meta name="description" content="Research notes, updates, and observations from building and using PACT." />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #0d0d0d; color: #d4d4d4; line-height: 1.7; font-size: 17px;
    }
    a { color: #4ec94e; text-decoration: none; }
    a:hover { text-decoration: underline; }
    nav {
      display: flex; align-items: center; gap: 2rem;
      padding: 1.2rem 2rem; border-bottom: 1px solid #222; font-size: 0.9rem;
    }
    nav .brand { font-weight: 700; color: #fff; font-size: 1rem; }
    nav .links { display: flex; gap: 1.5rem; margin-left: auto; }
    nav .links a { color: #888; }
    nav .links a:hover { color: #fff; }
    nav .cta {
      background: #4ec94e; color: #000; padding: 0.4rem 1rem;
      border-radius: 4px; font-weight: 600; font-size: 0.85rem;
    }
    nav .cta:hover { background: #3db83d; text-decoration: none; }
    .blog-wrap { max-width: 680px; margin: 0 auto; padding: 3rem 1.5rem 6rem; }
    .blog-label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #555; margin-bottom: 1rem; }
    h1 { font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem; }
    .blog-intro { color: #888; font-size: 1rem; margin-bottom: 3rem; }
    .post-list { list-style: none; }
    .post-item { border-left: 2px solid #222; padding: 0 0 2rem 1.5rem; margin-bottom: 0.5rem; }
    .post-item:hover { border-left-color: #4ec94e; }
    .post-meta { font-size: 0.8rem; color: #555; margin-bottom: 0.4rem; display: flex; gap: 0.75rem; }
    .post-tag { background: #1a1a1a; border: 1px solid #333; border-radius: 3px; padding: 0 0.4rem; color: #777; }
    .post-title { font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 0.4rem; }
    .post-title a { color: #fff; }
    .post-title a:hover { color: #4ec94e; text-decoration: none; }
    .post-excerpt { color: #888; font-size: 0.9rem; }
    footer { border-top: 1px solid #1a1a1a; padding: 1.5rem 2rem; text-align: center; font-size: 0.78rem; color: #333; }
  </style>
</head>
<body>
  <nav>
    <a class="brand" href="https://pactresearch.net/">PACTresearch.net</a>
    <div class="links">
      <a href="https://pactresearch.net/#how">How it works</a>
      <a href="https://pactresearch.net/#articles">Articles</a>
      <a href="https://pactresearch.net/blog">Blog</a>
      <a href="https://pactresearch.net/#beta">Beta access</a>
    </div>
    <a class="cta" href="https://pactresearch.net/#beta">Request access</a>
  </nav>
  <div class="blog-wrap">
    <p class="blog-label">Blog</p>
    <h1>Research notes.</h1>
    <p class="blog-intro">
      Observations and updates from building and using PACT — less formal than a
      Medium article, more considered than a tweet.
    </p>
    <ul class="post-list">
${postItems}
    </ul>
  </div>
  <footer>
    Copyright © 2026 Pact Research LLC · Rocklin, CA ·
    <a href="https://pactresearch.net">pactresearch.net</a>
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(BLOG_DIR, "index.html"), indexHtml, "utf-8");
console.log(`Built: blog/index.html (${posts.length} posts)`);