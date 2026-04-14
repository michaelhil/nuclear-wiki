---
title: "Simulator Coupling"
type: concept
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[relap5]]"
  - "[[frapcon]]"
  - "[[capability-gradient]]"
  - "[[situation-awareness]]"
tags:
  - prototyping
  - simulation
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Simulator Coupling

Simulator coupling connects LLM agents to thermal-hydraulic and fuel performance simulation codes, enabling physics-based prediction of future plant states. This is Level 4 of the [[capability-gradient]] and a critical capability for emergency response scenarios.

## Architecture

The coupling follows a strict division of labour:

1. **LLM specifies boundary conditions**: Based on current plant state and the scenario under consideration, the LLM formulates the simulation case — what initial conditions, what perturbation, what time horizon
2. **Simulation code computes physics**: [[relap5]], [[frapcon]], or other validated codes perform the actual thermal-hydraulic or fuel performance calculation
3. **LLM interprets results**: The simulation output (temperature profiles, pressure transients, void fractions) is returned to the LLM for interpretation and communication to the operator

## Critical Principle

**Physics comes from the simulation, NOT the LLM.** The LLM is a probabilistic text generator — it predicts what physics results look like, not what they are. An LLM "predicting" peak clad temperature during a LOCA is performing pattern matching against training data, not solving conservation equations. The simulation code solves the actual physics.

This principle is absolute. The LLM's role is to translate between human intent and simulation inputs, and between simulation outputs and human understanding. It must never substitute its own "prediction" for a simulation result.

## Projection Agent Role

In the Pattern 9 multi-agent configuration (see [[multi-agent-patterns]]), the **projection agent** is specifically responsible for simulator coupling. During [[emergency-response]] scenarios, this agent:

- Formulates simulation cases based on current and projected plant conditions
- Runs simulations through coupled codes
- Interprets results in the context of safety limits and operator concerns
- Communicates projected outcomes to the synthesiser and SA Bridge agents

## Challenges

Simulator coupling introduces several challenges: formulating valid boundary conditions requires domain expertise (the LLM may specify physically impossible conditions), simulation run times may not match real-time decision needs, and interpreting multi-dimensional simulation output requires careful extraction of safety-relevant metrics from large datasets.

These challenges are why simulator coupling is Level 4 rather than Level 1 — it requires the domain grounding from L2 ([[retrieval-augmented-generation]], [[knowledge-graphs]]) and the [[tool-calling]] infrastructure from L3 as prerequisites.
