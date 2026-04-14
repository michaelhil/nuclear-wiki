---
title: Glossary
---

# Glossary

Quick-reference alphabetical listing of key terms. Click any term for the full wiki article.

| Term | Definition | Page |
|------|-----------|------|
| Agent | LLM embedded in perceive-reason-act loop with tool access | [[agent-architecture]] |
| Attention sink | Initial tokens that stabilise transformer attention patterns | [[context-management]] |
| ATHEANA | HRA method identifying error-forcing contexts for commission errors | [[atheana]] |
| Automation bias | Over-reliance on AI recommendations without independent verification | [[automation-bias]] |
| Calibration | Degree to which expressed confidence matches actual accuracy | [[calibration]] |
| Capability gradient | 8-level prototyping path (L0-L7) for nuclear AI systems | [[capability-gradient]] |
| Cognitive load | Operator mental processing demands during agent supervision | [[cognitive-load]] |
| Common-cause failure | Failure of multiple barriers from shared cause | [[common-cause-failure]] |
| Compaction | Context compression by deleting tokens (zero hallucination risk) | [[context-management]] |
| Confidence-without-correctness | Property that hallucinated output reads identically to correct output | [[hallucination]] |
| Context divergence | Agents developing different situational pictures in shared room | [[context-divergence]] |
| Context rot | Performance degradation as input length increases | [[context-rot]] |
| Context window | Fixed-size token buffer processed in single inference pass | [[context-windows]] |
| DID / Defense-in-depth | Multiple independent safety barriers principle | [[defense-in-depth]] |
| Delivery modes | How agent outputs reach human participants (broadcast, flow gate) | [[delivery-modes]] |
| DPO | Direct Preference Optimisation — alignment without reward model | [[post-training-alignment]] |
| Epistemic independence | Decorrelated reasoning errors across agents | [[epistemic-independence]] |
| Error-forcing context | Conditions making wrong action appear correct (ATHEANA) | [[atheana]] |
| Fine-tuning | Adapting pre-trained model (SFT, LoRA, QLoRA) | [[fine-tuning]] |
| Flow gate | Delivery mode queuing agent outputs for sequential release | [[delivery-modes]] |
| Governance gate | Human approval required before safety-significant AI actions | [[human-authority]] |
| Hallucination | Fluent, confident, factually wrong LLM output | [[hallucination]] |
| Heartbeat | Scheduled periodic agent invocation without user trigger | [[agent-architecture]] |
| HRA | Human Reliability Analysis — quantifying human error probability | [[human-reliability-analysis]] |
| HSI | Human-System Interface — control room display architecture | [[hsi-architecture]] |
| IDHEAS-ECA | Macrocognitive HRA method (NUREG-2199) | [[idheas-eca]] |
| KG | Knowledge graph — structured entity-relationship database | [[knowledge-graphs]] |
| Lost in the middle | LLMs underuse information in centre of long contexts | [[context-windows]] |
| MCP | Model Context Protocol — model-agnostic tool connectivity standard | [[mcp]] |
| Model heterogeneity | Using different foundation models for independence | [[model-heterogeneity]] |
| Monoculture collapse | Correlated failure when all agents share one base model | [[monoculture-collapse]] |
| Non-determinism | Stochastic LLM output — same input may yield different outputs | [[non-determinism]] |
| Output vacuity / Slop | Superficially competent but substantively empty AI output | [[output-vacuity]] |
| Pattern 0 | Single-agent role simulation (baseline, no true multi-agent) | [[multi-agent-patterns]] |
| Pattern 7 | Personal assistant with heartbeat — persistent proactive monitoring | [[multi-agent-patterns]] |
| Pattern 9 | Shared room — concurrent agents, enforced isolation, human peer | [[multi-agent-patterns]] |
| PIF | Performance-influencing factor (IDHEAS-ECA terminology) | [[performance-shaping-factors]] |
| Prompt injection | Adversarial text in retrieved content altering agent behaviour | [[prompt-injection]] |
| PSA | Probabilistic Safety Assessment | [[psa-integration]] |
| PSF | Performance shaping factor (SPAR-H terminology) | [[performance-shaping-factors]] |
| Quantization | Model compression reducing weight precision (4-bit, 8-bit) | [[quantization]] |
| RAG | Retrieval-Augmented Generation | [[retrieval-augmented-generation]] |
| ReAct | Thought-action-observation agent loop pattern | [[agent-architecture]] |
| Reasoning models | LLMs with explicit chain-of-thought before final answer | [[reasoning-models]] |
| RLHF | Reinforcement Learning from Human Feedback | [[post-training-alignment]] |
| Room pause | Operator control halting all agent output delivery | [[human-authority]] |
| SA | Situation Awareness — perception, comprehension, projection | [[situation-awareness]] |
| SA Bridge | Agent role translating multi-agent output for operators | [[situation-awareness]] |
| Slop | See output vacuity | [[output-vacuity]] |
| Soul prompt | Persistent system prompt defining agent identity across sessions | [[prompt-engineering]] |
| SPAR-H | PSF-multiplier HRA method (NUREG/CR-6883) | [[spar-h]] |
| Structured output | Constrained generation (JSON mode, grammar-based) | [[structured-output]] |
| Sycophancy | LLM tendency to agree with user rather than maintain assessment | [[sycophancy]] |
| Tokenization | Sub-word segmentation of text into fixed vocabulary units | [[tokenization]] |
| Tool calling | Mechanism for agents to invoke external functions | [[tool-calling]] |
| Transformer | Neural network architecture using self-attention | [[transformer-architecture]] |
| Trust calibration | Matching operator trust to actual AI reliability | [[trust-calibration]] |
