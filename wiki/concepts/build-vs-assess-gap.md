---
title: "Build vs. Assess Gap"
type: concept
sources:
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[capability-gradient]]"
  - "[[evaluation-harness]]"
tags:
  - nuclear
  - methodology
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Build vs. Assess Gap

The build vs. assess gap is the central barrier to responsible deployment of AI in nuclear operations: the distance between what can be built and what can be rigorously assessed.

## The Asymmetry

**Building** a multi-agent nuclear advisory system is technically achievable in weeks. Current AI frameworks (LangChain, CrewAI, AutoGen) combined with LLM APIs enable rapid prototyping of sophisticated multi-agent architectures with tool calling, retrieval augmentation, and structured output.

**Assessment** of such a system for nuclear safety-critical use requires:

- Nuclear-specific benchmarks — **none exist**
- Domain-specific evaluation frameworks — **none exist**
- Empirical data on human-AI interaction in nuclear contexts — **none exists**
- Validated [[human-reliability-analysis]] parameters for AI-assisted operations — **none exist**
- Quantified [[common-cause-failure]] models for multi-model systems — **no methodology exists**

## Consequence

Building capability outpaces assessment capability. This creates a risk of deploying systems that seem impressive in demonstration but whose safety properties are unknown and uncharacterised. The gap between "it works in the demo" and "we can demonstrate it meets safety requirements" is vast.

## How the Gradient Addresses It

The [[capability-gradient]] framework addresses the build-assess gap by **producing evidence at each level**. Rather than building the complete system and then attempting to assess it holistically, each level of the gradient generates specific evidence:

- L0 ([[evaluation-harness]]) establishes baseline capability measurement
- L2 (RAG + KG) produces evidence on grounding effectiveness
- L4 ([[simulator-coupling]]) produces evidence on physics-based projection reliability
- L6 (multi-agent) produces evidence on coordination and independence
- L7 (human-in-loop) produces evidence on operator interaction and [[trust-calibration]]

Each level's evidence addresses specific gaps identified in Reports 1-5. The assessment infrastructure grows alongside the system capability, rather than lagging behind it.

## Implication

The build-assess gap means that the most valuable contribution is not building more capable systems — that is already straightforward — but building the assessment infrastructure (benchmarks, evaluation frameworks, empirical data) that enables credible safety cases. The gradient framework prioritises assessment evidence production as an explicit goal of each prototyping level.
