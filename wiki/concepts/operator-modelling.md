---
title: "Operator Modelling"
type: concept
sources:
  - raw/reports/report6-prototyping-guide.md
related:
  - "[[capability-gradient]]"
  - "[[trust-calibration]]"
  - "[[situation-awareness]]"
  - "[[automation-bias]]"
tags:
  - human-factors
  - prototyping
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Operator Modelling

Operator modelling involves simulating operator cognitive states to enable adaptive AI behaviour. This is Level 5 of the [[capability-gradient]], building on the persistent agent capabilities that allow continuous tracking of the human-AI interaction over time.

## Tracked States

The operator model tracks several cognitive dimensions:

**Workload**: Estimated cognitive load based on task complexity, number of concurrent activities, alarm rate, and time pressure. High workload periods (transients, emergencies) require different AI behaviour than low workload periods (steady-state monitoring).

**Attention**: Which systems and parameters the operator is currently focused on, inferred from their queries, display selections, and interaction patterns. Identifies potential attention gaps where important changes may be occurring outside the operator's current focus.

**Trust state**: The operator's current level of trust in the AI system, inferred from their interaction patterns — how often they follow versus override AI recommendations, whether they seek independent confirmation, and their engagement level with AI outputs. See [[trust-calibration]].

## Adaptive AI Behaviour

Based on the operator model, the AI system adapts its output:

**High workload**: Reduce output volume, increase priority filtering, present only the most safety-significant information. Avoid adding to cognitive overload.

**Low trust**: Increase output specificity and reasoning transparency. Provide more supporting evidence. Reduce confidence expressions. The goal is to earn calibrated trust through demonstrated quality, not to assert trustworthiness.

**Attention gaps**: Proactively flag parameters or systems that are changing but outside the operator's apparent focus. This supports [[situation-awareness]] Level 1 (perception) for elements the operator may be missing.

**Slop detection**: If the operator model detects disengagement (decreasing interaction with AI outputs), adjust output quality — either improve specificity or reduce volume to prevent cry-wolf effects that further erode [[trust-calibration]].

## Limitations

Operator modelling is inherently uncertain. The model infers cognitive states from observable behaviour, which is an imperfect proxy. Incorrect inferences can lead to inappropriate AI adaptation — reducing output during a period the model incorrectly assesses as high-workload, for example. The operator model itself requires evaluation as part of the [[evaluation-harness]] framework.

The ethical dimension also requires consideration: tracking and modelling operator cognitive states raises questions about monitoring, autonomy, and the appropriate boundary between AI assistance and AI surveillance.
