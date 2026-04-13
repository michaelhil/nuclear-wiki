---
title: "Knowledge Graphs"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[retrieval-augmented-generation]]"
  - "[[procedure-ai-interaction]]"
  - "[[defense-in-depth]]"
tags:
  - knowledge-grounding
  - safety
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Knowledge Graphs

A knowledge graph (KG) is a structured database of entities and relationships that can enforce hard constraints on information. Unlike the probabilistic outputs of LLMs, knowledge graphs provide **deterministic** query results and constraint checking.

## Structure

Knowledge graphs consist of typed nodes (entities) and typed edges (relationships). For nuclear applications, this maps naturally onto operational knowledge:

- **Nodes**: Systems, components, procedures, LCO limits, action times, parameters, setpoints
- **Edges**: Contains, requires, triggers, limits, connects-to, precedes

Nuclear procedures can be represented as graph structures where steps are nodes with formal relationships to conditions, limits, and other procedures. This enables machine-traversable procedure logic without the ambiguity inherent in natural language processing.

## Three Functions for Nuclear AI

Knowledge graphs serve three distinct functions in AI-assisted nuclear operations:

**Retrieval**: Structured queries retrieve precisely targeted information. Rather than semantic similarity search (which may return plausibly related but wrong content), KG queries traverse defined relationships to find exactly what is needed. "What are the LCO action times when RCS temperature exceeds X?" returns a deterministic answer from the graph.

**Guardrails**: The KG can block LLM outputs that contradict known facts. If the LLM generates a recommendation that violates a Technical Specification limit encoded in the graph, the KG layer catches and flags this before the output reaches the operator.

**Validation**: After the LLM generates output, the KG can check consistency. Does the recommended action align with the procedure graph? Are all referenced parameters within their valid ranges? This is deterministic checking of probabilistic output.

## Key Advantage Over RAG

The critical advantage of knowledge graphs over pure [[retrieval-augmented-generation]] is **deterministic constraint checking versus probabilistic retrieval**. RAG retrieves documents and hopes the LLM interprets them correctly. A KG encodes constraints as formal relationships and checks them computationally.

## Hybrid Architecture

The optimal architecture combines KG and LLM strengths: the KG and a rule engine handle structured logic (procedure traversal, limit checking, system relationships), while the LLM handles the interpretive boundary — situations that do not map cleanly to graph structure, multiple interacting LCOs, and natural language explanation of results to operators.

This division of labour is a form of [[defense-in-depth]]: the deterministic layer catches what the probabilistic layer gets wrong, and the probabilistic layer handles what the deterministic layer cannot represent.
