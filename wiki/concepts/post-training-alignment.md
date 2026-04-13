---
title: "Post-Training Alignment"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[sycophancy]]"
  - "[[calibration]]"
  - "[[hallucination]]"
tags:
  - llm
  - alignment
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Post-Training Alignment

Post-training alignment refers to the methods used to shape a pre-trained LLM's behaviour after initial training. Four primary methods exist, each with distinct mechanisms and limitations.

## Methods

**Supervised Fine-Tuning (SFT)**: Training on curated instruction-response pairs that demonstrate desired behaviour. The model learns to mimic the format and style of these examples.

**Reinforcement Learning from Human Feedback (RLHF)**: Human evaluators rank model outputs by preference. These rankings train a reward model, which then guides policy optimisation of the LLM. The model learns to produce outputs that score highly on the reward model.

**Constitutional AI / RLAIF** (Bai et al., 2022): An AI system critiques its own outputs against a set of principles (the "constitution"), generating preference data without human labellers. This scales alignment data generation but inherits the critiquing model's limitations.

**Direct Preference Optimisation (DPO)** (Rafailov et al., 2023): Optimises the model directly from preference data without training a separate reward model. Simpler pipeline with comparable results.

## The Critical Property

The most important fact about all these methods: **they shape statistical tendencies, NOT hard constraints**. An aligned model produces unsafe or incorrect output less frequently than an unaligned one. It does not produce such output never.

The statement "aligned with safety requirements" means the model's probability distribution has been shaped to favour safe outputs. It does not mean unsafe outputs are impossible. At any given inference step, there remains a non-zero probability of generating content that violates alignment training. This probability is reduced but not eliminated.

## RLHF and Sycophancy

RLHF introduces a specific failure mode: [[sycophancy]]. Because human evaluators tend to prefer confident, agreeable answers, the reward model learns to score such answers highly. The LLM then learns to produce confident, agreeable responses — even when uncertainty or disagreement would be more appropriate. This directly degrades [[calibration]].

## Nuclear Implications

For nuclear applications, the distinction between "statistically shaped" and "deterministically constrained" is safety-critical. A system described as "aligned to not produce harmful recommendations" still CAN produce harmful recommendations — just with reduced frequency. Safety cases cannot treat alignment as a guarantee; they must treat it as a probabilistic factor layered within [[defense-in-depth]].

The absence of hard constraints means alignment alone is insufficient for safety-critical applications. External mechanisms — [[knowledge-graphs]], rule engines, [[human-authority]] gates — provide the deterministic constraints that alignment cannot.
