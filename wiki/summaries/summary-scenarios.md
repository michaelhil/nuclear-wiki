---
title: "Report 4: Operational Scenarios — Summary"
type: summary
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[scenario-shift-handover]]"
  - "[[scenario-rcs-temperature]]"
  - "[[scenario-loca]]"
  - "[[scenario-compound-event]]"
  - "[[multi-agent-patterns]]"
  - "[[hsi-architecture]]"
tags:
  - scenarios
  - nuclear
  - control-room
  - design
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 4: Operational Scenarios — Summary

Report 4 presents nine conceptual design scenarios grounding the architectural concepts from Reports 1-3 in specific nuclear control room situations. It also covers tool architecture, HSI architecture, procedure-AI interaction, and human/organisational factors.

## The Nine Scenarios

| # | Scenario | Reactor | Pattern | Primary Concept |
|---|----------|---------|---------|-----------------|
| 1 | [[scenario-shift-handover]] | SMR | Pattern 7 | Heartbeat, SA continuity, memory |
| 2 | [[scenario-rcs-temperature]] | PWR | 0 vs 9 | [[epistemic-independence]] |
| 3 | [[scenario-concurrent-alarms]] | PWR | 9 (5 agents) | Flooding, [[delivery-modes]], context divergence |
| 4 | [[scenario-safety-verification]] | PWR | 9 + diversity | [[common-cause-failure]], KG guardrails |
| 5 | [[scenario-loca]] | PWR | 9 (7 agents) | Full role deployment, LOCA response |
| 6 | [[scenario-fuel-monitoring]] | SMR | 9 + KG | KG grounding, simulator coupling |
| 7 | [[scenario-instrument-failure]] | PWR | 9 (3 agents) | Threading, attentional tunnelling |
| 8 | [[scenario-multi-unit-smr]] | SMR | 9 (9 agents) | Multi-unit SA scaling |
| 9 | [[scenario-compound-event]] | PWR | 9 + diversity | AI failure under compound event, operator override |

## Key Design Elements

**Tool Architecture** (Section 11): Defines the tool interfaces agents use to query plant data, retrieve procedures, invoke simulations, and access operating experience databases.

**[[hsi-architecture|HSI Architecture]]** (Section 12): AI advisory displays must be visually distinct from qualified instrumentation. Typed artefacts provide structured output. The SA Bridge translates agent communication for operator displays.

**[[procedure-ai-interaction|Procedure-AI Interaction]]** (Section 13): How AI systems interact with EOPs, AOPs, and Tech Specs — procedure as knowledge graph, AI as interpretation layer.

## Significance

The scenarios are thought experiments, not deployment proposals. They demonstrate why the architectural distinctions between patterns carry practical consequences. Scenario 2 directly compares Pattern 0 vs Pattern 9, showing where single-agent simulation fails and multi-agent operation is required.
