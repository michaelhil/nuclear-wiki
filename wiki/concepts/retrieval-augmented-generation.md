---
title: "Retrieval-Augmented Generation"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[knowledge-graphs]]"
  - "[[hallucination]]"
  - "[[context-windows]]"
  - "[[context-management]]"
tags:
  - knowledge-grounding
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Retrieval-Augmented Generation

Retrieval-Augmented Generation (RAG) is an architecture that grounds LLM output in external documents by retrieving relevant content and inserting it into the [[context-windows|context window]] before generation (Lewis et al., 2020). Rather than relying solely on the model's parametric knowledge (which may be outdated or incomplete), RAG queries an external document store and provides retrieved passages as context for the model to reference.

## Architecture

The RAG pipeline has three stages:

1. **Query formulation**: The user's question is converted into a retrieval query (often via embedding similarity)
2. **Document retrieval**: Relevant passages are retrieved from a vector store or search index
3. **Grounded generation**: Retrieved passages are inserted into the context, and the model generates output referencing them

## Seven Failure Points

Barnett et al. (2024) identified seven distinct failure modes in RAG systems:

1. Wrong documents retrieved (semantic similarity does not equal relevance)
2. Relevant documents missed (recall failure)
3. Retrieved documents misinterpreted by the model
4. Model ignores retrieved documents in favour of parametric knowledge
5. Retrieval latency impacts usability
6. Retrieved content contradicts other retrieved content
7. Chunking artifacts split critical information across fragments

Each failure point requires different mitigation, and multiple can occur simultaneously.

## Over-Retrieval Problem

A counterintuitive finding: retrieving more documents often **degrades** output quality. Additional marginally relevant content consumes [[context-windows|context space]], introduces noise, and triggers context rot. Retrieval **precision** matters more than recall for safety-critical applications. Three highly relevant paragraphs outperform thirty somewhat relevant pages.

## Graph RAG

Edge et al. (2024) introduced Graph RAG, which uses [[knowledge-graphs|knowledge graph]] structure to improve retrieval. Instead of flat document similarity, Graph RAG traverses entity relationships to find contextually appropriate information. This is particularly suited to nuclear domains where systems, procedures, and parameters have structured relationships.

## Nuclear Applications

RAG enables grounding AI outputs in authoritative sources:

- Plant procedures and Emergency Operating Procedures
- Final Safety Analysis Reports (FSARs)
- Technical Specifications and Limiting Conditions for Operation
- Operating experience databases and event reports

The key design consideration is that retrieval quality directly bounds generation quality. No amount of model capability compensates for poor retrieval. For nuclear applications, purpose-built retrieval indices with domain-specific chunking and metadata are essential.
