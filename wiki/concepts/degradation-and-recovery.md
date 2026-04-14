---
title: "Degradation and Recovery"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[defense-in-depth]]"
  - "[[human-authority]]"
  - "[[situation-awareness]]"
tags:
  - multi-agent
  - safety
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Degradation and Recovery

Nuclear systems are designed with defined degraded-mode operation for each level of equipment failure. A multi-agent AI architecture requires equivalent thinking: what happens when components fail, how failures are detected, and what capability remains.

## Agent Failure Detection

Three failure types must be distinguished:

- **Silent failure**: Agent stops producing output without reporting error. Ambiguous — the agent may have nothing to say, or it may have crashed
- **Explicit failure**: Agent reports error or process terminates with detectable signal. Easiest to detect
- **Degraded failure**: Agent continues producing output but quality has declined — increased [[hallucination]] rate, repetitive responses, loss of operational context. Hardest to detect

The **Coordination Monitor** role (Report 2 Table 5) is responsible for detection: heartbeat monitoring (silent failure), output quality heuristics (degraded failure), and process health checks (explicit failure).

## Graceful Degradation

Each agent role's loss produces a different impact:

| Lost Role | Capability Lost | Residual System |
|-----------|----------------|-----------------|
| Adversarial agent | Independent challenge | Operational but loses safety-relevant diversity |
| Synthesiser | Integrated picture | Operator must manually integrate individual outputs |
| All agents on one model | Model diversity | Remaining-model agents operational; independence degrades |
| SA Bridge | Operator-adapted presentation | Raw agent output reaches operator; cognitive load increases |
| All agents | AI advisory entirely | Operator performs all tasks unaided (must always be possible) |

## Fallback Modes

Four defined degraded states, each with its own [[hsi-architecture|display mode]]:

1. **Reduced agent count**: Some roles offline, core function maintained
2. **Reduced model diversity**: All agents on one base model — [[epistemic-independence]] compromised
3. **Single-agent operation**: One agent providing advisory without coordination properties
4. **No-AI operation**: Operator performs all tasks without AI support

The **single failure criterion** in nuclear safety requires that operators can perform all credited actions without AI. Transitions between fallback modes should be automatic on failure detection and reversible on recovery.

## State Reconstruction (Late-Joiner Problem)

When a failed agent restarts, it has empty context and must build [[situation-awareness]] from scratch. Mitigations: pre-computed state summaries, periodic checkpoints, and compressed state snapshots maintained by the Coordination Monitor for restart scenarios.
