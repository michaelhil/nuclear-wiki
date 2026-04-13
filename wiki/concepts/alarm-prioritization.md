---
title: "Alarm Prioritization"
type: concept
sources:
  - raw/reports/report4-operational-scenarios.md
related:
  - "[[scenario-concurrent-alarms]]"
  - "[[delivery-modes]]"
  - "[[hsi-architecture]]"
tags:
  - nuclear
  - operations
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Alarm Prioritization

Alarm prioritization is the AI-assisted management of multiple concurrent alarms during plant transients. When several alarms fire simultaneously — as commonly occurs during transient conditions — operators face cognitive overload from the volume of information. AI can assist by cross-referencing alarm data, identifying underlying causes, and prioritising alarms by safety significance.

## The Problem

During plant transients, dozens or hundreds of alarms can activate within seconds. Many are consequential (triggered by the same root cause rather than indicating independent problems). Operators must rapidly distinguish:

- First-cause alarms indicating the initiating event
- Consequential alarms that are expected given the initiating event
- Unexpected alarms that may indicate additional failures
- Nuisance alarms unrelated to the transient

Without assistance, this discrimination task overwhelms cognitive capacity precisely when accurate situation assessment matters most.

## AI Assistance

AI can provide value by:

- Cross-referencing active alarms against known transient signatures to identify probable root causes
- Highlighting alarms that are unexpected for the identified transient (potential additional failures)
- Prioritising by safety significance rather than chronological order
- Linking alarms to relevant procedure entries and response actions

## Critical Risk: Vacuous Prioritization

The primary risk in AI-assisted alarm management is **vacuous prioritisation** — producing a list of alarms with generic priority labels that does not actually help the operator discriminate. Listing all alarms as "high priority" or providing a sorted list without explaining the sorting rationale adds no value and may create false confidence.

Effective prioritisation must be **discriminating**: it must clearly distinguish between alarms that require immediate attention and those that are expected consequences of the identified transient. The [[evaluation-harness]] should specifically test for specificity versus vacuousness.

## Requirements

Effective alarm prioritisation requires:

- Access to the plant historian for current and recent parameter trends
- Alarm response procedure retrieval via [[retrieval-augmented-generation]]
- Cross-alarm pattern recognition (linking multiple alarms to common causes)
- System topology knowledge (via [[knowledge-graphs]]) to trace causal chains

The delivery of prioritised alarm information must follow appropriate [[delivery-modes]] — during high-workload transients, flow-gated delivery prevents additional information overload from the prioritisation system itself.
