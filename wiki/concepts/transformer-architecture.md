---
title: "Transformer Architecture"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[context-windows]]"
  - "[[tokenization]]"
  - "[[statelessness]]"
  - "[[non-determinism]]"
tags:
  - llm
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Transformer Architecture

The transformer architecture, introduced by Vaswani et al. (2017), is the foundational structure underlying all modern large language models. Its core mechanism is **self-attention**, where every token in the input sequence computes query, key, and value relationships with every other token. This process repeats across 32 to 128 layers depending on model scale, building increasingly abstract representations of the input.

## Unified Processing

A critical property for nuclear applications is that the transformer makes **no internal partition** between different types of input. System prompts, user messages, tool results, and retrieved documents are all concatenated into a single token sequence and processed as one integrated object. The model has no architectural mechanism to distinguish "trusted instructions" from "untrusted data" — everything is context, processed through the same attention computation.

This means the model cannot selectively ignore or quarantine information. Once something enters the [[context-windows|context window]], it influences all subsequent token generation. The model literally **cannot "unsee" information** in its context. This is a mathematical property of the attention mechanism, not a design choice that could be changed through configuration.

## Lost in the Middle

Liu et al. (2024) documented the "lost in the middle" effect: transformer models systematically underuse information positioned in the middle of long contexts, showing strong preference for information near the beginning and end. This has direct implications for how technical documents and procedures should be structured when fed to LLMs. Critical safety information buried in the middle of a long context may receive less attention weight than less important information at the boundaries.

## Implications for Nuclear AI

The transformer's properties create several challenges for nuclear applications:

- **No privilege separation**: Safety-critical instructions receive no special processing priority over other context
- **Position sensitivity**: The ordering of information in the context affects how the model weights it, meaning identical technical content may produce different outputs depending on where it appears
- **Holistic processing**: Every piece of context influences every output token, making it impossible to guarantee that irrelevant information won't affect safety-relevant outputs

These are not limitations to be "fixed" — they are fundamental to how [[tokenization]] and attention work. Any system deploying transformers in nuclear contexts must design around these mathematical realities rather than assuming they can be engineered away.

The architecture's strengths — flexible reasoning, natural language understanding, and pattern recognition across diverse inputs — must be balanced against these structural properties through external safeguards like [[knowledge-graphs]] and human oversight.
