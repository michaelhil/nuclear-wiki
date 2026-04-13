---
title: "Capability Gradient"
type: concept
sources:
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[build-vs-assess-gap]]"
  - "[[evaluation-harness]]"
  - "[[local-deployment]]"
  - "[[simulator-coupling]]"
tags:
  - prototyping
  - methodology
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Capability Gradient

The capability gradient is an 8-level prototyping path for developing and evaluating nuclear AI advisory systems. Each level adds capability incrementally, and critically, **nothing is discarded** — capabilities accumulate. Levels are experiments that produce evidence, not technologies to be deployed.

## The Eight Levels

**L0 — Frontier Evaluation**: Evaluate frontier models on nuclear-domain questions using the [[evaluation-harness]]. No deployment, no infrastructure. Produces baseline capability data. Achievable in a day.

**L1 — Local Deployment**: Run models locally behind air-gap (see [[local-deployment]]). Tests data sovereignty, prompt transparency, and capability at reduced model scale.

**L2 — RAG + KG**: Add [[retrieval-augmented-generation]] and [[knowledge-graphs]] for domain grounding. Tests retrieval quality and constraint enforcement.

**L3 — Tool Calling**: Enable [[tool-calling]] to external systems (historian, databases). Tests integration reliability and error compounding.

**L4 — Simulator Coupling**: Connect to thermal-hydraulic codes via [[simulator-coupling]]. Tests physics-grounded projection capability.

**L5 — Persistent Agent**: Add persistence, memory, and background monitoring (see [[operator-modelling]]). Tests long-running operation and state management.

**L6 — Multi-Agent**: Deploy [[multi-agent-patterns]]. Tests coordination, [[context-divergence]], and [[epistemic-independence]].

**L7 — Human-in-Loop**: Full operator interaction in simulator setting. Tests [[human-authority]], [[trust-calibration]], [[automation-bias]], and [[hsi-architecture]].

## Running Example

A single scenario — RCS temperature anomaly — threads through all levels, growing in sophistication from a simple question-answer evaluation (L0) to a full multi-agent advisory supporting an operator in a simulator (L7).

## Evidence Production

Each level produces evidence addressing specific gaps identified in Reports 1-5. L0 establishes baseline capability. L2 tests whether grounding resolves [[hallucination]]. L4 tests whether simulation coupling enables meaningful projection. L6 tests whether multi-agent coordination produces [[situation-awareness]] benefit. L7 tests whether operators actually benefit or suffer from [[automation-bias]].

## Timeline

L0 is achievable in a day. The full gradient from L0 through L7 represents 6-12 months of systematic development. The gradient approach addresses the [[build-vs-assess-gap]] by ensuring that assessment evidence is produced at each level rather than deferring all evaluation to the end.
