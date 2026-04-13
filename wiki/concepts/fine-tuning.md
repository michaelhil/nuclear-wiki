---
title: "Fine-Tuning"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[retrieval-augmented-generation]]"
  - "[[rag-vs-fine-tuning]]"
  - "[[local-deployment]]"
  - "[[quantization]]"
tags:
  - knowledge-grounding
  - deployment
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Fine-Tuning

Fine-tuning adapts a pre-trained LLM to a specific domain or task by continuing training on domain-specific data. Several methods exist with different resource requirements and capabilities.

## Methods

**Full fine-tuning**: Updating all model parameters. Most expensive computationally and requires the most data, but produces the deepest adaptation. Rarely practical for organisations without substantial GPU infrastructure.

**LoRA (Low-Rank Adaptation)**: Freezes the original model weights and trains small low-rank adapter matrices that modify the model's behaviour. Dramatically reduces computational requirements while retaining most of the benefit. Adapters can be swapped, enabling multiple domain specialisations from a single base model.

**QLoRA** (Dettmers et al., 2024): Combines LoRA with [[quantization]] — the base model is quantised to 4-bit precision while LoRA adapters train in higher precision. Further reduces hardware requirements, enabling fine-tuning of 70B models on consumer GPUs.

## When to Fine-Tune vs. RAG

Fine-tuning and [[retrieval-augmented-generation]] serve different purposes:

**Fine-tune for style and format**: When the model needs to adopt a specific communication style, output format, or reasoning pattern. Fine-tuning changes how the model processes and presents information.

**RAG for updatable facts**: When the model needs access to current, changeable information. RAG retrieves from external stores that can be updated without retraining.

In nuclear applications, fine-tuning might teach the model to communicate in the structured format expected in control room advisories, while RAG would provide current plant-specific procedures and parameters.

## Independence Limitation

Fine-tuned variants of the same base model **retain shared pre-training biases**. Fine-tuning adjusts the model's behaviour on the surface but does not eliminate the deep biases learned during pre-training on billions of tokens of internet text. This means fine-tuned variants provide only **partial decorrelation, not full independence**.

For [[epistemic-independence]] in safety-credited multi-agent systems, fine-tuned variants of the same base model do not satisfy the requirement for genuine [[model-heterogeneity]]. They share the same foundational biases and knowledge gaps, reducing the value of apparent redundancy. See [[monoculture-collapse]] for why this matters.
