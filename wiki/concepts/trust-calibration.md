---
title: "Trust Calibration"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[calibration]]"
  - "[[automation-bias]]"
  - "[[sycophancy]]"
tags:
  - human-factors
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Trust Calibration

Trust calibration is the alignment between an operator's trust in an AI system and the system's actual reliability (Lee & See, 2004). Properly calibrated trust means the operator relies on the AI when it is likely correct and maintains independent judgment when AI reliability is lower.

## Trust Failure Modes

**Over-trust**: The operator follows AI recommendations without sufficient independent evaluation. This leads to [[automation-bias]] — accepting incorrect AI advice because trust exceeds actual reliability. Most dangerous when the AI is wrong with high confidence (see [[hallucination]], [[calibration]]).

**Under-trust**: The operator ignores correct AI recommendations, negating the benefit of the advisory system. Resources invested in AI capability are wasted. This may occur after the operator experiences AI failures, even if overall reliability is high.

**Slop-induced disengagement**: A distinct failure mode where the operator stops actively evaluating AI output after repeated exposure to generic, low-value responses. This is not over-trust (the operator does not believe the AI is correct) but rather **cessation of engagement** — the operator mentally tunes out the advisory channel.

The cry-wolf analogy applies: when the AI consistently produces unhelpful output, the operator learns to ignore it. When the AI subsequently produces genuinely important information, the operator's learned disengagement causes them to miss it.

## Requirements for Calibrated Trust

Achieving calibrated trust requires:

- **Reliable confidence indicators**: Problematic because LLM [[calibration]] is poor, especially on difficult questions
- **Experience with failures**: Operators must encounter AI errors during training to develop realistic expectations. Only seeing AI successes produces over-trust.
- **Transparent reasoning**: Showing the AI's chain-of-thought helps operators assess output quality. However, this introduces a paradox: transparent reasoning may actually increase [[automation-bias]] because detailed reasoning makes the AI seem more trustworthy even when wrong.

## Design Implications

Trust calibration cannot be achieved through AI system design alone — it requires integrated training programs that expose operators to realistic AI failure modes, operational procedures that structure the human-AI interaction to maintain appropriate trust levels, and [[hsi-architecture]] design that presents AI output in ways that encourage evaluation rather than blind acceptance.

The interaction with [[sycophancy]] is particularly important: an AI that agrees with the operator feels more trustworthy, reinforcing the operator's trust even when agreement is a failure mode rather than a signal of correctness.
