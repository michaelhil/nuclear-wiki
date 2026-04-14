---
title: "HSI Architecture"
type: concept
sources:
  - raw/reports/report3-nuclear-v11.md
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[situation-awareness]]"
  - "[[automation-bias]]"
  - "[[delivery-modes]]"
  - "[[trust-calibration]]"
tags:
  - nuclear
  - human-factors
  - design
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# HSI Architecture

Human-System Interface (HSI) architecture defines how AI advisory outputs are presented to operators within the control room environment. The design must maintain clear boundaries between authoritative information (qualified instruments) and advisory information (AI outputs) to prevent [[automation-bias]].

## Visual Distinction Requirement

AI advisory displays MUST be visually distinct from authoritative qualified instruments. This is not a stylistic preference but a safety requirement. If AI advisory output appears in the same format, location, and visual style as qualified instrument readings, operators may unconsciously treat AI recommendations with the same authority as instrument data.

Design requirements:
- Separate display areas or panels for AI advisory content
- Distinct visual styling (colour coding, borders, labelling)
- Clear "AI Advisory" labels on all AI-generated content
- No mixing of AI output with direct instrument readings

## Typed Artefacts

AI agents produce structured output using typed artefacts — predefined output formats that constrain the form of AI communication. This prevents agents from producing unstructured free-text that operators must parse under time pressure. Types include: parameter assessment, procedure recommendation, trend analysis, alarm interpretation, and projection summary.

## SA Bridge Display

The SA Bridge agent (see [[situation-awareness]]) translates multi-agent outputs into operator-comprehensible summaries. Its display is the primary interface between the multi-agent system and the operator, designed to maintain operator SA without requiring the operator to track individual agent outputs.

## Display Modes

The HSI adapts to operational context:

- **Normal mode**: Standard advisory display, routine information delivery
- **Alert mode**: Enhanced visibility for safety-relevant advisories, attention-directing cues
- **Emergency mode**: Streamlined display focused on critical parameters and immediate actions, reduced non-essential information

## Agent Status Panel

A dedicated panel shows the status of all active agents: which are running, their current focus, their last update time, and any error states. This gives operators visibility into the AI system's health and focus, supporting the operator's [[human-authority]] role as system supervisor.

## Delivery Mode Controls

Operator-accessible controls for [[delivery-modes]] must be visible and immediately accessible: room pause, individual agent mute, flow gate controls, and delivery rate adjustment. These controls are the physical implementation of [[human-authority]] at the interface level.
