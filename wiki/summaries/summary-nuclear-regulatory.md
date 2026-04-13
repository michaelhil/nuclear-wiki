---
title: "Report 3: Nuclear Regulatory & Human Factors — Summary"
type: summary
sources:
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[graded-autonomy-tiers]]"
  - "[[defense-in-depth]]"
  - "[[automation-bias]]"
  - "[[hsi-architecture]]"
  - "[[nrc]]"
  - "[[common-cause-failure]]"
tags:
  - nuclear
  - regulation
  - human-factors
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 3: Nuclear Regulatory & Human Factors — Summary

Report 3 applies the architectural analysis from Reports 1-2 to nuclear power plant operations under the NRC regulatory framework. It examines implications for regulation (Section 3), safety analysis (Section 4), and control room design (Section 5).

## Key Findings

**Nuclear Domain Characteristics**: Nuclear operations combine [[defense-in-depth]], procedural formality, shift-based operations, time-critical decision-making, regulatory independence requirements, conservative decision-making culture, and change control (10 CFR 50.59) — each creating specific implications for AI architecture.

**[[graded-autonomy-tiers|Graded Regulatory Tiers]]**: Three tiers matching AI advisory scope to regulatory review depth. Tier 1: passive display (NUREG-0700 + 50.59 screening). Tier 2: active advisory during normal operations (+ NUREG-0711 + model heterogeneity + HRA). Tier 3: active advisory during abnormal/emergency conditions (+ independence analysis + governance gates + skill maintenance).

**Advisory-Only Assumption**: AI systems are treated as advisory throughout. They do not perform protection functions, actuate safety equipment, or provide inputs to protection system logic. The operator retains final decision authority.

**[[common-cause-failure|Common-Cause Failure]] at the Reasoning Layer**: If multiple AI agents share a single base model, they share a common cause for systematic errors. [[defense-in-depth]] at the reasoning layer requires [[model-heterogeneity]] for the same reason physical defense-in-depth requires design diversity.

**[[automation-bias|Automation Bias]]**: Operators tend to over-rely on AI recommendations. Interaction design must ensure the operator forms their own assessment before consulting AI (not after), to avoid [[sycophancy]]-reinforced confirmation bias.

**[[hsi-architecture|HSI Design]]**: AI advisory displays must be visually distinct from qualified safety instrumentation. The distinction between advisory (AI) and authoritative (qualified instruments) must be unambiguous in the display architecture.

**Regulatory Gaps**: Eight gaps identified in the NRC framework, including no LLM-specific V&V methodology, no model heterogeneity assessment process, no AI-specific HRA parameters, and no AI cybersecurity guidance addressing prompt injection.

## Significance

The report establishes the regulatory analysis framework for evaluating AI advisory systems in nuclear operations, identifying specific gaps that must be addressed before any deployment could proceed through NRC review.
