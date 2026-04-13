---
title: "Non-Determinism"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[calibration]]"
  - "[[hallucination]]"
tags:
  - llm
  - safety
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Non-Determinism

LLM output is inherently stochastic. The model produces a probability distribution over possible next tokens, and the **temperature parameter** controls how much randomness is introduced when sampling from that distribution. Higher temperature means more variation; lower temperature concentrates probability on the most likely tokens.

## Even Temperature Zero Is Not Deterministic

A common misconception is that setting temperature to zero produces deterministic output. In practice, **floating-point non-associativity** in GPU computation prevents exact reproducibility. The order of parallel floating-point operations can vary between runs, producing slightly different intermediate values that cascade into different token selections. The same input to the same model on the same hardware can produce different outputs on repeated runs.

This is by design, not a bug. The stochastic nature of generation is what gives LLMs their flexibility and ability to produce varied, contextually appropriate responses.

## Conflict with Nuclear V&V

Nuclear software verification and validation frameworks — IEEE 603, NRC Regulatory Guide 1.152 — assume **deterministic software** where the same inputs produce the same outputs. LLMs fundamentally violate this assumption. Traditional V&V methods (test cases with expected outputs, regression testing, bit-exact reproducibility) cannot be directly applied.

This requires a paradigm shift toward **statistical characterisation**: evaluating model behaviour over multiple runs to establish distributional properties rather than point-verified correctness. The [[evaluation-harness]] approach addresses this by running the same semantic query through multiple phrasings and measuring response distributions.

## Operational Implications

**Shift turnover scenario**: An outgoing crew asks the AI system to assess current plant status. An incoming crew asks the same question moments later. Due to non-determinism, they may receive **different assessments** — not because conditions changed, but because the model sampled differently. This could create confusion during [[shift-handover]] and undermine [[trust-calibration]].

**Reproducibility for investigation**: If an AI advisory contributed to an operational decision, investigators may not be able to reproduce the exact output the operators saw. Logging the actual AI outputs (not just the inputs) becomes essential for post-event analysis.

## Mitigation Approaches

- Log all AI outputs verbatim, not just inputs
- Use structured output formats that constrain variation to presentation rather than substance
- Statistical evaluation across multiple runs for safety-relevant functions
- Design operational procedures that account for output variation rather than assuming consistency
- Cross-reference AI outputs against deterministic systems like [[knowledge-graphs]] and rule engines
