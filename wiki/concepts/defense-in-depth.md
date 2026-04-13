---
title: "Defense in Depth"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
  - raw/reports/report3-nuclear-regulatory.md
related:
  - "[[epistemic-independence]]"
  - "[[monoculture-collapse]]"
  - "[[common-cause-failure]]"
  - "[[knowledge-graphs]]"
tags:
  - nuclear
  - safety
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Defense in Depth

Defense in depth (DID) is the nuclear safety principle of maintaining multiple independent barriers between hazards and consequences. In physical plant design, these barriers include fuel cladding, the reactor coolant system boundary, and containment. The value of DID comes from **independence** — each barrier has distinct failure modes, so failure of one does not predict failure of another.

## AI Analogy

When applied to AI systems, defense in depth requires that reasoning and validation layers be genuinely independent. Agents sharing a single base model are like safety systems built from identical equipment by a single manufacturer — a [[common-cause-failure]] in the model (training bias, knowledge gap, systematic miscalibration) defeats all "barriers" simultaneously.

DID at the AI reasoning layer requires [[model-heterogeneity]] in the same way that physical DID requires design diversity. Different models, like different equipment designs, have different failure modes. The probability of simultaneous failure across genuinely diverse barriers is much lower than for homogeneous ones.

## Hybrid Pipeline as DID

The most robust DID architecture for nuclear AI combines distinct technology layers:

1. **Rule engine**: Deterministic logic for procedure traversal, limit checking, and structured constraints. Fails on ambiguity and edge cases but never hallucinates.
2. **LLM**: Probabilistic reasoning for interpretation, explanation, and handling situations not captured by rules. Handles ambiguity but may hallucinate.
3. **[[knowledge-graphs|Knowledge graph]] validation**: Structured constraint checking of LLM outputs against known facts and relationships. Catches hallucinations that violate encoded knowledge.
4. **Human review**: Operator evaluation via [[human-authority]] controls. Catches errors that survive all automated layers.

Each layer has **distinct failure modes**. The rule engine fails on unstructured situations. The LLM fails via [[hallucination]]. The KG fails on situations outside its encoded knowledge. The human fails via [[automation-bias]] or workload. Reliability comes from the independence of these failure modes, not from the perfection of any single layer.

## Key Insight

DID reliability depends on independence, not perfection. A system of imperfect but independent barriers is more reliable than a single sophisticated barrier. This is why [[monoculture-collapse]] — where all AI barriers share a single model — fundamentally undermines DID regardless of how capable that model is.
