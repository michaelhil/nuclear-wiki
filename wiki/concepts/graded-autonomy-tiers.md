---
title: "Graded Autonomy Tiers"
type: concept
sources:
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[nrc]]"
  - "[[defense-in-depth]]"
  - "[[human-authority]]"
  - "[[10cfr50]]"
tags:
  - nuclear
  - regulation
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Graded Autonomy Tiers

The graded autonomy framework defines three tiers of AI deployment in nuclear operations, with regulatory burden proportional to safety significance. Each higher tier permits broader AI scope but requires correspondingly more rigorous safety justification and controls.

## Tier 1: Passive Display

The simplest deployment tier. AI provides information display — formatted data, trend visualisation, parameter summaries — without active recommendations. The system presents information; the operator interprets it.

**Regulatory requirements**: NUREG-0700 (Human-System Interface Design Review Guidelines) compliance for display design, plus 10 CFR 50.59 screening to confirm the change does not require prior NRC approval.

This tier is achievable with current regulatory frameworks and requires minimal extension of existing human factors guidance.

## Tier 2: Active Advisory — Normal Operations

AI provides active recommendations during normal operational conditions. The system advises; the operator decides. Outputs include suggested actions, prioritised information, and analytical assessments.

**Additional requirements beyond Tier 1**: NUREG-0711 (Human Factors Engineering Program Review Model) compliance, [[model-heterogeneity]] for advisory agents, and [[human-reliability-analysis]] that accounts for AI influence on operator decision-making.

## Tier 3: Active Advisory — Abnormal and Emergency

The highest tier. AI provides active advisory during abnormal conditions and emergency response. This is the most safety-significant application, where incorrect AI advice could directly influence safety-critical decisions.

**Additional requirements beyond Tier 2**: Independence analysis demonstrating [[epistemic-independence]], mandatory governance gates (see [[human-authority]]) before any safety-significant recommendation, and explicit skill maintenance programs to prevent operator deskilling from AI reliance.

## Design Principle

Higher scope demands more scrutiny. The regulatory burden is deliberately proportional to safety significance — not to discourage AI deployment but to ensure that the level of assurance matches the level of consequence. This graded approach allows organisations to deploy AI incrementally, building operational experience and regulatory confidence at each tier before advancing to the next.

The tiers map to [[multi-agent-patterns]]: Tier 1 might use simple single-agent displays, Tier 2 uses multi-agent advisory, and Tier 3 deploys the full Pattern 9 configuration with 7 agents and complete [[defense-in-depth]] architecture.
