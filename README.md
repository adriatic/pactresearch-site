# pactresearch.net

Source files for [pactresearch.net](https://pactresearch.net) — hosted on Vultr at `45.77.191.105`.

---

## File Structure

```
pactresearch-site/
  index.html          ← main site landing page
  template.html       ← blog post HTML shell (used by build.js)
  build.js            ← markdown → HTML converter
  package.json
  blog/
    index.html        ← blog listing page
    *.md              ← blog post sources (write here)
    *.html            ← generated blog posts (do not edit directly)
```

---

## Writing a Blog Post

1. Create a new `.md` file in `blog/`:

```
blog/your-post-slug.md
```

2. Start the file with this structure:

```markdown
# Your Post Title

*May 24, 2026 · Nikolaj Ivancic*

---

Your content here...
```

The first `#` heading becomes the page title. The italic line on the second line becomes the date/author metadata displayed under the title.

---

## Building

Convert all `.md` files in `blog/` to `.html`:

```bash
npm run build
```

This reads each `.md` file, wraps it in `template.html`, and writes the corresponding `.html` file alongside it.

---

## Previewing Locally

Open the project in VSCode. Right-click any `.html` file in the Explorer panel and select **"Open with Live Server"**. The site opens in your browser at `http://127.0.0.1:5500`.

---

## Deploying to Vultr

SSH access uses the key at `~/.ssh/id_pact`. The host alias `pact` is configured in `~/.ssh/config`:

```
Host pact
  HostName 45.77.191.105
  User root
  IdentityFile ~/.ssh/id_pact
```

### Deploy a new blog post

```bash
scp ~/Work/pactresearch-site/blog/your-post-slug.html pact:/var/www/pactresearch.net/blog/
```

### Deploy the blog index (after adding a new post to it)

```bash
scp ~/Work/pactresearch-site/blog/index.html pact:/var/www/pactresearch.net/blog/
```

### Deploy the main site

```bash
scp ~/Work/pactresearch-site/index.html pact:/var/www/pactresearch.net/
```

---

## Adding a Post to the Blog Index

After building and deploying a new post, add it to `blog/index.html` manually — insert a new `<li class="post-item">` block at the top of the list, then redeploy the index.

---

## GitHub

The repo at `github.com/adriatic/pactresearch-site` is the source of truth. Commit and push after every deploy:

```bash
git add .
git commit -m "Add post: your-post-title"
git push
```

GitHub does **not** auto-deploy to Vultr — deployment is manual via `scp` as documented above. Auto-deploy via GitHub Actions is a future improvement.

---

## Server Details

| Item | Value |
|---|---|
| Host | `pact` (alias) |
| IP | `45.77.191.105` |
| User | `root` |
| SSH key | `~/.ssh/id_pact` |
| Web root | `/var/www/pactresearch.net/` |
| Blog dir | `/var/www/pactresearch.net/blog/` |
| Server | nginx on Ubuntu 24.04 |