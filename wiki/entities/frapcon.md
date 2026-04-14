---
title: "FRAPCON — Fuel Performance Simulation Code"
type: entity
sources:
  - raw/reports/report6-prototyping-guide-v12.md
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[simulator-coupling]]"
  - "[[relap5]]"
  - "[[scenario-fuel-monitoring]]"
  - "[[capability-gradient]]"
tags:
  - simulation
  - nuclear
  - fuel
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# FRAPCON — Fuel Performance Simulation Code

FRAPCON is a US NRC-sponsored steady-state fuel rod analysis code developed by Pacific Northwest National Laboratory. It models thermal and mechanical behaviour of LWR fuel rods, predicting cladding temperature, fission gas release, cladding strain, and other performance metrics.

## Role in Nuclear AI

Target for [[simulator-coupling]] at Level 4 of the [[capability-gradient]]. In [[scenario-fuel-monitoring|Scenario 6]], a projection agent couples to FRAPCON for forward projections of fuel integrity over an operating cycle.

Critical design principle: **physics comes from the simulation code, not from the LLM**. The LLM specifies boundary conditions and interprets results; FRAPCON provides the validated thermal-mechanical analysis that token prediction cannot reliably perform.
