---
title: "Scenario 7: Instrument Channel Failure"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[context-divergence]]"
  - "[[situation-awareness]]"
  - "[[pwr]]"
tags:
  - scenario
  - pwr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 7: Instrument Channel Failure

**Reactor**: Generic PWR.
**Pattern**: Pattern 9 (3 agents).
**Primary concepts**: Threading, attentional tunnelling.

## Description

An instrument channel fails, potentially causing operators to focus on the failed instrument while other parameters evolve. Three agents monitor different aspects: the failed instrument assessment, the remaining valid instruments, and the overall plant state.

Demonstrates the risk of attentional tunnelling — focusing on one thread while missing developments in others. The coordination monitor role detects when agents or operators are fixated on a single thread.
