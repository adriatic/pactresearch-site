# Exporting PACT Research to Obsidian

*May 23, 2026 · Nikolaj Ivancic*

---

PACT stores every prompt and response permanently in a local SQLite database. That is what makes structured research possible — cells are addressable, chainable, and never lost. But the database is PACT's internal format, not something you can browse, annotate, or link from other notes.

Obsidian is the natural complement. PACT is where the research happens. Obsidian is where it lives afterward — cross-linked, tagged, and integrated with everything else you know.

As of today, PACT exports any notebook directly to your Obsidian vault with one click.

## How it works

In the Explorer panel, hover over any notebook. A small `↑` appears on the right. Hover over it and it expands to two choices:

- **↑.pact** — exports the notebook as a signed `.pact` file for sharing with other PACT users
- **↑Ob** — exports the notebook as a Markdown file directly to your Obsidian vault

Click **↑Ob**. The file appears immediately at:

```
~/pact/pact_exports/<Notebook Name>.md
```

No dialog. No confirmation. The file is there.

## What the exported file contains

The Markdown file preserves the full notebook structure:

```
# Notebook Name

> System Prompt (if set)

## Discussion Name

**Prompt:** the exact prompt text

**Response:** the full response

---

## Next Discussion

...
```

Every discussion, every cell, in chronological order. The system prompt is preserved as a blockquote at the top. Nothing is summarized or truncated.

## Why two export formats

The `.pact` export is for collaboration — it carries a cryptographic signature that other PACT users can verify. The Obsidian export is for your own knowledge base — it is plain Markdown, readable by anything, permanent in a format that will outlast any tool.

Think of them as serving different purposes. `.pact` is the research artifact you share. The Obsidian export is the knowledge you keep.

## Adding new blog posts to pactresearch.net

This article documents the process as it currently stands:

1. **Write the post** as a Markdown file — the same format as this one
2. **Convert to HTML** matching the site template (see `blog/pactresearch-net-is-live.html` in the repo as the reference)
3. **Save** to `~/Work/pactresearch-site/blog/<slug>.html`
4. **Update** `~/Work/pactresearch-site/blog/index.html` with the new post entry
5. **Commit and push** to `github.com/adriatic/pactresearch-site`
6. **Deploy** to the Vultr server at `144.202.109.14` — SSH access to be restored

Step 6 is currently blocked by a firewall issue on the Vultr instance. Until that is resolved, the HTML file is ready and the repo is the source of truth.

---

> Chat disappears. Research shouldn't.

Questions or thoughts? Email nikolaj.ivancic@gmail.com
