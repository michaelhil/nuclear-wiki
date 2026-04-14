---
title: "Scenario 8: Multi-Unit SMR Monitoring"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[smr]]"
  - "[[multi-agent-patterns]]"
  - "[[situation-awareness]]"
  - "[[common-cause-failure]]"
  - "[[context-divergence]]"
  - "[[delivery-modes]]"
tags:
  - scenario
  - smr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 8: Multi-Unit SMR Monitoring

**Reactor**: Generic SMR, four modules, shared control room.
**Pattern**: Pattern 9 (9 agents).
**Primary concept**: Multi-unit SA scaling.

## Description

The most agent-dense scenario in the series. Nine agents monitor four reactor modules from a single control room — the configuration anticipated for next-generation SMR plants where one crew oversees multiple units simultaneously.

## Agent Architecture

- **Module monitors** (4): One per reactor module, maintaining continuous [[situation-awareness]] of its assigned unit
- **Cross-unit analyst** (1): Watches for correlations and [[common-cause-failure|common-cause patterns]] across modules
- **Adversarial agent** (1): Different base model, challenges consensus assessments
- **Synthesiser** (1): Aggregates module monitors into integrated plant-wide picture
- **SA Bridge** (1): Translates multi-agent output into operator displays adapted to current attention focus
- **Coordination monitor** (1): Tracks agent health, detects [[context-divergence]], flags stale assessments

## Key Design Challenges

**SA scaling**: The operator must maintain awareness across four units. The SA Bridge adaptively surfaces the most safety-relevant information without requiring manual polling.

**Cross-unit common-cause detection**: The cross-unit analyst correlates patterns invisible to individual module monitors — a feedwater oscillation in Module 2 combined with a similar pattern in Module 4 may indicate a shared support system problem.

**Context window arithmetic**: With 9 agents generating output, a 128K context window fills rapidly. Strict context discipline is essential.

## Adaptive Execution

Single-agent mode during normal conditions (one agent per module in Pattern 7 heartbeat mode), escalating to full multi-agent operation when transients are detected. Matches architectural complexity to operational demand.

## Demonstrated Principles

Tests the limits of multi-agent coordination. Agent count must be matched to operator [[cognitive-load|cognitive capacity]] — adding agents beyond supervisory capacity produces net negative performance.
