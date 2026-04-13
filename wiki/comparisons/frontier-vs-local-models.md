---
title: "Frontier vs Local Models"
type: comparison
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[local-deployment]]"
  - "[[quantization]]"
  - "[[capability-gradient]]"
tags:
  - deployment
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Frontier vs Local Models

Cloud API access to frontier models vs local deployment of open-weight models.

## Dimensions of Comparison

| Dimension | Frontier (Cloud API) | Local Deployment |
|-----------|---------------------|------------------|
| Capability | Highest (hundreds of billions of parameters) | Reduced (typically 7B-70B) |
| Data sovereignty | Data leaves site | Data stays on-site |
| Safety filters | Provider-controlled, may suppress nuclear content | Deployer-controlled |
| Latency | Network + inference | Inference only |
| Cost | Per-token pricing | Hardware investment |
| Auditability | Limited (provider-side processing) | Full (prompts, outputs visible) |
| Air-gap compatible | No | Yes |
| Availability | Depends on provider uptime | Local control |

## Nuclear Considerations

**Data sovereignty** is critical: plant operational data (parameters, procedures, maintenance records) must not leave the site boundary in most regulatory frameworks.

**Safety filter suppression**: Provider-side filters trained for consumer use may block discussion of radiological hazards, criticality accidents, or radiation exposure calculations. No indication is given that content was removed — the operator receives an apparently complete but silently edited response (Report 1 §7.2).

**Auditability**: For incident investigation, understanding why an AI system produced a specific recommendation requires access to the full prompt and reasoning chain. Cloud API providers may not expose this.

## Recommendation

[[local-deployment|Local deployment]] is preferable for nuclear applications due to data sovereignty, auditability, and filter control. [[quantization|Quantisation]] (4-bit) enables 70B models on single-GPU servers with acceptable accuracy for many tasks. Frontier models remain useful for initial evaluation (Level 0 of [[capability-gradient]]) and for tasks where maximum capability is needed and data sensitivity permits.
