---
title: "Scenario 2: Developing RCS Temperature Anomaly"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[epistemic-independence]]"
  - "[[multi-agent-patterns]]"
  - "[[capability-gradient]]"
  - "[[pwr]]"
tags:
  - scenario
  - pwr
  - pattern-0
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 2: Developing RCS Temperature Anomaly

**Reactor**: Generic PWR.
**Pattern**: Pattern 0 vs Pattern 9 comparison.
**Primary concept**: [[epistemic-independence]].

## Description

Hot Leg A temperature reads 0.5°C above expected value and trends upward at 0.15°C/hour. The scenario directly compares Pattern 0 (single-agent role simulation) against Pattern 9 (concurrent multi-agent with model diversity) on the same diagnostic task.

## Key Finding

Pattern 0 cannot maintain independent perspectives — unified attention means all "agents" share the same reasoning biases. Pattern 9 with model diversity produces genuinely independent assessments where agreement or disagreement carries epistemic weight.

## Running Example

This scenario threads through all eight levels of Report 6's [[capability-gradient]], growing in complexity from a free-form question (Level 0) through local model comparison (Level 1), RAG-grounded diagnosis (Level 2), tool-calling evaluation (Level 3), simulator-coupled projection (Level 4), persistent monitoring (Level 5), multi-agent coordination (Level 6), to human-in-the-loop studies (Level 7).
