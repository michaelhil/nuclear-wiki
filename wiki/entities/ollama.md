---
title: "Ollama"
type: entity
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[local-deployment]]"
  - "[[capability-gradient]]"
tags:
  - tools
  - local-deployment
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Ollama

A tool for running LLMs locally. Referenced in Report 6 as the primary serving tool for Level 1 of the [[capability-gradient]] (local deployment and model comparison). Enables running open-weight models behind air-gap boundaries — critical for nuclear applications where plant data must not leave the site.

Supports [[quantization|quantised]] models (GGUF format), enabling deployment on hardware ranging from high-end servers to workstations.
