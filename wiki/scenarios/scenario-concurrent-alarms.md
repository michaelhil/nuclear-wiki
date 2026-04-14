---
title: "Scenario 3: Concurrent Alarms During Reactor Transient"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[alarm-prioritization]]"
  - "[[delivery-modes]]"
  - "[[context-divergence]]"
  - "[[pwr]]"
  - "[[situation-awareness]]"
  - "[[hsi-architecture]]"
  - "[[cognitive-load]]"
tags:
  - scenario
  - pwr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 3: Concurrent Alarms During Reactor Transient

**Reactor**: Generic PWR.
**Pattern**: Pattern 9 (5 agents).
**Primary concepts**: Flooding, [[delivery-modes]], [[context-divergence]].

## Description

A reactor transient triggers a cascade of alarms across RCS, pressuriser, steam generators, and containment. Alarm count exceeds operator processing capacity within seconds. Tests whether multi-agent advisory provides net benefit (filtering, prioritising, synthesising) or net harm (adding information flood on top of alarm flood).

## Agent Architecture

- **RCS analyst**: Monitors temperature, pressure, flow, level
- **Secondary analyst**: Monitors steam generators, feedwater, secondary-side conditions
- **Alarm diagnostician**: Cross-references active alarms against known patterns in operating experience. Identifies consequential vs symptomatic alarms
- **Procedure navigator**: Tracks which EOP path current conditions require, immediate actions, approaching decision points
- **Synthesiser**: Integrates outputs into priority-ordered assessment

## The Flooding Problem

Without delivery controls, 5 agents respond simultaneously — each producing 200-400 tokens on top of the alarm cascade. Makes the situation **worse**, not better.

## Delivery Mode Solution

**Flow-gated delivery**: Procedure navigator first (what to do), alarm diagnostician second (what's causing this), synthesiser third (overall picture), specialists on request. Operator controls pacing and can invoke [[human-authority|room pause]].

## Agent-Parallel Execution

Agents run in parallel despite sequential delivery — all begin analysis when transient detected. Total latency ≈ slowest single agent. The synthesiser has all specialist outputs by its delivery turn.

## Temporal Coherence

During fast transients, agents starting at different times work with different parameter snapshots. The synthesiser detects and flags temporal skew between assessments.

## Demonstrated Principles

Tests whether [[delivery-modes]] convert potential information flood into managed stream. Tests [[alarm-prioritization]] value. Tests Pattern 9 viability under time pressure.
