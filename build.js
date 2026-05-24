const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const BLOG_DIR = path.join(__dirname, "blog");
const TEMPLATE = fs.readFileSync(path.join(__dirname, "template.html"), "utf-8");

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));

for (const file of files) {
  const slug = file.replace(".md", "");
  const md = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");

  // Extract title from first # heading
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  // Extract date from second line (format: *May 23, 2026 · Nikolaj Ivancic*)
  const metaMatch = md.match(/^\*(.+)\*/m);
  const meta = metaMatch ? metaMatch[1] : "";

  const body = marked(md);

  const html = TEMPLATE
    .replace("{{title}}", title)
    .replace("{{meta}}", meta)
    .replace("{{body}}", body);

  const outPath = path.join(BLOG_DIR, slug + ".html");
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(`Built: blog/${slug}.html`);
}