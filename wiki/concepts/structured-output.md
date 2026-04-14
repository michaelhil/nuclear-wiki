---
title: "Structured Output and Constrained Generation"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[tool-calling]]"
  - "[[hallucination]]"
  - "[[knowledge-graphs]]"
  - "[[agent-architecture]]"
tags:
  - llm
  - architecture
  - engineering
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Structured Output and Constrained Generation

LLMs can be constrained to produce output in specific formats through several mechanisms, reducing certain hallucination modes by restricting the space of possible outputs.

## Mechanisms

- **JSON mode**: Restricts output to valid JSON. Prevents free-text narrative where structured data is expected
- **Function calling schemas**: Define expected structure of [[tool-calling|tool invocations]] including parameter names, types, and allowed values
- **Grammar-constrained decoding**: Enforces a formal grammar at the token-sampling level, rejecting tokens that would produce syntactically invalid output **before they are selected**

## What It Solves

Schema enforcement addresses the **syntactic dimension** of errors: malformed tool calls, invalid JSON, wrong field types. A model constrained to produce valid JSON with a defined schema cannot hallucinate free-text where structured data is expected. It must place values in correct fields with correct types.

For [[tool-calling]], schema enforcement ensures well-formed invocations rather than unparseable strings. This eliminates one class of tool-calling failure.

## What It Does Not Solve

Constrained generation addresses syntax, **not semantics**. The model can produce a perfectly valid JSON object containing **entirely fabricated values**. A schema expecting a numerical field for reactor coolant temperature will receive a number — but that number may be hallucinated rather than derived from actual data.

The structure is correct; the content may not be.

## Nuclear Application

For nuclear advisory, structured output provides a useful engineering layer that eliminates formatting errors. But validation of content accuracy requires the knowledge grounding mechanisms described in [[retrieval-augmented-generation]] and [[knowledge-graphs]]. Typed artefacts in the [[hsi-architecture]] use structured output to ensure agent responses follow consistent formats that operators can quickly parse.
