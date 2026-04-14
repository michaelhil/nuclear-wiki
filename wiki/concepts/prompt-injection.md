---
title: "Prompt Injection and Adversarial Inputs"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[hallucination]]"
  - "[[retrieval-augmented-generation]]"
  - "[[defense-in-depth]]"
  - "[[10cfr50]]"
tags:
  - security
  - safety
  - failure-mode
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Prompt Injection and Adversarial Inputs

If an AI advisory system ingests plant data, retrieved documents, or operator input that could be manipulated, **indirect prompt injection** is a threat. An adversary who can insert crafted text into a document the AI retrieves (a procedure file, a maintenance record, a regulatory text) could alter the agent's behaviour: causing it to ignore relevant data, misinterpret a condition, or produce a specific recommendation.

## Distinction from Traditional Cybersecurity

This is distinct from traditional cybersecurity because the attack operates through the AI's **natural language processing** rather than through software vulnerabilities. The [[transformer-architecture]] processes all tokens in context through unified attention — there is no architectural boundary between "trusted" system prompt tokens and "untrusted" retrieved document tokens. The model cannot distinguish between instructions from its designers and instructions embedded in retrieved content.

## Nuclear-Specific Concerns

For nuclear applications, the data pipeline feeding the AI must be treated as part of the **security boundary**:

- Documents retrieved by [[retrieval-augmented-generation|RAG]] must be protected against tampering
- Sensor data from plant historians must have integrity guarantees
- Procedure texts used for context must be from verified sources
- Operating experience entries must be authenticated

These protections should carry the same rigour applied to safety-classified data paths.

## Regulatory Gap

Report 3 identifies AI-specific cybersecurity as **regulatory gap #8** in the NRC framework. Existing regulations ([[10cfr50|10 CFR 73.54]], NEI 08-09) address digital I&C cybersecurity but were not written for attacks that operate through natural language rather than through network protocols or software exploits. A prompt injection attack that causes the AI to misinterpret a procedure step is a fundamentally different threat class than a network intrusion that modifies a setpoint.

## Mitigations

- **Input validation**: Sanitise and verify all text entering the agent's context
- **Source authentication**: Cryptographic verification of retrieved documents
- **[[local-deployment]]**: Reduces attack surface by eliminating cloud API pathways
- **Output validation**: [[knowledge-graphs|KG guardrails]] can catch outputs that contradict verified domain knowledge regardless of what caused the error
- **Architectural separation**: Treat the RAG pipeline as an untrusted input channel with explicit validation gates
