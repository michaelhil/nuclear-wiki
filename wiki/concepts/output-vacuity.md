---
title: "Output Vacuity (Slop)"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[hallucination]]"
  - "[[calibration]]"
  - "[[trust-calibration]]"
  - "[[context-windows]]"
  - "[[automation-bias]]"
tags:
  - llm
  - failure-mode
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Output Vacuity (Slop)

Output vacuity is a failure mode distinct from [[hallucination]]: where hallucination produces confident claims that are **wrong**, vacuity produces confident prose that is **empty** — technically unobjectionable but operationally useless. The term "slop" (Kommers et al., 2025; Shaib et al., 2025) describes this class of AI-generated content exhibiting superficial competence without underlying substance.

## Architectural Cause: Central-Tendency Bias

LLMs generate output biased toward high-frequency patterns in training data. When a query falls in the long tail of the training distribution (rare, specialised, condition-specific knowledge), the model compensates by **retreating to generality**: listing all plausible causes rather than discriminating, restating data rather than analysing it, hedging so broadly that no actionable conclusion emerges. This is not a reasoning failure but a structural property of maximum-likelihood generation.

Kandpal et al. (2023) demonstrated that model accuracy correlates directly with how frequently relevant knowledge appeared during training.

## Context Length Interaction

Slop probability **increases with context utilisation**. As sessions lengthen and context fills with accumulated tool results and history, the model's attention spreads across more tokens and each piece of evidence receives less weight. The "lost in the middle" effect (Liu et al., 2024) compounds this: information in the centre of long context receives less attention, and output gravitates toward generic patterns. Output quality degrades toward vacuity precisely when the situation is most complex and the operator's need for specific analysis is greatest.

## Nuclear Control Room Manifestation

- Diagnostic assessments listing all textbook causes without discriminating based on current conditions (e.g., "could be instrument drift, thermal-hydraulic change, or controller malfunction" when the RTD recalibration record in context clearly points to instrument drift)
- Alarm prioritisation narratives restating individual alarm descriptions without synthesising cross-alarm patterns
- Shift summaries that restate parameters without identifying trends or implications

## The Indirect Danger

Vacuity evades detection mechanisms that catch [[hallucination]]: it makes no specific falsifiable claim. A [[knowledge-graphs|KG guardrail]] cannot flag it, an alert operator cannot refute it, a cross-checking agent cannot contradict it. The harm is **indirect but cumulative**: operators receiving consistently generic output reduce attention to AI output (the "cry-wolf" effect from alarm management literature, Wickens et al., 2009). This **slop-induced disengagement** is distinct from [[automation-bias]]: rather than over-trusting specific wrong recommendations, operators cease to evaluate recommendations at all.

## Mitigations

- **Structured output templates**: Require the agent to commit to specific parameter values, specific procedure steps, and specific time frames — not unconstrained prose
- **Novelty filters**: Suppress AI output unless it adds information beyond what qualified displays already show
- **Specificity metrics**: In the [[evaluation-harness]], measure whether the model discriminates between hypotheses or retreats to generic enumeration
- **Soul prompt design**: Prompts demanding explicit evidence citations and hypothesis discrimination elicit less vacuous output than open-ended requests
- **Operator training**: Exposure to slop as a recognisable failure pattern. Heuristic: if the AI assessment applies equally well to three different plant conditions, it is not adding value

## Interaction with Task Framing

The same model produces highly specific output for narrow, constrained tasks ("what is the Tech Spec limit for RCS cold leg temperature?") and retreats to generic output for broad, ambiguous ones ("assess the current plant status"). Slop is not solely a model property but a joint property of model, prompt, and task.
