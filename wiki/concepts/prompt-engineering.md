---
title: "Prompt Engineering"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[agent-architecture]]"
  - "[[sycophancy]]"
  - "[[non-determinism]]"
tags:
  - agent
  - engineering
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Prompt Engineering

Prompt engineering is the design of input text to shape LLM behaviour. It operates at multiple levels: system prompts that define the agent's identity and constraints, user prompts that frame specific queries, and structural techniques that improve reasoning quality.

## System Prompt

The system prompt (sometimes called "soul prompt") defines the agent's persistent identity, constraints, domain focus, and interaction style. It is injected at the start of every conversation and persists across sessions. For nuclear AI agents, the system prompt encodes the agent's role (e.g., thermal-hydraulics expert, procedure specialist, adversarial challenger) and operational boundaries.

**Critical limitation**: The system prompt **constrains but does NOT guarantee behaviour**. It is weighted context within the [[transformer-architecture]], not a hard rule. Strong user prompts, adversarial injection, or edge cases can override system prompt directives. This is why [[human-authority]] must be architectural, not prompt-based.

## Chain-of-Thought

Requiring the model to show explicit reasoning steps before producing a final answer improves accuracy on complex tasks. The model is more likely to reach correct conclusions when it "thinks through" intermediate steps. For nuclear applications, this has the additional benefit of producing auditable reasoning traces.

## Few-Shot Examples

Providing examples of desired input-output pairs dramatically affects performance. However, **example ordering** can swing accuracy from near-random to near state-of-the-art (Lu et al., 2022). This sensitivity means that few-shot prompt design requires empirical validation, not intuition.

## Format Sensitivity

Sclar et al. (2024) demonstrated that trivial formatting changes — spacing, delimiter choice, capitalisation — can cause up to **76% accuracy variation** on identical semantic content. This means prompt performance is fragile and cannot be assumed to transfer across minor implementation changes.

## Nuclear Implications

For nuclear AI systems:

- System prompts define agent roles but cannot be relied upon as safety barriers
- Chain-of-thought prompting should be standard for safety-relevant reasoning
- Few-shot examples must be empirically tested, not assumed effective
- Prompt changes (even minor formatting) require re-evaluation through the [[evaluation-harness]]
- The interaction between [[non-determinism]] and format sensitivity means identical prompts may produce variable quality across runs
