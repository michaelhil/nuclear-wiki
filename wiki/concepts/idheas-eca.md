---
title: "IDHEAS-ECA"
type: concept
sources:
  - raw/reports/report5-human-reliability-analysis.md
related:
  - "[[human-reliability-analysis]]"
  - "[[automation-bias]]"
  - "[[performance-shaping-factors]]"
tags:
  - hra
  - method
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# IDHEAS-ECA

IDHEAS-ECA (Integrated Human Event Analysis System for Event and Condition Assessment) is an HRA method documented in NUREG-2199. It analyses human performance through five macrocognitive functions, providing a more detailed cognitive model than [[spar-h]]'s PSF-based approach.

## Five Macrocognitive Functions

IDHEAS-ECA decomposes human performance into five cognitive functions:

1. **Detection**: Perceiving that a situation requires attention (noticing alarms, recognising parameter deviations)
2. **Understanding**: Comprehending what the detected information means (diagnosing the plant state)
3. **Decision-making**: Selecting the appropriate response from available options
4. **Action execution**: Physically carrying out the chosen response correctly
5. **Teamwork**: Coordinating with other crew members, communicating, and maintaining shared awareness

## Natural Human-AI Extension

The teamwork function already models interaction between crew members, making IDHEAS-ECA the **most natural framework for extending to human-AI interaction**. The AI advisory system can be modelled as a team member that the operator interacts with during each macrocognitive function.

## AI-Related Cognitive Failure Modes

AI introduces new cognitive failure modes (CFMs) mapped to specific macrocognitive functions:

**[[automation-bias]] → Decision-making**: Operator follows incorrect AI recommendation without independent evaluation. The AI recommendation biases the decision-making process.

**Alert fatigue → Detection**: Repeated low-value AI outputs cause the operator to stop attending to AI advisory channels. A genuine AI alert is missed because the operator has learned to ignore the channel.

**Mode confusion → Understanding**: Operator misunderstands the AI system's current operating mode, context, or confidence level. The operator interprets AI output based on incorrect assumptions about what the AI "knows."

**Reconciliation failure → Teamwork**: Operator fails to resolve discrepancy between their own assessment and the AI advisory. Rather than investigating the disagreement, they either blindly accept or dismiss the AI input.

## CFM/PIF Distinction

IDHEAS-ECA maintains a clearer distinction between cognitive failure modes (what goes wrong cognitively) and performance influencing factors (what conditions make the failure more likely) than [[spar-h]]. This cleaner separation makes it easier to systematically map AI influences to the correct level of the analysis — AI system reliability is a PIF that affects the probability of automation bias (a CFM) in the decision-making function.
