---
title: "Reasoning Models and Extended Thinking"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[hallucination]]"
  - "[[calibration]]"
  - "[[automation-bias]]"
  - "[[context-windows]]"
tags:
  - llm
  - architecture
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Reasoning Models and Extended Thinking

A class of models introduced from late 2024 onwards (OpenAI's o1/o3 series, Anthropic's Claude with extended thinking) that produce explicit chains of reasoning before generating a final answer. Rather than going directly from input to output, these models work through the problem step by step in a "thinking" phase, then produce a response grounded in that reasoning.

## Changed Reliability Picture

**Improvements**: Reasoning models are measurably more accurate on complex analytical tasks — multi-step diagnosis, mathematical reasoning, procedural compliance checking. They show their work, supporting **auditability**: an operator or reviewer can inspect the reasoning chain and identify where analysis went wrong.

For nuclear applications where the **basis for a recommendation matters as much as the recommendation itself**, visible reasoning is a meaningful improvement over standard autoregressive models that produce conclusions without showing derivation.

**Shifted failure modes**: A standard LLM produces a confident wrong answer with no visible reasoning. A reasoning model can produce a confident wrong answer with a **plausible-looking derivation** where the reasoning steps appear rigorous but contain a subtle error. These failures are **harder to detect** precisely because the surrounding analysis looks competent. The chain can also be long (thousands of tokens), consuming [[context-windows|context budget]] and adding latency.

## Human Factors Tension

Reasoning models introduce a tension for [[automation-bias]]:

- **Positive**: The visible reasoning chain supports operator verification — the operator can check the steps
- **Negative**: The apparent rigour of the chain may **increase** automation bias — the operator sees detailed analysis and assumes it must be correct

Whether the net effect on operator performance is positive or negative is an empirical question that current data does not answer. This is a key investigation target for Level 7 of the [[capability-gradient]].

## Practical Considerations

- **Latency**: Reasoning models are slower and more expensive per query than standard models. During time-critical nuclear transients, the additional latency may matter
- **Context consumption**: Extended thinking chains consume context budget that could be used for plant data, retrieved documents, or conversation history
- **Transparency**: The thinking phase may not be fully visible through all API providers — some expose only the final answer, not the reasoning chain
