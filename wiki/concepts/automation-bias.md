---
title: "Automation Bias"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[sycophancy]]"
  - "[[hallucination]]"
  - "[[trust-calibration]]"
  - "[[hsi-architecture]]"
tags:
  - human-factors
  - safety
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Automation Bias

Automation bias is the tendency to over-rely on automated system recommendations, even when contradicted by other available information (Parasuraman & Manzey, 2010). It manifests in two forms:

## Error Types

**Omission errors**: Failing to notice that the automated system did NOT flag a problem. The operator assumes "no alert = no problem" and stops actively monitoring. If the AI system fails to detect an anomaly, the operator may also miss it because they have delegated detection to the system.

**Commission errors**: Following an incorrect automated recommendation despite contradicting evidence. The operator acts on the AI advisory rather than their own assessment or other instrument readings.

## LLM-Specific Amplifiers

Three LLM properties make automation bias particularly dangerous:

**Confidence without correctness**: [[hallucination|Hallucinated]] outputs read with the same authority as correct ones. Unlike a traditional alarm system that either fires or does not, an LLM can provide detailed, confident, and wrong analysis.

**[[sycophancy]]**: If the operator expresses agreement with an incorrect AI assessment, the AI confirms rather than challenges, reinforcing the error.

**Poor [[calibration]]**: Stated confidence levels do not reliably indicate actual accuracy, making it harder for operators to appropriately weight AI input.

## Mitigation Strategies

**Sequential assessment**: The operator forms and documents their own assessment BEFORE consulting the AI system. This prevents the AI recommendation from anchoring the operator's judgment.

**Visual distinction**: AI advisory outputs must be visually distinct from qualified instruments on the [[hsi-architecture|HSI]]. Different display areas, different styling, clear labelling as "AI Advisory" prevent operators from treating AI output with the same authority as direct instrument readings.

**Failure exposure**: Training must expose operators to AI failure modes including hallucination, sycophancy, and generic responses. Operators who have experienced AI errors are less likely to blindly trust AI output.

## Slop-Induced Disengagement

A distinct pathway related to but different from automation bias: when AI output is consistently generic or unhelpful ("slop"), operators may stop evaluating AI output entirely. This is not over-trust but **disengagement** — the operator ceases to engage with the advisory channel. When the AI subsequently produces a genuinely important alert, the operator may ignore it. This is analogous to the cry-wolf effect in alarm systems. See [[trust-calibration]] for the broader trust relationship.
