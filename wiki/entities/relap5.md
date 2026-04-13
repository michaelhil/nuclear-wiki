---
title: "RELAP5 — Thermal-Hydraulic Simulation Code"
type: entity
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[simulator-coupling]]"
  - "[[frapcon]]"
  - "[[capability-gradient]]"
tags:
  - simulation
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# RELAP5

A thermal-hydraulic simulation code used in nuclear safety analysis for modelling reactor coolant system transients. Referenced in the report series as the target for [[simulator-coupling]] at Level 4 of the [[capability-gradient]].

The projection agent role in Pattern 9 architectures couples to RELAP5 (or similar codes) for Level 3 SA: computing forward projections of plant state based on current conditions. The LLM specifies boundary conditions and interprets results; the physics comes from the simulation code, not from the LLM.
