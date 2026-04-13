---
title: "Emergency Response"
type: concept
sources:
  - raw/reports/report3-nuclear-regulatory.md
  - raw/reports/report4-operational-scenarios.md
related:
  - "[[scenario-loca]]"
  - "[[graded-autonomy-tiers]]"
  - "[[simulator-coupling]]"
  - "[[human-authority]]"
tags:
  - nuclear
  - emergency
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Emergency Response

Emergency response represents the highest tier ([[graded-autonomy-tiers|Tier 3]]) of AI-assisted nuclear operations. During events like a loss-of-coolant accident (LOCA), the full multi-agent architecture is deployed to support operators managing rapidly evolving, safety-critical conditions.

## Full Pattern 9 Deployment

Emergency response deploys the complete Pattern 9 (Shared Room) configuration from [[multi-agent-patterns]], typically with 7 specialised agents:

- **Domain experts**: Specialised in thermal-hydraulics, reactor physics, electrical systems, and other relevant disciplines
- **Adversarial agent**: Challenges consensus, specifically designed to resist [[sycophancy]] and group-think
- **Projection agent**: Coupled to simulation codes like [[relap5]] via [[simulator-coupling]] to provide physics-based prediction of future plant states
- **Synthesiser**: Integrates outputs from domain experts into coherent assessment
- **SA Bridge**: Translates multi-agent outputs into operator-comprehensible summaries for [[situation-awareness]] maintenance

## Mandatory Controls

Emergency tier operations require:

- **Governance gates**: All safety-significant recommendations require explicit operator approval before action (see [[human-authority]])
- **Mode escalation**: System transitions from normal to abnormal to emergency modes, with each transition activating additional agents and controls
- **Parallel execution**: Time-critical emergency scenarios demand parallel agent processing — sequential execution is too slow (see [[delivery-modes]])

## Mode Escalation

The system operates in three modes:

1. **Normal**: Subset of agents active, standard advisory
2. **Abnormal**: Additional agents activated, increased monitoring frequency, enhanced [[situation-awareness]] support
3. **Emergency**: Full Pattern 9 deployment, all governance gates active, maximum agent complement, parallel execution mandatory

Escalation criteria are defined in advance and linked to plant conditions, not AI assessment — the AI does not decide when to escalate its own authority.

## Critical Design Principle

During emergencies, AI value is highest but so is risk. The system must provide genuinely useful analysis without becoming a distraction. Operator attention is the scarcest resource during an emergency, and every piece of AI output that requires operator evaluation consumes that resource. The [[delivery-modes|flow gate]] mechanism ensures operators receive information at a manageable rate even when agents produce output rapidly.
