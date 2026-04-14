---
title: "ATHEANA"
type: concept
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[human-reliability-analysis]]"
  - "[[automation-bias]]"
tags:
  - hra
  - method
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# ATHEANA

ATHEANA (A Technique for Human Event Analysis) is an HRA method documented in NUREG-1624. Unlike [[spar-h]] and [[idheas-eca]], which focus primarily on quantifying error probabilities, ATHEANA's primary strength is **identifying which specific scenarios are dangerous** through systematic analysis of error-forcing contexts.

## Error-Forcing Contexts

ATHEANA's core concept is the error-forcing context (EFC) — a combination of plant conditions, procedures, and human factors that makes a particular unsafe action appear reasonable or even correct to the operator. EFCs are not random errors; they are situations where the context itself drives the operator toward the wrong action.

## AI as Error-Forcing Context

AI advisory systems introduce a new category of EFCs: situations where the AI recommendation **makes the wrong action appear correct**. This is particularly dangerous because:

- The AI recommendation carries apparent authority and analytical backing
- The AI may provide detailed reasoning that makes the wrong action seem well-justified
- [[hallucination]] means the AI's reasoning may be entirely fabricated but completely fluent
- [[sycophancy]] means the AI may reinforce the operator's incorrect initial assessment

An AI recommendation that confidently points toward the wrong action creates a powerful error-forcing context — the operator has an apparently expert system endorsing their incorrect course of action.

## Commission Errors

ATHEANA is particularly well-suited to analysing **errors of commission** — actively doing the wrong thing rather than failing to do the right thing. AI-induced errors of commission (operator takes an incorrect action based on AI recommendation) are among the most dangerous new failure modes introduced by AI advisory systems.

The method systematically explores: What plant conditions could cause the AI to give wrong advice? How would that advice interact with operator expectations? What would make the operator follow the wrong advice rather than recognise the error?

## Quantification

ATHEANA is qualitative to semi-quantitative. It does not produce precise HEP values in the way [[spar-h]] does. Instead, it identifies and characterises dangerous scenarios, providing input to the qualitative safety case and helping define the scenarios that other methods should quantify.

Its greatest value in the AI context is **scenario identification**: systematically finding the situations where AI advisory could actively make things worse rather than better. This complements the quantitative methods by ensuring the right scenarios are being quantified.
