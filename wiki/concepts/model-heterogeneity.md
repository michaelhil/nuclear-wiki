---
title: "Model Heterogeneity"
type: concept
sources:
  - raw/reports/report2-multi-agent-systems.md
related:
  - "[[epistemic-independence]]"
  - "[[monoculture-collapse]]"
  - "[[mcp]]"
  - "[[defense-in-depth]]"
tags:
  - multi-agent
  - safety
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Model Heterogeneity

Model heterogeneity means using different foundation models for different agents in a multi-agent system. This provides two distinct benefits: [[epistemic-independence]] through decorrelated reasoning errors, and capability matching by assigning the best model for each agent's role.

## Benefits

**Epistemic independence**: Different models have different training data, architectures, and learned biases. Their errors are less correlated than errors from multiple instances of the same model. This is the AI equivalent of design diversity in nuclear [[defense-in-depth]].

**Capability matching**: Different models excel at different tasks. One model may be superior for code interpretation, another for natural language reasoning, another for structured output generation. Heterogeneity allows each agent role to use the most capable model for its function.

## Costs

Model heterogeneity introduces significant practical complexity:

- Multiple provider relationships and API integrations
- Different infrastructure requirements per model
- Approximately 2x system complexity compared to single-model deployment
- Different prompt engineering requirements per model
- Different failure modes to monitor and mitigate

The Model Context Protocol ([[mcp]]) mitigates the API normalisation burden by providing a model-agnostic interface for tool connectivity, but does not eliminate model-specific prompt and behaviour differences.

## The Shared Training Data Complication

A fundamental limitation: different models are not as independent as different physical equipment. Models share training data sources — the web, Wikipedia, Common Crawl, and other large-scale datasets. This shared training data means models may share biases even when their architectures differ.

Quantifying the actual overlap in learned representations between models is an **open research problem** with no established methodology. This means the degree of epistemic independence achieved through model heterogeneity cannot currently be rigorously quantified.

## Decision Framework

The level of model heterogeneity should be proportional to consequences:

- **Safety-credited functions** (where AI assessment directly informs safety decisions): Full model diversity is a hard requirement. The [[common-cause-failure]] risk of shared models is unacceptable.
- **Advisory functions** (where human operator makes final decision): Heterogeneity proportional to consequence. Higher-consequence advisory roles warrant more diversity.
- **Utility functions** (formatting, summarisation, non-safety tasks): Single model acceptable. Efficiency outweighs diversity benefit.

This maps to the [[graded-autonomy-tiers]] framework: higher tiers demand more heterogeneity.
