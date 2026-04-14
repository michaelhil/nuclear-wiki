---
title: "Scenario 6: Long-Term Fuel Integrity Monitoring"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[knowledge-graphs]]"
  - "[[simulator-coupling]]"
  - "[[smr]]"
  - "[[capability-gradient]]"
  - "[[frapcon]]"
tags:
  - scenario
  - smr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 6: Long-Term Fuel Integrity Monitoring

**Reactor**: Generic SMR.
**Pattern**: Pattern 9 + KG + adaptive.
**Primary concepts**: [[knowledge-graphs|KG]] grounding, [[simulator-coupling]].

## Description

Long-term monitoring of fuel integrity across an operating cycle (18-24 months). Unlike transient-focused scenarios, this tests AI advisory over extended timescales where gradual trends develop slowly and context spans weeks to months.

## Agent Architecture

- **Fuel performance analyst**: Monitors burnup, cladding integrity, fission gas release. Grounded in [[knowledge-graphs|KG]] encoding fuel design limits and vendor guidelines
- **Projection agent**: Coupled to [[frapcon|FRAPCON]]. Periodically computes forward projections of fuel conditions. LLM specifies boundary conditions; physics from simulation code
- **Chemistry analyst**: Tracks primary coolant chemistry (iodine, caesium ratios) for early fuel degradation indicators
- **Operating history agent**: Maintains episodic memory of fuel-relevant events across the full cycle

## KG Grounding

The knowledge graph encodes fuel design limits, Tech Spec surveillance requirements, parameter-to-performance relationships, and historical fuel failure precursor patterns. KG guardrails prevent reassuring assessments when parameters have exceeded design limits.

## Adaptive Architecture

Reduced mode during normal operations (single analyst + periodic FRAPCON projections), escalating to full deployment when indicators approach limits or anomalous chemistry detected.

## Demonstrated Principles

Tests [[simulator-coupling]] for Level 3 SA over long timescales. Tests KG grounding against verified fuel design knowledge. Tests long-term episodic memory management across months without unbounded context growth.
