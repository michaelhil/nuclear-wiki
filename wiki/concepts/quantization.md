---
title: "Quantization"
type: concept
sources:
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[local-deployment]]"
  - "[[fine-tuning]]"
  - "[[frontier-vs-local-models]]"
tags:
  - deployment
  - optimization
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Quantization

Quantization is a model compression technique that reduces the precision of model weights from their original floating-point representation (typically 16-bit or 32-bit) to lower bit widths (8-bit, 4-bit, or even lower). This dramatically reduces memory requirements and inference cost, enabling [[local-deployment]] of large models on accessible hardware.

## Methods

**GPTQ** (Frantar et al., 2023): Post-training quantization method that reduces weights to 4-bit precision with minimal accuracy loss. Uses calibration data to optimise quantization decisions, preserving the most important weight precision. The standard choice for GPU-based deployment.

**AWQ (Activation-Aware Weight Quantization)**: Considers activation patterns during quantization, preserving precision for weights that have the largest impact on model outputs. Can achieve better accuracy than naive quantization at the same bit width.

**GGUF**: A file format optimised for CPU and mixed CPU/GPU inference. Enables model execution on systems without dedicated GPU hardware, though at slower speeds. Particularly relevant for deployment scenarios where GPU availability is limited.

## Practical Impact

The practical impact of quantization is substantial. A 70B parameter model at full 16-bit precision requires approximately 140 GB of GPU memory — multiple high-end GPUs. At 4-bit quantization, the same model requires approximately 35 GB — **a single GPU**. This transforms the hardware requirements from specialised multi-GPU servers to commodity hardware.

## Trade-offs

Quantization involves a fundamental trade-off: **model size and inference speed versus accuracy**. The relationship is not linear — the first reduction from 16-bit to 8-bit typically causes minimal accuracy loss, while further reduction to 4-bit shows measurable but often acceptable degradation. Below 4-bit, accuracy degradation becomes significant.

## Nuclear Safety Considerations

For safety-critical nuclear applications, the accuracy impact of quantization must be **empirically evaluated at the target precision** using domain-specific benchmarks (see [[evaluation-harness]]). Generic quantization benchmarks on standard NLP tasks may not reflect performance on nuclear engineering questions, where precise technical knowledge matters.

The [[build-vs-assess-gap]] applies here: it is straightforward to quantize a model and deploy it locally, but assessing whether the quantization-induced accuracy loss is acceptable for nuclear advisory requires nuclear-specific evaluation data that does not yet exist.

A quantized model may handle routine queries well while degrading disproportionately on the complex, unusual situations where AI assistance is most valuable and where errors are most consequential.
