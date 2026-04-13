---
title: "Scenario 1: Shift Handover Monitoring"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[shift-handover]]"
  - "[[multi-agent-patterns]]"
  - "[[situation-awareness]]"
  - "[[smr]]"
tags:
  - scenario
  - smr
  - pattern-7
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 1: Shift Handover Monitoring

**Reactor**: Generic SMR, four modules, shared control room.
**Pattern**: Pattern 7 (Personal Assistant with Heartbeat).
**Primary concepts**: Heartbeat, SA continuity, memory architecture.

## Description

A heartbeat-triggered monitoring agent maintains continuous awareness of plant state across shift boundaries. The agent generates structured handover summaries, flags parameter trends that developed during the shift, and maintains episodic memory organised along operationally meaningful temporal boundaries (shifts, days, outage periods).

## Key Design Elements

- Persistent identity (soul prompt) consistent across shift changes
- Episodic memory with temporal organisation and cross-shift linking
- Collaborative memory: operator writes shift log, agent suggests structured tags and cross-references
- Heartbeat invocation at regular intervals for proactive monitoring

## Demonstrated Principles

Illustrates why persistence (cross-session identity) and heartbeat (scheduled autonomous invocation) are key transitions on the [[agent-architecture|autonomy scale]]. Shows how a single Pattern 7 agent provides value without the complexity of multi-agent coordination.
