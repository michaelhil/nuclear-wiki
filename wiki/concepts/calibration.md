---
title: "Calibration"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[hallucination]]"
  - "[[post-training-alignment]]"
  - "[[trust-calibration]]"
tags:
  - llm
  - safety
  - failure-mode
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Calibration

Calibration measures whether an LLM's stated confidence matches its actual accuracy. A well-calibrated model that says it is "85% confident" should be correct approximately 85% of the time.

## Current State

LLMs are **partially calibrated** on routine questions but calibration degrades on harder questions — precisely when reliable confidence signals matter most. This creates an inverse reliability trap: the model's confidence indicators are least trustworthy when the stakes are highest.

## RLHF Degradation

[[post-training-alignment|RLHF alignment]] actively worsens calibration. Human evaluators prefer confident, decisive answers during training. The reward model learns to score confidence highly. The LLM then learns to express confidence even when uncertain, creating systematic **overconfidence** (Tian et al., 2023).

This means alignment and calibration are in tension: methods that make models more helpful and confident also make them less honest about their uncertainty.

## Verbalized vs. Internal Confidence

Two types of confidence signals exist:

**Verbalized confidence**: The model states "I am 85% confident that..." This is generated text — a prediction of what confident text looks like — and is often overconfident. It is a [[hallucination]]-prone output like any other text.

**Internal token probabilities**: The actual probability distribution over next tokens. These are better calibrated but are not always available through commercial APIs and require careful interpretation.

## Post-Hoc Calibration

Techniques exist (Guo et al., 2017) to recalibrate model outputs after generation using temperature scaling or other methods. However, these require a **representative calibration dataset** — a set of questions with known answers that matches the distribution of real queries. For nuclear applications, no such dataset exists. The domain is too specialised and the consequence space too varied for generic calibration to transfer.

## Nuclear Implications

Confidence indicators displayed to operators must be treated with extreme caution. A displayed confidence level may give a **false sense of reliability**, encouraging [[automation-bias]]. Operators may treat "AI confidence: 92%" as equivalent to an instrument reading, when it is actually a poorly calibrated statistical estimate.

Design recommendations:

- Do not display raw confidence scores to operators without qualification
- If confidence is displayed, pair with historical accuracy rates for similar query types
- Train operators to understand that high stated confidence does not guarantee correctness
- Use [[knowledge-graphs]] for validation rather than relying on model self-assessment
- See [[trust-calibration]] for the broader operator trust relationship
