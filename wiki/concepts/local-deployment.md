---
title: "Local Deployment"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[quantization]]"
  - "[[fine-tuning]]"
  - "[[frontier-vs-local-models]]"
  - "[[ollama]]"
tags:
  - deployment
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Local Deployment

Local deployment means running LLMs on-premises behind an air-gap, rather than sending queries to cloud-hosted frontier models. This is Level 1 of the [[capability-gradient]] and addresses several nuclear-specific requirements.

## Benefits

**Data sovereignty**: All queries and responses remain on-site. No plant data, procedure content, or operational details are transmitted to third-party cloud providers. This addresses both security requirements and proprietary information concerns.

**No provider content filters**: Cloud-hosted models apply content moderation filters that may suppress nuclear-relevant content. Discussions of radiation, criticality, or accident scenarios can trigger safety filters designed for general public use but inappropriate for professional nuclear engineering discourse. Local deployment eliminates this interference.

**Prompt transparency**: Full visibility into system prompts, model configuration, and inference parameters. No hidden instructions from the model provider that might affect behaviour in nuclear-relevant ways.

**Auditability**: Complete logging of all inputs, outputs, and model states. Essential for regulatory compliance and post-event analysis.

## Trade-offs

**Reduced capability**: Local models are smaller than frontier cloud models. A 70B parameter model running locally will be less capable than a 1T+ parameter frontier model. The capability gap is real and must be empirically characterised through the [[evaluation-harness]].

**Hardware requirements**: A 70B model requires a single server with 1-2 GPUs. [[quantization]] techniques (GPTQ, AWQ, GGUF) reduce memory requirements, enabling 4-bit quantised 70B models to run on a single GPU.

**Maintenance burden**: Local deployment requires on-site expertise for model management, updates, and troubleshooting. Cloud providers handle this for hosted models.

## Infrastructure

[[ollama]] provides a practical serving layer for local model deployment, handling model management, API serving, and basic configuration. Combined with [[quantization]] for model compression, it enables production-quality local inference on commodity server hardware.

## Decision Framework

Local deployment is appropriate when: data sovereignty is required, provider content filters are problematic, full auditability is needed, or the [[capability-gradient]] experimental design requires controlled model access. Cloud deployment may be appropriate for early prototyping (L0) where the reduced friction of API access accelerates experimentation.
