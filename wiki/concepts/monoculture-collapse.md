---
title: "Monoculture Collapse"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[epistemic-independence]]"
  - "[[common-cause-failure]]"
  - "[[model-heterogeneity]]"
tags:
  - multi-agent
  - safety
  - failure-mode
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Monoculture Collapse

Monoculture collapse occurs when all agents in a multi-agent system share the same base model, causing systematic errors to propagate uniformly across the entire team (Reid et al., 2025). The team becomes a **single point of failure at the calibration level** regardless of how many agents it contains.

## Mechanism

When all agents use the same foundation model, they share:

- The same training data biases
- The same knowledge gaps
- The same reasoning patterns
- The same calibration failures

If the base model systematically underweights a particular failure mode (because it was underrepresented in training data), **every agent** in the system underweights it. Adding more same-model agents provides no protection because they all share the same blind spots.

## Nuclear Analogy

This maps directly to a well-understood nuclear safety concept: using identical equipment from a single manufacturer for all redundant safety trains. If a common design defect exists, all trains fail simultaneously. Physical [[defense-in-depth]] requires design diversity for exactly this reason. The same logic applies to AI reasoning layers.

## Four Non-Resolutions

Several approaches appear to address monoculture but do not:

**Stochastic variation**: Different random seeds produce different outputs, but [[non-determinism]] is not independence. Varying outputs from the same probability distribution do not decorrelate systematic biases.

**Chain-of-thought prompting**: Requiring explicit reasoning does not change the underlying model weights. Different reasoning paths through the same biased model arrive at the same biased conclusions.

**RAG with different sources**: Providing different retrieved documents gives agents different knowledge but not different **reasoning**. The same model reasons about different facts with the same biases.

**Fine-tuned variants**: Models fine-tuned from the same base retain shared pre-training biases. Fine-tuning adjusts the surface but the deep structure remains correlated.

## Implications

For systems where AI assessments are safety-credited, monoculture collapse means that multi-agent architectures using a single model family provide **no additional reliability** over a single agent. The apparent redundancy is illusory. True redundancy requires [[model-heterogeneity]] — different foundation models with genuinely different training and architectures, accepting the additional complexity this entails (see [[common-cause-failure]]).
