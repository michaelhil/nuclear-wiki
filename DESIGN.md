# Nuclear AI Wiki — Feedback System Design Document

## Goal

Enable non-technical nuclear domain experts to submit structured feedback on specific wiki sections, collected via GitHub Issues, processed in periodic batches by an LLM, with full version tracking and an in-repo archive for permanence.

## Users

| User | Technical level | Interaction |
|------|----------------|-------------|
| **Reviewers** (IFE colleagues, nuclear domain experts) | Non-technical. No GitHub accounts. | Read wiki in browser, submit feedback via per-section form |
| **Wiki maintainer** (Michael) | Technical. Has GitHub + Claude Code access. | Triggers batch processing, reviews deferred items |
| **Processing agent** (Claude Code session) | N/A | Reads issues via `gh` CLI, updates wiki pages, comments/closes issues, writes batch archive |

## Use Cases

1. **Reviewer reads a wiki page** and notices an error, wants to suggest an improvement, or finds something unclear. They click the feedback icon on the relevant section heading, fill a short form, and submit. No account needed.

2. **Maintainer triggers batch processing** every few weeks. Claude reads all open feedback issues, updates wiki pages, closes addressed issues with explanations, labels unaddressable issues for human review, and writes a batch archive file.

3. **Maintainer reviews deferred items** — issues labelled `needs-human-review` that require editorial decisions (substantive disagreements, out-of-scope requests, policy questions).

4. **Future Obsidian user** opens the wiki as a vault and can browse feedback archives in `feedback/` to understand what changed and why.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                           │
│                                                         │
│  wiki/*.md          Pure content. No feedback artifacts │
│  feedback/*.md      Batch archives (written by Claude)  │
│  CLAUDE.md          Agent schema (includes PROCESS      │
│                     FEEDBACK operation)                  │
│  DESIGN.md          This document                       │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────┐
│                 VISUALISATION LAYER                      │
│                                                         │
│  MkDocs Material    Renders markdown → HTML              │
│  Theme override     Adds per-section 💬 icon + popover  │
│                     (web-only; not in markdown files)    │
│  Build-time inject  Git SHA in page footer for version  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────┐
│                 FEEDBACK COLLECTION                      │
│                                                         │
│  Browser form       POST to Cloudflare Worker           │
│  Cloudflare Worker  Thin proxy (~30 lines TS)           │
│                     Receives POST, creates GitHub Issue  │
│                     Uses GitHub PAT stored as env secret │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────┐
│                 FEEDBACK STORAGE                        │
│                                                         │
│  GitHub Issues      Live tracking. Labels, comments,    │
│                     open/close states. LLM access via   │
│                     `gh` CLI.                           │
│                                                         │
│  feedback/*.md      Permanent archive in repo. Written  │
│                     during batch processing. Readable   │
│                     in Obsidian. Version-tracked in git. │
└─────────────────────────────────────────────────────────┘
```

## Data / Visualisation Separation Principle

The wiki's value is in its markdown files. The HTML rendering is one view among potential others (Obsidian, plain text, future tools). This principle governs all design decisions:

- **Markdown files contain zero feedback-system artifacts.** No embedded forms, no JS references, no feedback-specific markup.
- **The feedback form is a web-layer concern only.** Implemented as a MkDocs theme override that adds UI elements to the rendered HTML.
- **Feedback data lives in two places:** GitHub Issues (live tracking) and `feedback/*.md` (permanent archive). Both are accessible independent of the web rendering.
- **An Obsidian user** can read all content and feedback archives. They submit feedback via the web version or directly via GitHub Issues.

## Feedback Granularity: Section-Level

Feedback targets **sections** (identified by `##` headings), not paragraphs.

### Why not paragraph-level

- Section headings are stable anchors (auto-generated `#heading-slug` by MkDocs). They survive content edits within the section.
- Paragraph fingerprinting (content hashes) breaks on any edit — typo fixes, reformatting, additions.
- Paragraph offsets shift when content is added or removed above.
- For a 95-page research wiki reviewed by a small team, section-level is sufficient. Most feedback is "this section needs X" not "this sentence is wrong."

### Section identification

Each section is identified by: **page path + heading anchor slug**.

Example: `concepts/hallucination.md#the-core-danger-confidence-without-correctness`

These slugs are auto-generated by MkDocs from the heading text, stable across builds, and human-readable.

## Reader UI

### Visual design

Each `##` or `###` heading in the rendered page shows a `💬` feedback icon on hover, alongside the existing `🔗` permalink icon that MkDocs Material already displays:

```
## The Core Danger: Confidence Without Correctness  🔗 💬
```

This is consistent with the existing Material theme interaction pattern. The icon appears on hover and is always visible on mobile/touch.

### Popover form

Clicking `💬` opens a popover anchored to that heading:

```
┌────────────────────────────────────┐
│ Feedback on:                       │
│ "The Core Danger: Confidence..."   │
│                                    │
│ Type:                              │
│ ○ Correction  ○ Suggestion         │
│ ○ Missing     ○ Unclear            │
│                                    │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ │ Your feedback...               │ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Name (optional): ___________       │
│                                    │
│            [Submit]                │
└────────────────────────────────────┘
```

On submit: brief "Thank you" toast, popover closes. On error: "Could not submit — please try again."

### No authentication required

The form submits directly to the Cloudflare Worker. No login, no GitHub account, no CAPTCHA (rate limiting handled server-side).

## Cloudflare Worker

### Purpose

Thin proxy that receives form POSTs from the wiki and creates GitHub Issues. Exists solely because non-technical reviewers cannot create GitHub Issues directly.

### Specification

- **Runtime**: Cloudflare Workers (free tier: 100K requests/day)
- **Language**: TypeScript
- **Size**: ~30 lines of logic
- **Secrets**: `GITHUB_PAT` (personal access token with `repo` scope, stored as Worker environment variable)
- **Endpoint**: `POST /feedback`
- **CORS**: Allows requests from the wiki domain only
- **Rate limiting**: Max 10 submissions per IP per hour (prevents abuse)
- **Validation**: Rejects submissions with empty feedback text or invalid page paths

### Request payload

```json
{
  "page": "concepts/hallucination.md",
  "section": "the-core-danger-confidence-without-correctness",
  "sectionTitle": "The Core Danger: Confidence Without Correctness",
  "category": "correction",
  "feedback": "This understates the problem. In our simulator tests...",
  "submitter": "Dr. Hansen",
  "wikiVersion": "55379bd"
}
```

### Created GitHub Issue

```markdown
Title: [concepts/hallucination] Correction — "The Core Danger..."

Labels: wiki-feedback, type:correction, page:concepts/hallucination

Body:
<!-- WIKI-FEEDBACK-META
page: concepts/hallucination.md
section: the-core-danger-confidence-without-correctness
section_title: The Core Danger: Confidence Without Correctness
category: correction
submitter: Dr. Hansen
wiki_version: 55379bd
timestamp: 2026-05-15T14:32:00Z
-->

**Page**: [concepts/hallucination](https://michaelhil.github.io/nuclear-wiki/concepts/hallucination/#the-core-danger-confidence-without-correctness)
**Section**: The Core Danger: Confidence Without Correctness
**Wiki version**: `55379bd` (2026-04-13)
**Type**: Correction

---

This understates the problem. In our simulator tests we found operators
couldn't distinguish hallucinated output even when specifically primed
to look for it.

— Dr. Hansen
```

The `<!-- WIKI-FEEDBACK-META -->` block is machine-parseable by Claude during batch processing. The human-readable section below it is for people browsing issues on GitHub.

## GitHub Issue Label Taxonomy

| Label | Purpose |
|-------|---------|
| `wiki-feedback` | All feedback issues (used as filter) |
| `type:correction` | Something is factually wrong |
| `type:suggestion` | Could be improved |
| `type:missing` | Content should exist but doesn't |
| `type:unclear` | Hard to understand |
| `page:<name>` | Which page (e.g., `page:concepts/hallucination`) |
| `needs-human-review` | Claude deferred this — requires editorial decision |
| `stale` | Target section was already changed since submission |

## Version Tracking

### At submission time

The wiki's current git SHA is injected into the page footer at MkDocs build time (via a `main.html` theme override or MkDocs macro). The feedback form captures this SHA and includes it in the issue as `wiki_version`.

### At processing time

For each feedback issue, Claude runs:
```
git diff <issue_wiki_version>..HEAD -- wiki/<page>.md
```

Three outcomes:
- **Target section unchanged**: Feedback is current, process it.
- **Target section changed**: Check if the change already addressed the feedback. If yes, close as stale with comment. If no, process it.
- **Section deleted**: Close as stale with explanation.

## Batch Processing Workflow

Defined in CLAUDE.md as the `PROCESS FEEDBACK` operation. The full workflow:

### Step 1: Retrieve

```bash
gh issue list --label wiki-feedback --state open \
  --json number,title,body,labels,createdAt
```

### Step 2: Parse

Extract `WIKI-FEEDBACK-META` from each issue body. Group by page, then by section.

### Step 3: Staleness check

For each issue, diff the target page between the issue's wiki version and HEAD. Flag stale issues.

### Step 4: Process each page

For each page with current (non-stale) feedback:
1. Read the current wiki page
2. Read all feedback items for that page
3. Determine which are actionable
4. Update the page content
5. Ensure changes are consistent with the source reports in `raw/`

### Step 5: Report per issue

**Addressed issues:**
```bash
gh issue comment <number> --body "Addressed in commit <sha>.
Change: [description of what was modified]."
gh issue close <number>
```

**Unaddressable issues:**
```bash
gh issue comment <number> --body "Reviewed but not addressed.
Reason: [explanation]"
gh issue edit <number> --add-label "needs-human-review"
```

**Stale issues:**
```bash
gh issue comment <number> --body "This section was modified since
your feedback was submitted. The current version may already
address your concern. Please review and resubmit if the issue
persists."
gh issue close <number> --reason "not planned"
```

### Step 6: Write batch archive

Create `feedback/batch-YYYY-MM-DD.md` with YAML frontmatter and full record of what was processed, addressed, and deferred. This file is the permanent, in-repo record.

### Step 7: Commit and push

```bash
git add wiki/ feedback/
git commit -m "Process feedback batch YYYY-MM-DD (Fixes #12, #15, ...)"
git push
```

### Step 8: Summary

Create a GitHub Issue summarising the batch: how many items processed, addressed, deferred, and stale. Link to the batch archive file and the commit.

### Step 9: Log

Append to `wiki/log.md`:
```markdown
## YYYY-MM-DD — Feedback batch
- Processed N feedback items
- Addressed: #12, #15, #18 (pages updated: hallucination, nrc, scenario-loca)
- Deferred: #19, #28 (needs human review)
- Stale: #22 (section already modified)
```

## Batch Archive Format

File: `feedback/batch-YYYY-MM-DD.md`

```yaml
---
title: "Feedback Batch — YYYY-MM-DD"
type: feedback-batch
processed_by: claude
date: YYYY-MM-DD
issues_addressed: [12, 15, 18]
issues_deferred: [19, 28]
issues_stale: [22]
wiki_version_before: 55379bd
wiki_version_after: c7d2e9f
---

# Feedback Batch — YYYY-MM-DD

## Addressed

### #12 — concepts/hallucination § The Core Danger
**Type**: Correction
**Feedback**: Understates the problem. Simulator tests showed 85% failure rate.
**Submitter**: Dr. Hansen
**Action**: Added LabSafety Bench reference and expanded severity language.

### #15 — entities/nrc § Regulatory Gaps
**Type**: Missing
**Feedback**: Should reference recent ACRS letter on AI advisory systems.
**Submitter**: Anonymous
**Action**: Added ACRS letter reference to regulatory gaps section.

## Deferred

### #19 — scenarios/scenario-loca § Agent Architecture
**Type**: Suggestion
**Feedback**: Should include specific RELAP5 nodalisation recommendations.
**Reason**: Outside scope of source reports. Flagged for future reference ingestion.

### #28 — comparisons/rag-vs-fine-tuning § Nuclear Recommendation
**Type**: Correction
**Feedback**: Disagree with RAG-first recommendation for all use cases.
**Reason**: Substantive disagreement requiring human editorial decision.
```

## Implementation Checklist

1. **MkDocs theme override** — `overrides/main.html` injecting git SHA into footer
2. **Section feedback JS** — `overrides/feedback.js` adding 💬 icons and popover to headings
3. **Cloudflare Worker** — `worker/feedback-worker.ts` proxying form → GitHub Issue
4. **GitHub labels** — Create label taxonomy via `gh label create`
5. **CLAUDE.md update** — Add PROCESS FEEDBACK operation
6. **MkDocs config** — Register theme override directory
7. **Feedback directory** — Create `feedback/` with `.gitkeep`

## Key Architectural Decisions

### D1: Section-level, not paragraph-level
Paragraphs are unstable targets. Sections are anchored by headings, which survive edits, work across renderers (MkDocs, Obsidian, plain text), and provide meaningful content boundaries. Section-level is sufficient for the review team size and wiki scale.

### D2: Cloudflare Worker as proxy
Required because reviewers don't have GitHub accounts. The Worker is the thinnest possible bridge: receive POST, validate, create Issue. No other viable option exists for anonymous → GitHub Issue creation without introducing a different external dependency.

### D3: Dual storage (Issues + repo archive)
GitHub Issues provide live tracking with LLM access via `gh` CLI. In-repo markdown archives provide permanence, version tracking, and Obsidian visibility. Neither alone is sufficient: Issues lack permanence (can be deleted, platform-dependent); markdown archives lack live state management (can't be "open" or "closed").

### D4: Web-layer feedback collection only
The feedback form exists only in the MkDocs HTML rendering. Markdown files contain no feedback artifacts. This preserves the clean data/visualisation separation and ensures the wiki works identically in Obsidian, VS Code, or any other markdown renderer.

### D5: Build-time version injection
The git SHA is injected at build time, not queried at runtime. This avoids runtime API calls, works with static hosting, and ensures every page carries its exact version. The SHA is captured in feedback submissions for version tracking during batch processing.

### D6: LLM as feedback processor, not auto-responder
Feedback is collected continuously but processed in batches by a human-triggered Claude Code session. There is no automatic processing — the maintainer decides when to process and reviews the results. This keeps a human in the loop for editorial decisions.
