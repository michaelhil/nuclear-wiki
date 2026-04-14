---
title: "Epistemic Independence"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[monoculture-collapse]]"
  - "[[model-heterogeneity]]"
  - "[[common-cause-failure]]"
  - "[[defense-in-depth]]"
tags:
  - multi-agent
  - safety
  - independence
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Epistemic Independence

Epistemic independence is the property of having decorrelated reasoning errors across multiple agents. When agents are epistemically independent, one agent's error does not predict another's — their mistakes arise from different causes and affect different situations.

## Requirements

Achieving epistemic independence requires multiple conditions:

- **Different base models**: Agents must run on different foundation models with different training data, architectures, and learned biases
- **Context isolation**: Each agent must maintain its own context, not share a unified attention space
- **Information asymmetry**: Agents should receive different subsets of available information, forcing genuinely different perspectives

## Why Single-Model Systems Fail

A single model in a unified attention mechanism **cannot provide epistemic independence** regardless of how many "roles" it plays. All perspectives within a single forward pass share the same weights, the same training biases, and the same attention patterns. The apparent diversity is surface-level — different text outputs generated from the same underlying probability distribution.

## Empirical Evidence

Controlled experiments demonstrate the difference. Sreedhar and Chilton (2024) showed that separate model instances achieved 88% accuracy on tasks where single-model role-playing achieved only 50%. Wu et al. (2025) found that same-model debate actively suppresses independence — agents converge on shared biases rather than challenging them.

## Five Dimensions

Independence can be characterised across five dimensions:

1. **Context isolation**: Whether agents share or separate context windows
2. **Model diversity**: Whether different foundation models are used
3. **History divergence**: Whether agents have different conversation histories
4. **Temporal independence**: Whether agents reason at different times or simultaneously
5. **Information asymmetry**: Whether agents receive different information subsets

## Application to Nuclear AI

For **safety verification** functions (checking whether an action is safe), full [[model-heterogeneity]] is a hard requirement. The verification agent must be epistemically independent from the agent that produced the recommendation being verified. Same-model "checking" provides no additional safety margin — see [[monoculture-collapse]].

For **advisory** functions (suggesting actions for human evaluation), partial decorrelation is acceptable. Different prompts, different retrieved context, and different conversation histories provide some independence even with shared models. The human operator provides the true independent check.

This distinction — full independence for safety-credited functions, proportional independence for advisory functions — maps to the [[graded-autonomy-tiers]] framework.
