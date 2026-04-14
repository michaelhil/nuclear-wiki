---
title: "Evaluation Harness"
type: concept
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[capability-gradient]]"
  - "[[hallucination]]"
  - "[[calibration]]"
tags:
  - prototyping
  - evaluation
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Evaluation Harness

The evaluation harness is Level 0 of the [[capability-gradient]] — the foundational infrastructure for assessing LLM capability in nuclear domains. It is reused at every subsequent level, providing consistent measurement as capabilities are added.

## Components

**Curated question sets**: Domain-specific questions with known correct answers spanning nuclear engineering topics: thermal-hydraulics, reactor physics, radiation protection, regulatory requirements, procedures, and operational scenarios. Questions must cover a range of difficulty levels and question types (factual recall, analytical reasoning, multi-step problem solving).

**Multi-prompt evaluation**: The same semantic question expressed in multiple different phrasings. This tests for [[non-determinism]] and format sensitivity — if the model answers correctly with one phrasing but incorrectly with a semantically equivalent rephrasing, this reveals fragile capability rather than robust understanding.

**Response scoring**: Three evaluation dimensions:
- **Accuracy**: Is the answer factually correct?
- **Specificity**: Does the answer provide discriminating information, or is it vague and generic?
- **[[calibration]]**: Does the model's expressed confidence match its actual accuracy?

## The Nuclear Benchmark Gap

A critical finding: **no nuclear-specific benchmarks exist**. General AI benchmarks (MMLU, HellaSwag, etc.) do not cover nuclear engineering domains. Creating nuclear-specific evaluation sets is itself a significant research contribution and a prerequisite for credible capability assessment.

## Specificity Metrics

The distinction between vacuous and discriminating responses is essential. A response that says "RCS temperature should be monitored carefully during transients" is vacuous — it is always true and provides no operational value. A response that identifies the specific trend, relates it to a specific mechanism, and recommends a specific monitoring frequency is discriminating.

The evaluation harness must explicitly measure this distinction. A model that produces fluent, confident, vacuous responses appears capable on surface inspection but provides no operational value. This metric is particularly important for detecting [[hallucination]] patterns where the model produces plausible-sounding but content-free responses.

## Reuse Across Levels

The evaluation harness established at L0 persists through all subsequent levels. Each level adds capability (RAG at L2, tools at L3, simulation at L4) and is re-evaluated using the same question sets, enabling direct comparison of how each capability addition affects accuracy, specificity, and calibration.
