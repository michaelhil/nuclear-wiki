---
title: "Tool Calling"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[agent-architecture]]"
  - "[[mcp]]"
  - "[[hallucination]]"
tags:
  - agent
  - infrastructure
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Tool Calling

Tool calling enables an LLM agent to invoke external functions — calculators, databases, simulation codes, APIs — extending its capabilities beyond text generation. The model generates a structured request (function name and parameters), the system executes the call, and the result is returned to the model for interpretation.

## Probabilistic Prediction

The critical fact: the model **predicts** tool calls. It does not deterministically select the correct function and parameters. Tool selection and parameter generation are next-token predictions, subject to the same [[hallucination]] and error modes as any other LLM output.

## Failure Modes

Tool calling can fail in multiple ways:

- **Wrong tool selected**: Model calls an irrelevant function
- **Wrong parameters**: Correct function, incorrect arguments (wrong units, wrong parameter names, transposed values)
- **Result misinterpretation**: Correct call returns correct result, model misreads it
- **Unnecessary call**: Model invokes a tool when it already has the answer
- **Missing call**: Model should invoke a tool but generates an answer from parametric knowledge instead
- **Cascading failure**: One bad call produces bad data, which triggers more bad calls

## Empirical Performance

Historical benchmarks show significant error rates:

- Approximately 30% hallucinated tool calls (Patil et al., 2023)
- 40-50% failure on hard multi-step tasks (Zhuang et al., 2023)
- BFCL V4: approximately 70% holistic accuracy, with 30-40% failure on multi-turn scenarios

The **compounding problem** is particularly dangerous: in multi-step workflows, each tool call's result becomes input for subsequent reasoning. One incorrect call early in a chain corrupts all downstream reasoning and tool selections.

## MCP Standard

The Model Context Protocol ([[mcp]]) provides model-agnostic connectivity between LLMs and tools. This standardisation enables [[model-heterogeneity]] — different models can use the same tool infrastructure — and simplifies the integration layer.

## Nuclear Implications

For nuclear applications, tool calls to plant historians, simulation codes like [[relap5]], regulatory databases, and procedure systems are **safety-relevant**. An incorrect query to the historian (wrong tag, wrong time range) produces incorrect data that the model then reasons from confidently. An incorrectly parameterised simulation call produces physically meaningless results presented as engineering analysis.

Mitigations include: parameter validation layers before execution, result sanity checking after execution, logging all calls and results for audit, and [[human-authority]] gates before acting on tool-derived conclusions.
