---
title: "Shift Handover"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
  - raw/reports/report4-operational-scenarios.md
related:
  - "[[scenario-shift-handover]]"
  - "[[situation-awareness]]"
  - "[[agent-architecture]]"
tags:
  - nuclear
  - operations
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Shift Handover

Shift handover is the transfer of operational responsibility and [[situation-awareness]] from an outgoing crew to an incoming crew. It is one of the most safety-significant routine activities in nuclear operations because it creates a discontinuity in human awareness of plant state.

## SA Continuity Challenge

The fundamental challenge is maintaining situation awareness across the gap between crews. The outgoing crew has accumulated contextual understanding through hours of direct plant observation. The incoming crew must rapidly acquire equivalent understanding from briefings and documentation. Information loss during this transfer is a well-documented source of operational errors.

## AI-Assisted Handover

Pattern 7 (Personal Assistant + Heartbeat) from the [[multi-agent-patterns]] taxonomy provides continuous background monitoring via a heartbeat agent. This agent is not affected by crew changes — it maintains [[context-windows|context]] across the handover gap.

AI assistance for shift handover includes:

**Structured summaries**: Automatically generated summaries of shift activities organised by system, timeline, and significance. These complement but do not replace the operator-to-operator verbal briefing.

**Parameter trends**: Identified trends in key parameters over the shift period, highlighting any that are approaching limits or showing unusual behaviour.

**SA across the gap**: The AI system's episodic memory provides continuity that neither crew possesses individually. The outgoing crew's observations and the plant's parameter history are available to the incoming crew through the AI's stored context.

## Memory Architecture

Effective AI-assisted handover requires:

- **Episodic memory** with temporal organisation: events tagged by time, system, and significance
- **Collaborative memory**: operator-annotated records where the outgoing crew marks items requiring incoming crew attention
- Temporal memory organised by shifts, days, and operational periods — matching how nuclear operations naturally segment time

## Limitations

The AI handover summary is subject to [[hallucination]] risk — summarisation can introduce errors or omit critical details. The AI summary supplements but does not replace direct crew-to-crew communication. Due to [[statelessness]], the AI system's continuity depends entirely on the quality of its external memory stores and retrieval mechanisms.
