---
title: "Common Cause Failure"
type: concept
sources:
  - raw/reports/report2-multi-agent-systems.md
related:
  - "[[defense-in-depth]]"
  - "[[monoculture-collapse]]"
  - "[[epistemic-independence]]"
tags:
  - safety
  - multi-agent
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Common Cause Failure

Common cause failure (CCF) occurs when multiple independent barriers fail simultaneously from a shared cause (IEC 61508). In nuclear safety, CCF is one of the most important concerns because it defeats the redundancy provided by [[defense-in-depth]].

## LLM Common Cause

For LLM-based multi-agent systems, the primary common cause is the **shared base model**. When all agents use the same foundation model, they share correlated errors — the same knowledge gaps, the same reasoning biases, the same calibration failures. This is [[monoculture-collapse]] viewed through the CCF lens.

## Defence Mapping

Traditional CCF defences map imperfectly to LLM systems:

**Equipment diversity → Different models**: Partial defence. Different models provide different architectures and training procedures, but share training data sources (web, Wikipedia, Common Crawl). The degree of actual independence is unknown.

**Physical separation → Context isolation**: Enforceable defence. Separate [[context-windows|context windows]] can be architecturally guaranteed, ensuring agents do not share immediate context.

**Functional independence → Separate prompts**: Needs design. Different system prompts provide different role framing but may not provide genuine functional independence when the underlying model is shared.

**Common-cause analysis → Training data analysis**: No methodology exists. There is currently no established method for analysing the common-cause contribution of shared training data to correlated model failures.

## Quantification Gap

Traditional CCF quantification methods — beta-factor, Multiple Greek Letter, alpha-factor — have **no LLM equivalent**. These methods rely on historical failure data for similar equipment, which does not exist for LLM reasoning errors.

The biggest gap in the safety case for multi-agent nuclear AI is the **inability to quantify error correlation** between agents. Without this, the reliability benefit of multi-agent architectures cannot be credited in [[psa-integration|probabilistic safety assessment]]. We can assert that [[model-heterogeneity]] reduces correlation, but we cannot quantify by how much.

## Implications

For safety-credited multi-agent functions, the inability to quantify CCF means either:

1. Accept the unquantified benefit and use conservative bounding assumptions
2. Require full [[model-heterogeneity]] as a qualitative defence measure
3. Do not credit multi-agent redundancy in the safety case and rely on [[human-authority]] as the independent barrier

Currently, option 3 is the most defensible approach — treat the multi-agent system as a single advisory source and maintain human oversight as the credited independent barrier.
