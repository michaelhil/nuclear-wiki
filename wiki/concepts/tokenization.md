---
title: "Tokenization"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[transformer-architecture]]"
  - "[[hallucination]]"
tags:
  - llm
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Tokenization

Tokenization is the process of converting text into sub-word units (tokens) from a fixed vocabulary before processing by the [[transformer-architecture]]. Tokens are typically 3-5 characters long and do not correspond to intuitive word or number boundaries.

## How Tokenization Works

A tokenizer splits input text into tokens drawn from a predetermined vocabulary of typically 32,000 to 100,000 entries. Common words may be single tokens, while less common words are split into sub-word pieces. For example:

- "temperature" is approximately 2 tokens
- "1247.3" is approximately 3-4 tokens
- "psig" may be 1-2 tokens depending on the model's vocabulary

The critical implication is that **LLMs do not process numbers as numerical values**. When an LLM encounters "1247.3 psig," it processes a sequence of token fragments — not a numerical value with associated units. The model has no internal representation of 1247.3 as a quantity that can be mathematically manipulated.

## Implications for Technical Domains

This architectural property has profound consequences for nuclear applications:

**Arithmetic is prediction, not computation.** When an LLM appears to perform arithmetic, it is predicting what the next tokens should look like based on patterns in training data. Simple operations (2 + 2) succeed because they appear frequently in training. Complex calculations fail because the model is pattern-matching, not computing. A calculator computes; an LLM guesses what a computation result looks like.

**Unit handling is superficial.** The model may associate "psig" with pressure contexts, but it does not have a type system that enforces dimensional consistency. It can produce unit conversion errors that look perfectly fluent — a form of [[hallucination]] specific to technical content.

**Numerical precision is unreliable.** Since numbers are token fragments, the model may generate plausible-looking but incorrect numerical values. "1247.3" and "1274.3" are very similar in token space even though they represent significantly different pressures.

## Cross-Model Inconsistency

Different models use different tokenizers, meaning the same input text produces different token sequences across models. This affects reproducibility and means that prompt engineering optimised for one model's tokenizer may not transfer to another. This is relevant when considering [[model-heterogeneity]] in multi-agent systems — different tokenizations of identical input text contribute to response divergence.

## Mitigation

For safety-critical numerical work, external computation tools should handle all arithmetic and unit conversions, with the LLM restricted to interpreting results and providing natural language explanation. This is a core argument for [[tool-calling]] architectures.
