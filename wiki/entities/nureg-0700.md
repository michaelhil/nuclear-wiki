---
title: "NUREG-0700 — Human-System Interface Design Review Guidelines"
type: entity
sources:
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[nrc]]"
  - "[[hsi-architecture]]"
  - "[[nureg-0711]]"
  - "[[graded-autonomy-tiers]]"
  - "[[automation-bias]]"
tags:
  - regulation
  - human-factors
  - design
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# NUREG-0700 — Human-System Interface Design Review Guidelines

NRC guidelines with detailed criteria for display design, alarm systems, controls, procedures, workstation layout, and communication systems.

## Key Sections for AI Advisory

- **§4 Display Design**: Information presentation criteria — applies to AI advisory formatting
- **§5 Alarm Systems**: Prioritisation, suppression, presentation — relevant to [[alarm-prioritization]]
- **§7 Procedures**: Computerised procedure systems — applicable to [[procedure-ai-interaction]]
- **§11 Automation**: Existing guidelines partially applicable but not written for LLM-based systems

## AI-Specific Requirements

Tier 1 AI advisory (passive display under [[graded-autonomy-tiers]]) must comply. Key requirements:

- AI advisory **visually distinguishable** from qualified safety instrumentation
- Information density within operator processing capacity
- Display supports [[situation-awareness]], doesn't undermine it
- AI alarm output does not interfere with primary alarm system

Report 3 notes NUREG-0700 needs supplementary guidance for LLM-specific considerations (confidence indicators, reasoning chain presentation, multi-agent status).
