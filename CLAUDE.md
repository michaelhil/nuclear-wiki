# Nuclear AI LLM-Wiki — Agent Schema

You are maintaining a structured knowledge base on AI applications in nuclear operations. This wiki follows the Karpathy LLM-wiki architecture: raw sources are compiled into interlinked markdown pages that serve both human readers and AI agents.

## Directory Structure

```
raw/              # Layer 1: Immutable sources (NEVER modify)
  reports/        #   Original report markdown files
  references/     #   Reference PDFs (future phase)
  figures/        #   Diagrams and images
wiki/             # Layer 2: Compiled knowledge (YOU maintain this)
  index.md        #   Master catalog of all wiki pages by category
  log.md          #   Append-only chronological activity log
  concepts/       #   Concept articles
  entities/       #   Entity pages (orgs, tools, standards, people)
  summaries/      #   Source summaries (one per raw source)
  comparisons/    #   Side-by-side comparison pages
  scenarios/      #   Operational scenario descriptions
```

## Page Format

Every wiki page MUST have YAML frontmatter:

```yaml
---
title: "Page Title"
type: concept | entity | summary | comparison | scenario
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[concept-name]]"
  - "[[entity-name]]"
tags:
  - llm
  - safety
  - nuclear
confidence: high | medium | low
created: 2026-04-13
updated: 2026-04-13
---
```

### Confidence Levels
- **high**: Well-supported by multiple sources, established consensus
- **medium**: Supported by one source or emerging research
- **low**: Speculative, rapidly evolving, or contradictory evidence

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Summary | `summary-{short-topic}.md` | `summary-llm-foundations.md` |
| Concept | `{concept-name}.md` | `retrieval-augmented-generation.md` |
| Entity | `{entity-name}.md` | `nrc.md`, `crewai.md` |
| Comparison | `{a}-vs-{b}.md` | `rag-vs-fine-tuning.md` |
| Scenario | `scenario-{name}.md` | `scenario-rod-withdrawal.md` |

Use lowercase kebab-case for all filenames. No spaces, no underscores.

## Interlinking

Use `[[page-name]]` wikilinks (without file extension) to connect pages:
- Every concept page should link to related concepts and entities
- Every entity page should link to concepts it relates to
- Every summary should link to all concepts and entities it mentions
- Cross-reference liberally — the graph density IS the value

## Operations

### INGEST (adding a new source)

When asked to ingest a new source:

1. **Read** the full source from `raw/`
2. **Discuss** key takeaways with the user before writing
3. **Write summary** in `wiki/summaries/` following the naming convention
4. **For each major concept** mentioned in the source:
   - If a concept page exists: update it with new information, add the source to `sources:`
   - If no concept page exists: create one in `wiki/concepts/`
5. **For each entity** (organization, tool, framework, standard, person):
   - If an entity page exists: update it
   - If no entity page exists: create one in `wiki/entities/`
6. **If the source compares approaches**: create or update a comparison page in `wiki/comparisons/`
7. **If the source describes operational scenarios**: create pages in `wiki/scenarios/`
8. **Update `wiki/index.md`** with any new pages
9. **Append to `wiki/log.md`**: timestamp, source ingested, pages created/updated

### QUERY (answering questions)

When asked a question about the knowledge base:

1. Read `wiki/index.md` to identify relevant pages
2. Read the relevant wiki pages (not raw sources — the wiki IS the compiled knowledge)
3. Synthesize an answer citing specific wiki pages with `[[wikilinks]]`
4. If the answer reveals a gap, note it and offer to create a new page
5. If the query and answer are valuable, offer to save it as a new wiki page

### LINT (health check)

When asked to lint or review the wiki:

1. **Orphan check**: Find pages not linked from any other page
2. **Dead link check**: Find `[[wikilinks]]` pointing to nonexistent pages
3. **Stale check**: Flag pages not updated in 90+ days
4. **Contradiction check**: Look for conflicting claims across pages
5. **Coverage check**: Identify concepts mentioned in summaries but lacking their own page
6. **Confidence audit**: Review pages marked `low` confidence for possible upgrades
7. Report findings and offer to fix issues

### PROCESS FEEDBACK (batch review cycle)

When asked to process feedback:

1. **Retrieve** all open feedback issues:
   ```bash
   gh issue list --label wiki-feedback --state open --json number,title,body,labels,createdAt
   ```

2. **Parse** each issue: extract `WIKI-FEEDBACK-META` block from issue body. Group by page, then by section.

3. **Staleness check** for each issue:
   ```bash
   git diff <issue_wiki_version>..HEAD -- wiki/<page>.md
   ```
   - Target section unchanged → feedback is current, process it
   - Target section changed → check if feedback was already addressed
   - Section deleted → mark stale

4. **Process each page** with current feedback:
   - Read the current wiki page
   - Read all feedback items for that page
   - Determine which are actionable
   - Update the page content
   - Ensure changes are consistent with source reports in `raw/`

5. **Report per issue**:
   - Addressed: `gh issue comment <number> --body "Addressed in commit <sha>. Change: [description]."` then `gh issue close <number>`
   - Not addressable: `gh issue comment <number> --body "Reviewed but not addressed. Reason: [explanation]"` then `gh issue edit <number> --add-label "needs-human-review"`
   - Stale: `gh issue comment <number> --body "Section modified since submission. Please review current version and resubmit if issue persists."` then `gh issue close <number> --reason "not planned"`

6. **Write batch archive** to `feedback/batch-YYYY-MM-DD.md` with YAML frontmatter listing addressed, deferred, and stale issues. See DESIGN.md for the archive format.

7. **Commit**: reference issue numbers in commit message (`Fixes #12, #15, ...`)

8. **Summary**: create a GitHub Issue summarising the batch.

9. **Log**: append to `wiki/log.md`.

### UPDATE (modifying existing knowledge)

When updating wiki pages:

1. Always update the `updated:` date in frontmatter
2. If new information contradicts existing content, note the contradiction and cite both sources
3. Never delete information — mark superseded claims with context
4. Update all affected cross-references
5. Log the update in `wiki/log.md`

## Writing Guidelines

- **Be precise**: Use specific technical terminology from the nuclear and AI domains
- **Cite sources**: Every factual claim should reference a source in `sources:` frontmatter
- **Stay neutral**: Present findings without advocacy; note disagreements in the literature
- **Audience**: IFE researchers working on AI applications in nuclear operations
- **Length**: Concept pages 200-500 words; summaries 300-800 words; entity pages 100-300 words
- **Structure**: Use headers (##), bullet lists, and tables for scanability
- **No fluff**: Every sentence should convey information, not filler

## Index Format

`wiki/index.md` should be organized as:

```markdown
# Nuclear AI Wiki — Index

## Source Summaries
- [[summary-llm-foundations]] — Report 1: LLM architecture, training, limitations
- [[summary-multiagent]] — Report 2: Multi-agent system design patterns
...

## Core Concepts
### LLM Fundamentals
- [[transformer-architecture]] — Attention mechanisms, tokenization, context windows
...

### Nuclear Domain
- [[defense-in-depth]] — Layered safety barriers principle
...

## Entities
### Organizations
- [[nrc]] — U.S. Nuclear Regulatory Commission
...

### Frameworks & Tools
- [[crewai]] — Multi-agent orchestration framework
...

## Comparisons
- [[rag-vs-fine-tuning]] — When to retrieve vs. when to train
...

## Scenarios
- [[scenario-rod-withdrawal]] — Unplanned rod withdrawal during startup
...
```

## Log Format

`wiki/log.md` uses reverse-chronological entries:

```markdown
# Wiki Activity Log

## 2026-04-13
- **INGEST** raw/reports/report1-llm-foundations-v12.md
  - Created: summary-llm-foundations.md
  - Created: transformer-architecture.md, tokenization.md, ...
  - Updated: index.md
```
