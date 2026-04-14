---
title: "Human Reliability Analysis"
type: concept
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[spar-h]]"
  - "[[idheas-eca]]"
  - "[[atheana]]"
  - "[[performance-shaping-factors]]"
  - "[[psa-integration]]"
tags:
  - hra
  - safety-analysis
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Human Reliability Analysis

Human Reliability Analysis (HRA) encompasses the methods used to quantify human error probability (HEP) in nuclear safety analysis. HRA feeds into [[psa-integration|Probabilistic Safety Assessment]] by providing estimates of how likely operators are to make errors during accident scenarios.

## Methods Examined

Three established HRA methods require extension for AI-assisted operations:

**[[spar-h]]** (NUREG/CR-6883): Multiplicative PSF-based method. Straightforward extension to add AI-related PSFs but limited by its dependency model.

**[[idheas-eca]]** (NUREG-2199): Macrocognitive function-based method. Its teamwork function provides the most natural framework for modelling human-AI interaction.

**[[atheana]]** (NUREG-1624): Error-forcing context method. Best at identifying which specific scenarios are dangerous, particularly commission errors where AI recommendations make wrong actions appear correct.

All three need structural extension — none currently accounts for AI advisory systems in their standard formulations.

## New Human Failure Events

AI-assisted operations introduce new categories of human failure events (HFEs) not present in traditional HRA:

- **Follow incorrect AI**: Operator acts on wrong AI recommendation ([[automation-bias]])
- **Override correct AI**: Operator rejects correct AI advice (under-trust or misunderstanding)
- **Fail to detect hallucination**: Operator accepts AI output containing [[hallucination|hallucinated]] information as factual

Each requires distinct quantification approaches and is influenced by different [[performance-shaping-factors]].

## Illustrative Nature

A critical caveat: all quantitative HRA values for AI-assisted operations are currently **illustrative**. No empirical data exists for human error rates when working with LLM advisory systems in nuclear contexts. The values serve to demonstrate methodological approaches and relative sensitivities, not to provide validated probabilities for safety case use.

Building an empirical basis through simulator studies with AI advisory systems is a prerequisite for credible HRA quantification. The [[capability-gradient]] framework addresses this by producing evidence at each prototyping level.
