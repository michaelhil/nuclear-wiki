---
title: Nuclear AI Wiki
---

# Nuclear AI Wiki

A living knowledge base on AI agent systems for nuclear power plant operations. Compiled from a six-report series by Michael Hildebrandt (IFE, 2026).

## Source Summaries

- [[summary-llm-foundations]] — Report 1: LLM architecture, agent systems, failure modes, knowledge grounding
- [[summary-multiagent]] — Report 2: 10-pattern taxonomy, coordination, epistemic independence
- [[summary-nuclear-regulatory]] — Report 3: NRC regulatory implications, safety analysis, control room design
- [[summary-scenarios]] — Report 4: Nine nuclear control room scenarios as worked examples
- [[summary-hra]] — Report 5: HRA method adaptation for AI-assisted operations
- [[summary-prototyping-guide]] — Report 6: 8-level capability gradient for building and testing

## Core Concepts

### LLM Fundamentals
- [[transformer-architecture]] — Self-attention, unified context processing, lost-in-the-middle effect
- [[tokenization]] — Sub-word tokens, implications for numerical reasoning
- [[context-windows]] — Fixed-size buffer, context rot, usable capacity
- [[statelessness]] — No memory between invocations
- [[non-determinism]] — Stochastic output, implications for V&V
- [[post-training-alignment]] — SFT, RLHF, Constitutional AI, DPO

### Failure Modes
- [[hallucination]] — Confident fabrication, confidence-without-correctness problem
- [[calibration]] — Overconfidence, degradation on hard questions
- [[sycophancy]] — Agreement bias from RLHF training
- [[automation-bias]] — Over-reliance on AI recommendations
- [[trust-calibration]] — Matching operator trust to AI reliability

### Knowledge & Grounding
- [[retrieval-augmented-generation]] — RAG architecture, failure points, context rot
- [[knowledge-graphs]] — Structured constraints, guardrails, nuclear procedures as graphs
- [[fine-tuning]] — LoRA, QLoRA, when to fine-tune vs use RAG
- [[quantization]] — GPTQ, AWQ, GGUF, accuracy trade-offs

### Agent Architecture
- [[agent-architecture]] — Perceive-reason-act loop, ReAct pattern, memory types
- [[tool-calling]] — Function calling, reliability concerns, MCP
- [[prompt-engineering]] — System prompts, soul prompts, sensitivity
- [[context-management]] — Compression, summarisation, context discipline

### Multi-Agent Systems
- [[multi-agent-patterns]] — 10-pattern taxonomy (Patterns 0-9)
- [[epistemic-independence]] — Decorrelated reasoning errors
- [[monoculture-collapse]] — Common-cause failure from shared models
- [[model-heterogeneity]] — Using different foundation models
- [[delivery-modes]] — How agent outputs reach humans
- [[context-divergence]] — Agents developing different situational pictures
- [[situation-awareness]] — SA Levels 1-3 mapped to LLM architecture

### Nuclear Operations
- [[defense-in-depth]] — Layered barriers, epistemic analogue for AI
- [[graded-autonomy-tiers]] — Three regulatory tiers (Tier 1-3)
- [[human-authority]] — Governance gates, room pause, flow gates
- [[alarm-prioritization]] — AI-assisted alarm management
- [[shift-handover]] — SA continuity across crew changes
- [[emergency-response]] — AI advisory during LOCA and emergencies
- [[procedure-ai-interaction]] — AI interaction with EOPs, AOPs, Tech Specs
- [[hsi-architecture]] — Display design for AI advisory
- [[common-cause-failure]] — Shared failure modes across AI systems

### HRA & Safety Assessment
- [[human-reliability-analysis]] — HRA methods overview
- [[spar-h]] — PSF multiplier model
- [[idheas-eca]] — Macrocognitive function decomposition
- [[atheana]] — Error-forcing contexts
- [[performance-shaping-factors]] — Standard and AI-specific PSFs
- [[psa-integration]] — Incorporating AI into PSA event trees

### Prototyping & Testing
- [[capability-gradient]] — 8-level path (Levels 0-7)
- [[build-vs-assess-gap]] — Buildability outpacing assessability
- [[evaluation-harness]] — Structured LLM evaluation
- [[local-deployment]] — Running models behind air-gap boundaries
- [[simulator-coupling]] — Connecting LLMs to RELAP5, FRAPCON
- [[operator-modelling]] — Simulating operator cognitive states

## Comparisons

- [[rag-vs-fine-tuning]] — When to retrieve vs when to train
- [[single-agent-vs-multi-agent]] — When multi-agent is justified
- [[frontier-vs-local-models]] — Cloud API vs local deployment
- [[hra-methods-compared]] — SPAR-H vs IDHEAS-ECA vs ATHEANA

## Scenarios

- [[scenario-shift-handover]] — SMR shift handover (Pattern 7)
- [[scenario-rcs-temperature]] — RCS temperature anomaly (Pattern 0 vs 9)
- [[scenario-concurrent-alarms]] — Concurrent alarms during transient (Pattern 9)
- [[scenario-safety-verification]] — Independent safety verification (Pattern 9 + diversity)
- [[scenario-loca]] — Loss of Coolant Accident (Pattern 9, 7 agents)
- [[scenario-fuel-monitoring]] — Long-term fuel integrity (Pattern 9 + KG)
- [[scenario-instrument-failure]] — Instrument channel failure (Pattern 9)
- [[scenario-multi-unit-smr]] — Multi-unit SMR monitoring (9 agents)
- [[scenario-compound-event]] — Compound event with ambiguous indications

## Entities

### Organizations
- [[nrc]] — U.S. Nuclear Regulatory Commission
- [[iaea]] — International Atomic Energy Agency
- [[epri]] — Electric Power Research Institute

### Frameworks & Tools
- [[crewai]] — Role-based multi-agent framework
- [[autogen]] — Microsoft conversational multi-agent
- [[langgraph]] — Graph-based agent orchestration
- [[letta]] — Memory-focused agent framework
- [[mcp]] — Model Context Protocol
- [[ollama]] — Local LLM serving

### Simulation
- [[relap5]] — Thermal-hydraulic simulation
- [[frapcon]] — Fuel performance simulation

### Reactor Types
- [[pwr]] — Pressurised Water Reactor
- [[smr]] — Small Modular Reactor

### Standards & Regulations
- [[10cfr50]] — NRC nuclear power plant regulations
- [[nureg-0700]] — HFE review guidelines
- [[nureg-0711]] — HFE engineering process
- [[nureg-1792]] — Good practices for HRA
- [[nureg-2199]] — IDHEAS-ECA methodology
