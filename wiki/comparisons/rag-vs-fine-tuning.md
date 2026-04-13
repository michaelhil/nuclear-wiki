---
title: "RAG vs Fine-Tuning"
type: comparison
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[retrieval-augmented-generation]]"
  - "[[fine-tuning]]"
  - "[[knowledge-graphs]]"
tags:
  - architecture
  - knowledge-grounding
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# RAG vs Fine-Tuning

When to retrieve external knowledge vs when to adapt the model itself.

## Dimensions of Comparison

| Dimension | RAG | Fine-Tuning |
|-----------|-----|-------------|
| Knowledge updates | Immediate (update document store) | Requires retraining |
| Traceability | High (can cite source documents) | Low (knowledge in weights) |
| Cost | Per-query retrieval cost | Upfront training cost |
| Domain vocabulary | Via retrieved docs | Learned into weights |
| Hallucination | Reduced when grounded | May reduce or shift |
| Independence | Same reasoning, different knowledge | Partial decorrelation |
| Air-gap compatibility | Both work locally | Both work locally |

## When to Use RAG

- Factual knowledge that changes (procedures, Tech Specs, operating experience)
- Need to cite specific source documents
- Knowledge must be auditable and updatable
- Primary approach for nuclear document grounding (Report 1 §8.1)

## When to Fine-Tune

- Consistent domain vocabulary and response style
- Task-specific format adaptation (structured output formats)
- Performance on specific task types (Report 6 §2)
- Combined with RAG: fine-tune for style, RAG for facts

## Nuclear Recommendation

RAG is the primary knowledge grounding mechanism for nuclear applications. Fine-tuning is supplementary — useful for adapting response format and domain vocabulary but insufficient alone for factual grounding. [[knowledge-graphs|Knowledge graph]] constraints provide an additional verification layer that neither RAG nor fine-tuning supplies.

Fine-tuned variants of the same base model retain shared pre-training biases — they provide partial decorrelation, not full [[epistemic-independence]].
