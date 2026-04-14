---
title: "Delivery Modes"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[human-authority]]"
  - "[[multi-agent-patterns]]"
  - "[[situation-awareness]]"
tags:
  - multi-agent
  - architecture
  - infrastructure
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Delivery Modes

Delivery modes define how agent outputs reach human operators. The choice of delivery mode directly affects operator [[situation-awareness]], cognitive load, and the effectiveness of [[human-authority]] controls.

## Output Delivery Types

**Broadcast**: Agent output is delivered immediately to the operator as it is generated. Lowest latency but highest potential for information overload. Appropriate for urgent safety-significant information.

**Flow gate**: Outputs are queued with priority ordering and released under operator control. The operator decides when to receive the next piece of information, preventing overload during high-workload periods. Natural integration with [[human-authority]] controls.

**Heartbeat channel**: Scheduled outputs from persistent monitoring agents (Pattern 7). Regular, predictable updates at operator-defined intervals. Appropriate for background monitoring and [[shift-handover]] continuity.

## Execution Models

Three execution models determine how agents process their work:

**Synchronous-sequential**: Agents execute one at a time, each waiting for the previous to complete. Total time = sum of all agent processing times. Simple audit trail — logs are naturally ordered. For 5 agents each taking 8 seconds: 40 seconds total.

**Agent-parallel**: Multiple agents execute simultaneously. Total time = slowest agent. This is the natural execution model for Pattern 9 (Shared Room). For 5 agents each taking 8 seconds: approximately 8 seconds total. Requires managing concurrent context access.

**Fully parallel**: Both agents and their tool calls execute concurrently. Lowest latency. For 5 agents each taking 8 seconds with parallel tool calls: potentially less than 8 seconds.

## Performance Impact

The difference is operationally significant. Five agents at 8 seconds each: sequential takes 40 seconds, parallel takes approximately 8 seconds. During time-critical emergency scenarios (see [[emergency-response]]), this 5x difference matters.

## Adaptive Switching

Systems can switch execution models based on operational context. Sequential processing during steady-state operations (simpler auditing, lower resource usage). Parallel processing during transients and emergencies (faster response, time-critical). This adaptive switching requires the system to detect operational mode changes — linking to [[situation-awareness]].

## Auditability Trade-off

Concurrent execution produces interleaved logs. Two agents writing simultaneously create an interleaved audit trail that requires reconstruction to understand each agent's reasoning chain. Sequential execution produces naturally ordered, easily auditable logs. This trade-off — speed versus auditability — must be explicitly addressed in system design.
