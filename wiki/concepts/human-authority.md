---
title: "Human Authority"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[graded-autonomy-tiers]]"
  - "[[delivery-modes]]"
  - "[[automation-bias]]"
  - "[[situation-awareness]]"
tags:
  - human-factors
  - safety
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Human Authority

Human authority refers to the structural controls that ensure human operators retain decision-making power over safety-significant actions in AI-assisted nuclear operations. The key word is **structural** — these controls must be architectural properties of the system, not behavioural expectations of the AI.

## Control Mechanisms

Four primary mechanisms enforce human authority:

**Governance gate**: Requires explicit human approval before any safety-significant action is executed. The system queues the proposed action and blocks until the operator confirms. This is mandatory for [[graded-autonomy-tiers|Tier 3]] (emergency) operations.

**Room pause**: Operator can halt all agent output immediately. A single control that silences the entire multi-agent system. Essential during critical moments when operator attention must focus on direct plant interaction.

**Flow gate**: Agent outputs are queued and released under operator control rather than delivered immediately. The operator controls the pace of information flow, preventing information overload during high-workload periods. See [[delivery-modes]].

**Mute**: Silences individual agents without affecting others. Allows the operator to reduce cognitive load by removing currently irrelevant advisory channels.

## Architectural vs. Behavioural

The distinction between architectural and behavioural controls is critical. A system prompt telling the AI "always ask for operator confirmation before recommending safety actions" is a **behavioural expectation** — it shapes probability, not certainty (see [[post-training-alignment]]). The AI may, under unusual circumstances, bypass this instruction.

An architectural governance gate that physically blocks action execution until a confirmation signal is received from a separate input channel is a **structural control**. It cannot be bypassed by the AI because the AI does not have the capability to generate the confirmation signal.

## Advisory-Only Principle

In nuclear applications, the AI system operates in an **advisory-only** capacity. The operator retains final authority over all decisions. This is not a technical limitation to be overcome but a deliberate safety design choice. The AI recommends; the human decides and acts.

This principle must hold even when the AI is demonstrably more accurate than the operator on routine tasks. The rare cases where the AI is wrong and the operator is right justify maintaining human authority, because the consequences of undetected AI error in nuclear operations can be severe. [[automation-bias]] mitigation depends on maintaining this authority relationship.
