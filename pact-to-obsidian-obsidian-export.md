# Exporting PACT Research to Obsidian
*May 23, 2026 · Nikolaj Ivancic*
tag: Feature
excerpt: PACT now exports any notebook directly to your Obsidian vault with one click. How it works and why two export formats exist.

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
```

Every discussion, every cell, in chronological order. The system prompt is preserved as a blockquote at the top. Nothing is summarized or truncated.

## Why two export formats

The `.pact` export is for collaboration — it carries a cryptographic signature that other PACT users can verify. The Obsidian export is for your own knowledge base — it is plain Markdown, readable by anything, permanent in a format that will outlast any tool.

Think of them as serving different purposes. `.pact` is the research artifact you share. The Obsidian export is the knowledge you keep.

---

> Chat disappears. Research shouldn't.

Questions or thoughts? Email nikolaj.ivancic@gmail.com
