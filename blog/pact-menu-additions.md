# PACT v0.0.3 — what's new in the global menu
*May 22, 2026 · Nikolaj Ivancic*
tag: Development
excerpt: Model tiers, signed notebook export, config management, and the full story of what each menu item does in PACT v0.0.3.

---

PACT's global menu bar has grown. What started as a single Clear button is now a complete control surface for managing your research environment. This post walks through every item — what it does, why it exists, and how it fits the research workflow.

## The status LED

The small circle at the right of the context bar is not decoration. Green means PACT is idle — ready to accept a prompt. Red means a request is in flight.

Every control that could cause problems during an active run — including the Model button — is disabled when the LED is red. You cannot change the model mid-run. You cannot clear responses while streaming. The LED enforces this silently.

## Clear

Clears the current view — removes cells from the display and empties the composer. This is a local UI action only. Nothing is deleted from the database. Reload the discussion and everything comes back.

Use it when you want a clean working surface without losing your research.

## Clear Responses

This one is permanent. It deletes all responses in the active discussion from the database. The prompt is preserved — the discussion remains, but the cells are gone and cannot be recovered.

A confirmation dialog appears before anything is deleted. Clear Responses only appears when a discussion is active.

## + Notebook

Opens the new notebook dialog. Two fields: a name and an optional system prompt.

The system prompt is the most underused feature in PACT. Set it once per notebook and it applies silently to every discussion — no need to repeat it in every prompt. For a medication interactions notebook: `You are a clinical pharmacist specializing in drug interactions.` For a legal research notebook: `You are a senior attorney specializing in contract law.` The AI stays in role for the entire notebook without you thinking about it.

## Import

Imports a `.pact` file — a signed notebook exported from another PACT instance. The signature is verified before import. If the file was tampered with or the signing server is unreachable, import is blocked or warned.

This is how research is shared. Export a notebook, send the `.pact` file, and the recipient imports it and continues exactly where you left off — with full cell history, all references intact.

## Model

The Model button opens a tier selection dialog — only available when the LED is green.

**Standard** — GPT: gpt-4.1 / Claude: claude-sonnet-4-6

**Economy** — GPT: gpt-4.1-mini / Claude: claude-haiku-4-5

The tier applies globally. When you select Economy, the composer dropdown automatically updates to reflect the active model. No separate action required.

The use case that drove this feature: Marc, one of our beta testers, described his research process as drilling. You start wide — exploring a domain, generating hypotheses, mapping the territory. That work doesn't need the most expensive model. Once you know where to drill precisely, you switch to Standard for the responses that matter.

> Use Economy for initial exploration. Switch to Standard when you know where to drill.

Gemini will slot in as a third provider in a future release. The tier architecture is already built to accommodate it.

## The config system

When PACT launches without a `config.json`, it shows a setup screen instead of the research interface. The setup screen collects your name, email, context, and API keys for both providers.

Saving config writes `config.json` to the extension's global storage, initializes the LLM router with the provided keys, and dismisses the setup screen in one step. The setup screen never appears again unless the config is missing or both API keys are blank.

## What's next

- PACT-to-Obsidian integration — export cells directly to your Obsidian vault
- Parameterized prompt templates — fill in variables once, run the full chain automatically
- The PACT-man explainer — a short animation showing how human and PACT collaborate, solving the onboarding problem

If you are using PACT for research and have feedback, reach out at nikolaj.ivancic@gmail.com
