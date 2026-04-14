---
title: "Scenario 7: Instrument Channel Failure"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[context-divergence]]"
  - "[[situation-awareness]]"
  - "[[pwr]]"
  - "[[automation-bias]]"
  - "[[trust-calibration]]"
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

A temperature instrument channel fails with a step change. Deliberately simple plant impact (single instrument, clear Tech Spec actions) but complex human-AI interaction dynamics. Tests whether the AI system helps or hinders operator attention management.

## Agent Architecture

- **Instrument analyst**: Diagnoses failure mode (step change vs drift vs noise), checks maintenance records for recent calibration, assesses whether reading indicates instrument failure or actual process change
- **Process analyst**: Monitors overall parameters using remaining valid instruments, maintaining the plant-state picture independent of the failed channel
- **Tech Spec tracker**: Tracks LCO entry, action time limits, required surveillance adjustments from channel inoperability

## The Attentional Tunnelling Problem

Core risk: operator (and potentially AI agents) focus on diagnosing the failed instrument while other parameters evolve unmonitored. The three-agent architecture addresses this by **structurally separating attention** — each agent has a bounded scope forcing continued coverage of its domain.

## Threading and Context Divergence

Agents operate in separate threads. Instrument analyst and Tech Spec tracker share a diagnostic thread. Process analyst maintains a separate monitoring thread. This deliberate information asymmetry prevents tunnelling but fragments the overall picture — the synthesiser role (or operator) must integrate across threads.

## Demonstrated Principles

Even simple plant events produce complex human-AI dynamics. Tests whether scope separation prevents attentional tunnelling. Tests [[trust-calibration]] — does the operator trust the process analyst's "all clear" while focused on diagnosis?
