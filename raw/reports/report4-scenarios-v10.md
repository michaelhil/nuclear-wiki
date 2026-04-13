# AI Agent Scenarios for Nuclear Control Rooms

**Michael Hildebrandt**

**Draft -- April 2026**

## Table of Contents

1. Introduction
2. Scenario 1: Shift Handover Monitoring
3. Scenario 2: Developing RCS Temperature Anomaly
4. Scenario 3: Concurrent Alarms During Reactor Transient
5. Scenario 4: Independent Safety Verification
6. Scenario 5: Loss of Coolant Accident, Emergency Response
7. Scenario 6: Long-Term Fuel Integrity Monitoring
8. Scenario 7: Instrument Channel Failure
9. Scenario 8: Multi-Unit SMR Monitoring
10. Scenario 9: Compound Event with Ambiguous Indications
11. Tool Architecture for Nuclear AI Advisory Systems
12. HSI Architecture for Human-AI Systems in the Control Room
13. Procedure-AI Interaction
14. Human and Organisational Factors
15. Synthesis
References

## 1. Introduction

### 1.1 Scope

This report presents nine conceptual design scenarios grounding the architectural concepts from the companion reports in specific nuclear power plant control room situations. The scenarios illustrate why the distinctions between architectural patterns, and between single-agent and multi-agent operation, carry practical consequences in a domain where those consequences are severe. They are not deployment proposals, not safety cases, and not regulatory submissions. Nuclear qualification, software V&V under 10 CFR 50 Appendix B, and NRC licensing review lie beyond scope.

The scenarios are thought experiments. They illustrate architectural properties but do not validate them. Validation requires empirical simulator studies with licensed operators under realistic conditions (see Report 3, Section 4.9).

### 1.2 Reactor Types

The scenarios use two reactor configurations. Scenarios 1, 8, and parts of Scenario 6 use a generic small modular reactor (SMR) plant with four modules sharing a single control room. The remaining scenarios use a generic pressurised water reactor (PWR). No specific licensed design is modelled.

### 1.3 Key Concepts

The table below defines the central terms and constructs used throughout this report. A full taxonomy of architectural patterns and functional roles appears in Report 2, Section 3.

| Concept | Definition |
|---|---|
| Context window | The bounded working memory of an LLM, measured in tokens, that determines how much information the model can process in a single reasoning cycle. |
| Hallucination | An LLM output that is fluent and confident but factually incorrect, generated from distributional patterns rather than verified knowledge (Report 1, Section 2.4). |
| Retrieval-augmented generation (RAG) | An architecture in which an LLM queries an external document store or database and conditions its output on the retrieved content, reducing reliance on parametric memory alone (Report 1, Section 7). |
| Knowledge graph (KG) | A structured representation of domain knowledge as entities and relationships, used to ground and constrain agent assertions against verified facts (Report 1, Section 7). |
| Pattern 0 (Single-Agent Role Simulation) | A single LLM prompted to play multiple roles within one context; used as a comparison baseline in Scenario 2 (Report 2, Section 3). |
| Pattern 7 (Personal Assistant with Heartbeat) | A single agent with persistent identity and scheduled autonomous invocation, used for ambient monitoring in Scenario 1 (Report 2, Section 3). |
| Pattern 9 (Shared Room) | The full multi-agent architecture: concurrent agents with separate identities and context windows, human participants as peers, and explicit delivery mechanisms controlling how agent responses enter the shared space (Report 2, Section 3). |
| Epistemic independence | The requirement that two assessments be generated from separate information, separate reasoning processes, or separate models, so that agreement or disagreement carries independent evidential weight (Report 2, Section 7). |
| Monoculture collapse | The failure mode in which agents running on the same base model, or on models with correlated training distributions, converge on the same wrong answer because they share systematic calibration gaps (Report 2, Section 7.4). |
| Synthesiser | An agent role that aggregates across other agents' outputs and produces integrated assessments for the operator (Report 2, Table 3). |
| SA Bridge | An agent or agent function that translates between the AI system's internal technical communication and operator-usable display formats, adapting presentation to the recipient's role and current needs (Section 12.4). |
| Governance gate | A decision point at which a human authority holder reviews agent outputs and exercises approval, rejection, or override authority before any consequential action proceeds. |
| Soul prompt | The persistent system-level instruction set defining the agent's role and constraints, encompassing monitoring priorities, risk thresholds, communication style, and tool-access permissions (Report 1, Section 5; Section 12.5). |
| Flow gate | A delivery mode in which agent responses are queued and released one at a time, with priority rules determining order, preventing information flooding during high-activity periods (Report 2, Section 5.3). |
| Room pause | An operator control that suspends all agent output delivery to the shared room, allowing the operator to process existing information without additional input. |
| Adversarial agent | An agent role that challenges consensus assessments and resists premature agreement, running on a different base model with restricted information access to provide extrinsic critique (Report 2, Table 3). |
| Projection agent | An agent role coupled to physics-based simulation codes (RELAP5, FRAPCON) that generates Level 3 SA by computing forward projections of plant state (Report 2, Table 3). |
| Graded regulatory tiers | Three tiers governing AI advisory deployment: Tier 1 (ambient monitoring, limited review), Tier 2 (active advisory, full HFE review), Tier 3 (safety-critical advisory, D3 analysis and model heterogeneity assessment) (Report 3, Section 4). |

**Scenario overview:**

| Scenario | Reactor | Pattern | Primary Concept |
|---|---|---|---|
| 1 | SMR (4 modules) | Pattern 7 | Heartbeat, SA continuity, memory |
| 2 | PWR | Pattern 0 vs 9 | Epistemic independence |
| 3 | PWR | Pattern 9 (5 agents) | Flooding, delivery modes, context divergence |
| 4 | PWR | Pattern 9 + model diversity | Common-cause failure, KG guardrails |
| 5 | PWR | Pattern 9 (7 agents) | Full role deployment, LOCA response |
| 6 | SMR | Pattern 9 + KG + adaptive | KG grounding, simulation coupling |
| 7 | PWR | Pattern 9 (3 agents) | Threading, attentional tunnelling |
| 8 | SMR (4 modules) | Pattern 9 (9 agents) | Multi-unit SA scaling |
| 9 | PWR | Pattern 9 + model diversity | AI failure under compound event, operator override |

## 2. Scenario 1: Shift Handover Monitoring

**Reactor type:** Generic SMR, four modules, shared control room.
**Primary paper topics:** Pattern 7, heartbeat, SA continuity, memory architecture.
**Agent configuration:** Four agents (one per module), Pattern 7 architecture.

### Operational Context

The night-to-day shift handover at a four-module SMR plant. The incoming shift supervisor and two reactor operators are relieving a night crew that has managed an uneventful shift, with one exception: Module 2 experienced a minor feedwater control valve oscillation around 03:00 that self-corrected after approximately fifteen minutes. The night crew noted it in the shift log. The question is whether the day crew absorbs this information with enough context to recognise a recurrence.

### Agent Architecture

Each module has a dedicated monitoring agent running in Pattern 7: persistent identity (soul prompt defining its module scope and monitoring priorities), heartbeat-driven invocation every 90 seconds during normal operations, and episodic memory accumulating parameter trends and notable events across the shift.

These are not Pattern 9 agents. They do not share a conversation room. They do not communicate with each other. Each agent monitors its own module in isolation and presents its outputs to the operator responsible for that module.

### The Handover

At shift change, each agent generates a handover summary from its accumulated episodic memory. Module 2's agent produces a summary that includes the feedwater valve oscillation: the time of onset, duration, amplitude, the parameters that were affected (SG level deviation, feedwater flow variation), and the fact that the oscillation resolved without operator intervention. The summary also notes that the valve's previous maintenance history, retrieved from the agent's semantic memory, shows two similar events in the past 90 days, both self-correcting.

The incoming shift supervisor reads the four handover summaries on the overview display. The summaries are structured identically across all four modules: a status line, notable events, current parameter state, and any open items. The Module 2 summary stands out because it has a notable event where the other three do not.

### What This Scenario Illustrates

**SA continuity across shift boundaries.** The night crew's SA, accumulated over eight hours of monitoring, cannot be transferred to the day crew through a verbal briefing alone. The agent's episodic memory provides a structured record that supplements the human handover. The incoming supervisor does not need to reconstruct what happened from raw data; the agent has maintained a curated history.

**AI-assisted shift log construction.** Throughout the shift, the agent assists the night crew's documentation workflow. When the feedwater valve oscillation occurs at 03:00, the agent detects the event through its heartbeat monitoring and suggests a shift log entry with structured metadata: timestamp, affected module, affected system (feedwater), event category (equipment oscillation), severity assessment (self-correcting, no operator action required), and affected parameters (SG level, feedwater flow). The night shift operator reviews the suggested entry, edits the severity assessment to add context ("similar to WO-2026-1847 event on 2026-01-15"), and approves it. The agent then cross-references the entry to the two prior feedwater valve events in its semantic memory, creating bidirectional links between the three entries. This cross-referencing is the kind of pattern that Obsidian and similar knowledge management tools make routine through bidirectional linking: each new entry automatically connects to related entries, and the resulting network of connections grows organically from the operator's documentation activity rather than from a predefined classification scheme. The handover summary at shift change is not generated from scratch; it is assembled from the shift's accumulated structured entries, each carrying its own metadata tags and cross-references. The incoming supervisor can trace any summary item back to its source entry, and the source entry links to its related historical events.

**Temporal knowledge organisation.** The shift's structured entries constitute a temporal knowledge unit: a bounded collection of observations, events, and assessments tied to a specific shift period and crew. This temporal unit links forward to the incoming shift's entry (for handover continuity), backward to the preceding shift's entry (for issue tracking), and laterally to equipment records, maintenance work orders, and past entries with similar operational signatures. Over weeks and months of accumulated temporal units, the agent builds a longitudinal knowledge layer that supports queries no single shift's memory can answer: "how often has this feedwater valve oscillated in the last 90 days?", "is the oscillation frequency increasing?", "does the oscillation correlate with power manoeuvring schedules?" These queries operate on the structured metadata of the temporal entries, not on semantic similarity search over narrative text, and are therefore more precise and less susceptible to the retrieval failure modes documented in Report 6 (Hildebrandt, 2026f), Section 3.2.

**Heartbeat-driven ambient monitoring.** The feedwater valve oscillation at 03:00 was detected by the agent's heartbeat invocation. No operator explicitly asked the agent to monitor feedwater valve behaviour. The heartbeat is what makes the agent a monitor rather than a responder: it perceives conditions between human queries.

**The limitation of Pattern 7 in a multi-unit setting.** Four independent agents, one per module, cannot detect cross-module patterns. If Modules 2 and 4 both experienced feedwater valve oscillations at different times during the night, no agent would flag the correlation. The per-module architecture provides depth of monitoring within each unit at the cost of cross-unit awareness. This limitation motivates the Pattern 9 configurations in subsequent scenarios and the multi-unit architecture explored in Scenario 8 (Section 9).

### Display

The shift handover display shows all four modules on the overview, with the SA Bridge function (here implemented as a formatting layer within each Pattern 7 agent, not a separate agent) presenting structured summaries in a standardised layout. Module 2's entry is visually distinguished by the presence of a notable event flag.

![](figures/fig3-shift-handover.png)

*Figure 1: Shift handover summary display for a four-module SMR plant. Module 2 (yellow) has a notable event flagged; the remaining modules (green) report normal conditions. The standardised layout allows the incoming shift supervisor to scan all four modules and identify items requiring attention.*

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with tool access to all four modules' plant data historians, maintenance management system, and shift log database can perform the handover task at least as well as four separate agents. The handover is a data retrieval and summarisation problem where the single agent has a structural advantage: holding all four modules in one context, it detects cross-module correlations (for example, feedwater valve events on both Modules 2 and 4) that the four independent Pattern 7 agents cannot see. The limitation is context budget under scale: if one module requires detailed analysis during abnormal conditions, the single agent must split context between depth on one module and routine summaries for three others. The single agent is also a single point of failure for all four modules, though the consequence is a less-informed handover rather than a safety event. See Section 15 for the full comparison framework.

**Verdict.** For shift handover monitoring in normal operations, a single well-configured agent with multi-unit tool access is the simpler and arguably better choice. It provides cross-unit awareness that the per-unit architecture lacks, at lower engineering complexity. The per-unit Pattern 7 architecture becomes justified only when the per-unit monitoring depth required exceeds what a single agent can maintain across all units simultaneously, a condition that arises during abnormal operations but not during routine handover.

**Decision-type allocation.** The shift handover task is almost entirely a Category 4/5 task in the decision-type spectrum (Report 1, Section 4.5): synthesising heterogeneous information from process data, maintenance records, and shift logs into a coherent narrative. No rule engine or statistical method can generate a handover briefing, because the output is a natural-language synthesis rather than a structured decision. The LLM is the right tool for this task, and latency is not a constraint (the handover preparation window is measured in tens of minutes).


## 3. Scenario 2: Developing RCS Temperature Anomaly

**Reactor type:** Generic PWR.
**Primary paper topics:** Pattern 0 vs Pattern 9, epistemic independence (Report 2, Section 7), unified attention problem, superposition of simulacra, productive disagreement, common-cause failure.
**Agent configuration:** Two agents (Pattern 0 simulation, then Pattern 9 true multi-agent).

This scenario receives extended treatment because it serves as the primary illustration of the single-agent vs multi-agent distinction developed in Report 2, Section 7. It is this report's primary pedagogical vehicle for the epistemic independence argument.

### Operational Context

A slow-developing temperature rise in one RCS hot leg. Over the past four hours, Hot Leg A temperature has been rising at approximately 0.15 degrees C per hour. The rise is within the normal operating band, but the rate of change is unusual for steady-state full-power operation. In-core thermocouples show a slight radial asymmetry in the core exit temperature distribution, which could indicate a localised power distribution shift.

Separately, the I&C maintenance log from the previous shift contains a note about recalibration of the Hot Leg A RTD circuit 48 hours ago. The recalibration was performed within acceptance criteria, but the technician noted a residual offset of 0.08 degrees C, within the allowed tolerance band. This note is in the I&C maintenance system; it did not appear in the shift turnover briefing.

The situation requires assessment from two perspectives: reactor physics (is there an actual power distribution change that could affect DNB margin?) and instrumentation (is the apparent trend an artefact of sensor behaviour following recalibration?).

### Pattern 0: Single-Agent Simulation

A single LLM is instructed to play two roles in alternation: Nuclear Safety Engineer (Agent A) and Instrumentation and Controls Specialist (Agent B). Both role definitions, the full operational data, and the instruction to simulate a discussion are provided in a single context.

**Agent A's turn.** The model generates Agent A's assessment. Agent A notes the 0.15 C/hr trend, the in-core thermocouple asymmetry, and raises a concern about a possible quadrant power tilt that could reduce DNB margin. Agent A's soul prompt (the persistent system-level instruction set defining the agent's role and constraints) includes a conservative risk threshold and an explicit instruction to flag conditions that could evolve toward safety limits.

**Agent B's turn.** The model now generates Agent B's response. At this point, the model's attention mechanism operates over the full context, which includes:

- Agent A's complete system prompt (A's risk thresholds, A's uncertainty about the thermocouple asymmetry, A's reasoning about DNB margin)
- Agent A's generated assessment, including A's internal reasoning chain
- Agent B's system prompt (B's expertise definition, B's instruction to evaluate sensor behaviour)
- The I&C maintenance log entry about the RTD recalibration
- The meta-instruction that this is a simulated two-agent discussion

When the model generates B's response, each token attends over all of this context. B's assessment of the instrumentation situation is shaped by full knowledge of what A is worried about, why A is worried, and how uncertain A is. B's "independent" judgement that the RTD recalibration residual offset could explain part of the trend is generated with full access to A's reasoning. If B concurs with A's concern, the concurrence adds no independent evidential weight: it is one inference labelled as two voices.

More subtly: the model knows, when generating B's response, that this is a simulation. The distributional pressure from training (where multi-role dialogues tend toward eventual agreement) shapes B's response trajectory. The model is not maintaining two separate epistemic states; it is generating a dialogue sequence from a single distributional process, producing what Shanahan et al. describe as a superposition of simulacra rather than committed distinct characters.

**The calibration problem.** If the model's training data underrepresents a specific failure mode, such as slow-ramp RTD drift following recalibration (as opposed to step-change drift), neither Agent A nor Agent B will explore this possibility. Agent A will not raise it because A's concern focuses on reactor physics. Agent B will not raise it because B's training-derived sense of "what RTD problems look like" does not include this mode. The systematic gap propagates across both roles.

### Pattern 9: True Multi-Agent

Two separate agents, each running as an independent process with its own context window, potentially on different base models.

**Agent A (Nuclear Safety Engineer)** has in its context:
- Its own soul prompt (role, risk thresholds, analytical approach)
- Four hours of RCS telemetry data, retrieved via sensor-coupled tools
- In-core thermocouple readings showing the radial asymmetry
- Its own episodic memory of prior thermal transient events at this plant
- It does not have the I&C maintenance log. It has not seen the RTD recalibration note.

**Agent B (I&C Specialist)** has in its context:
- Its own soul prompt (role, instrumentation expertise, diagnostic approach)
- The I&C maintenance log, including the RTD recalibration note and the residual offset
- Instrument calibration history for the Hot Leg A RTD circuit
- Its own episodic memory of prior sensor issues
- It does not have the four-hour continuous RCS telemetry trend. It has the current reading but not the rate-of-change history.

Agent A posts its concern to the shared room: "Hot Leg A temperature has been rising at approximately 0.15 C/hr over four hours. In-core thermocouple asymmetry suggests a possible quadrant tilt. Recommend power distribution verification."

Agent B sees this message. Agent B does not see Agent A's soul prompt, Agent A's risk threshold, Agent A's uncertainty about the thermocouple readings, or Agent A's reasoning about DNB margin. Agent B sees only the posted message.

Agent B responds based on its own knowledge: "The Hot Leg A RTD circuit was recalibrated 48 hours ago with a residual offset of 0.08 C within tolerance. I would expect a step-change offset from recalibration, not a ramp. A 0.15 C/hr ramp is not consistent with the recalibration residual. The trend appears to be an actual process signal, not an instrumentation artefact."

This response is epistemically informative in a way that the simulated version cannot be. Agent B had private knowledge (the recalibration history) that could have explained away the anomaly, but after evaluating that knowledge against the reported symptom, B concluded that it does not explain the observation. B's concurrence with A's concern carries independent evidential weight because B arrived at it from different premises with different information.

If instead B had responded "The recalibration residual offset may account for the apparent trend; recommend monitoring for another shift before escalating," the disagreement would also be informative: it would identify a specific, testable alternative explanation that the shift supervisor could evaluate by examining the trend shape (ramp vs step).

### Comparison Table

| Dimension | Pattern 0 (Simulation) | Pattern 9 (True Multi-Agent) |
|---|---|---|
| Agent A's context | Unified context containing both system prompts, all data, simulation instruction | A's soul prompt, 4-hour RCS telemetry, in-core TC data, A's episodic memory |
| Agent B's context | Same unified context as Agent A | B's soul prompt, I&C maintenance log, calibration history, B's episodic memory |
| Information asymmetry | None. Attention operates over full context | Enforced. B has the RTD recalibration history; A does not. A has 4-hour trend data; B does not |
| Attention during B's generation | B's tokens attend over A's risk threshold, A's uncertainty, A's unexpressed DNB margin concern | B's tokens attend only over A's posted message in the shared room |
| Evidential status of agreement | One inference through two labels. No additional weight | Independent concurrence from separate information. Informative |
| Evidential status of disagreement | Generated by the same process that generated the concern. Not informative | Grounded in independently held information. Identifies testable alternative hypotheses |
| Shared calibration bias | If the model underrepresents slow-ramp RTD drift, neither role explores it | If agents use different base models, their calibration gaps are not correlated |

### Common-Cause Failure Connection

Even in the Pattern 9 architecture, if both agents run on the same base model, they share systematic calibration biases. If the training corpus underrepresents a specific failure mechanism (for example, slow thermal stratification in horizontal pipe sections that could produce a localised temperature signal), neither agent will consider it regardless of their role assignment. Model heterogeneity, using a different base model for the I&C specialist than for the safety engineer, mitigates this. The agents' systematic errors become less correlated, and the probability that both miss the same failure mode decreases.

This maps directly onto the NRC independence framework discussed in Section 5. GDC 22 requires independence in protection systems so that no single failure defeats redundancy. Same-model AI agents fail the reasoning independence test in exactly the way that redundant safety channels sharing a common power supply fail the electrical independence test.

### Display

The shift supervisor sees the shared room as a structured display: both agents' assessments side by side, with the underlying data each agent used clearly indicated. Where the assessments diverge, the specific point of disagreement is highlighted, and the operator can drill down to see what data each agent had available.

### Discussion: Single-Agent vs Multi-Agent

This scenario involves three architectures, not two. The comparison above addresses Pattern 0 (single-agent role simulation) vs Pattern 9 (true multi-agent). But there is a third option that Report 2, Section 7 does not develop: a single tool-equipped agent that does not simulate multiple roles at all, but simply analyses the situation as one competent generalist.

**Single-agent approach.** A single frontier-class LLM with tool access to the plant data historian (RCS telemetry, in-core thermocouple data) and the I&C maintenance management system (calibration records, work orders). The agent receives the task: "Evaluate the developing temperature trend in Hot Leg A. Consider both process and instrumentation explanations." It retrieves data from both sources, analyses the trend, checks the calibration history, and produces a single integrated assessment.

**What the single agent does well.** It can competently integrate both data sources. A frontier model with the right tools will retrieve the RTD recalibration record, notice the residual offset, compare it to the observed trend rate, and likely reach the same conclusion that the Pattern 9 I&C agent reached: a 0.15 C/hr ramp is inconsistent with a static calibration offset. The single agent may produce this analysis faster and at lower cost than the two-agent architecture, because it avoids coordination overhead and does not need to exchange information through the shared room.

For routine anomaly investigation, where the goal is a competent integrated assessment, the single agent is a strong choice. It sees all the data, applies all relevant analytical frames, and produces a coherent report.

**What it cannot provide.** Two things.

First, the single agent's assessment is one assessment. If it concludes that the trend is an actual process signal, there is no independent check on that conclusion. The operator receives one opinion. If the operator wants a second opinion, they must either ask the same agent to reconsider (intrinsic self-correction, which Report 2, Section 7.3 shows does not reliably improve reasoning) or invoke a second agent, at which point the architecture is multi-agent.

Second, the single agent's integration of both data sources, which is a strength for competent analysis, is a weakness for independence. The agent knows about the RTD recalibration when it evaluates the reactor physics concern. It cannot unknow it. If the recalibration history is a red herring that happens to produce a plausible-sounding but incorrect explanation, the agent may anchor on it and underweight the process-side evidence. Two agents with separate information access are protected from this anchoring because neither has access to the other's data when forming its initial assessment.

**Three-way comparison.**

| Dimension | Single agent (tools) | Pattern 0 (simulation) | Pattern 9 (multi-agent) |
|---|---|---|---|
| Data access | All data in one context | All data in one context | Separate data per agent |
| Analysis quality | High for integration | Moderate; role-play overhead | High per-domain; integration via shared room |
| Independence | None | Nominal only | Structural (enforced by context separation) |
| Anchoring risk | Present; all data available simultaneously | Present and amplified by unified attention | Mitigated; agents form initial assessments independently |
| Cost | Lowest | Low | Highest (2+ model invocations, coordination) |
| Coordination overhead | None | None | Turn-taking, delivery modes, shared room infrastructure |
| Failure mode | Single point of analytical failure | Single point with false appearance of diversity | Coordination failures (flooding, staleness, divergence) |

**Operational risk.** The single-agent failure mode is a single point of analytical failure: if the agent misdiagnoses the anomaly, the operator receives one confident but wrong assessment with no internal tension to signal that something is off. The multi-agent failure mode is coordination overhead: agents may flood, diverge, or produce conflicting assessments that the operator must reconcile. The question is which failure mode is more dangerous in context. For a slowly developing anomaly with time to investigate, the single agent's efficiency may outweigh the multi-agent's independence. For a situation where the consequence of misdiagnosis is severe (a missed precursor to a safety-significant condition), the absence of independent challenge is a gap.

**Verdict.** For routine anomaly investigation, a single tool-equipped agent is sufficient and preferable on cost and simplicity grounds. Multi-agent architecture is justified when the investigation serves as an independent verification (where the regulatory or safety context requires that two separate analyses be performed) or when the consequences of a missed diagnosis are severe enough that the additional cost of independent assessment is warranted. The decision maps directly onto Report 2, Table 4: "independent expert review" requires context isolation and error independence; "collaborative problem-solving" does not.

**Decision-type allocation.** This scenario illustrates the hybrid decision architecture across two layers. The trend detection itself (Category 2) is better handled by a statistical method: a CUSUM or EWMA algorithm on the RCS temperature time series detects the 0.15 degrees Celsius per hour ramp faster and with a better-characterised false alarm rate than an LLM processing tokenised numerical data. The diagnostic reasoning that follows the detection (Category 4) is the LLM's contribution: connecting the detected trend to the recent RTD recalibration, comparing loop A and loop B behaviour, and assessing proximity to Technical Specification limits. A well-designed system would use the statistical detection as the trigger for the LLM's diagnostic investigation, combining the speed and precision of the former with the contextual reasoning capability of the latter.


## 4. Scenario 3: Concurrent Alarms During Reactor Transient

**Reactor type:** Generic PWR.
**Primary paper topics:** Flooding (Report 2, Section 5.3), delivery modes, context divergence, turn-taking, Synthesiser and Monitor roles.
**Agent configuration:** Five agents, full Pattern 9.

### Operational Context

A turbine trip from full power. The reactor power cutback system initiates an automatic power reduction. Within 90 seconds, the following conditions develop simultaneously: RPS partial trip signals on two of four channels, pressurizer pressure rising with PORV cycling, pressurizer level rising on insurge, steam generator levels shrinking on the secondary side, feedwater control system in automatic increasing feedwater flow, condenser steam dump system actuating. The plant alarm system annunciates more than twenty alarms across multiple panels within two minutes.

This is not an emergency. It is a well-understood transient with automatic protection and control responses that, if they function correctly, will stabilise the plant without manual intervention. But the alarm volume overwhelms the operator's ability to process each alarm individually, and the operator's primary task is to verify that automatic systems are responding correctly and to identify any indications that they are not.

### Agent Configuration

Five agents share the room:

1. **Reactor Core Monitor.** Monitors neutron power, control rod position, in-core detector readings. Tools: plant data historian queries for nuclear instrumentation channels.
2. **Primary System Monitor.** Monitors RCS pressure, temperature, pressurizer level, RCP status. Tools: plant data historian queries for RCS instruments.
3. **Secondary System Monitor.** Monitors SG levels, feedwater flow, steam dump, main steam pressure. Tools: plant data historian queries for secondary system instruments.
4. **Alarm Synthesiser.** Reads all agent outputs and current alarm state. Produces a prioritised integrated assessment. Has privileged read access to all agent messages but does not monitor plant data directly.
5. **Coordination Monitor.** Observes team process: who has responded, how stale each agent's last data retrieval is, whether any agent appears to be in a loop or producing output that conflicts with another agent's output.

The human shift supervisor is the authority holder with room pause and mute controls.

### The Flooding Problem

All five agents are triggered by the transient. The Reactor Core Monitor detects the power reduction. The Primary System Monitor detects the pressure and level changes. The Secondary System Monitor detects the SG level shrink. The Alarm Synthesiser begins processing incoming alarm data. The Coordination Monitor observes the burst of activity.

Without delivery control, five responses arrive in the shared room within seconds. The shift supervisor, already processing a cascade of alarms from the plant alarm system, now receives five simultaneous agent assessments. This is the flooding problem from Report 2, Section 5.3, made concrete.

### Delivery Mode: Flow Gate

The room operates in flow-gate mode: agent responses are queued and delivered one at a time, with the next response released only after the previous one has been acknowledged or a configurable timeout elapses. Priority rules determine queue order: the Alarm Synthesiser's integrated assessment has highest priority (because it provides the most actionable overview), followed by agents reporting conditions outside expected automatic response, followed by agents confirming expected behaviour.

In this transient, the flow gate delivers:

1. The Synthesiser's initial assessment: "Turbine trip with automatic reactor power reduction. RPS partial trips on channels B and C, consistent with expected response. Pressurizer PORV cycling on pressure transient, expected. SG levels shrinking, feedwater increasing in automatic. All indications consistent with design-basis turbine trip response. No off-normal conditions identified."
2. The Primary System Monitor's detailed assessment (queued, delivered when the supervisor acknowledges or after timeout).
3. Other agents' assessments, delivered in sequence.

The shift supervisor receives one coherent overview first, then progressively more detailed assessments. Contrast with broadcast delivery, where all five arrive simultaneously and the supervisor must mentally integrate them under time pressure.

### Context Divergence

Ten minutes after the trip, the Reactor Core Monitor has retrieved and processed detailed neutron flux data showing the expected xenon transient developing. The Primary System Monitor's most recent data retrieval is 45 seconds old because it was processing a detailed pressurizer level analysis. The Secondary System Monitor has current data showing SG levels recovering.

These three agents now hold different Level 1 SA pictures of the plant. The Reactor Core Monitor has current nuclear data but is not tracking RCS pressure recovery. The Primary System Monitor has slightly stale data across the board but detailed pressurizer analysis. Each agent's context has diverged based on what it attended to and when it last queried its data sources.

The Coordination Monitor detects this divergence. It flags that the Primary System Monitor's last data retrieval was 45 seconds ago, and that the Reactor Core Monitor has not reported on RCS parameters since the initial assessment. This is the coordination monitoring function described in Report 2, Table 3: observing the team process, not the plant data.

### What This Scenario Illustrates

The flooding problem is not hypothetical. Any multi-agent system monitoring a dynamic process will encounter simultaneous triggering events. The delivery mode is the design choice that determines whether simultaneous agent output helps or harms the human operator. Flow gating trades response latency (agents must wait their turn) for cognitive manageability (the operator processes one assessment at a time).

Context divergence in this scenario arises not from context window limits but from temporal differences in data access. All agents have the same data historian available, but they query it at different times and for different parameters. After ten minutes of a transient, their views of the plant have diverged through normal operation, not through any failure. The Coordination Monitor role exists to make this divergence visible.

### Operator Cognitive Task

The shift supervisor hears the turbine trip alarm. Within seconds, multiple alarms annunciate across the panels. The supervisor's eyes go to the qualified safety displays: reactor power dropping, RCS pressure rising, pressurizer level rising. The AI advisory layer on the secondary display activates: the Synthesiser's first assessment appears through the flow gate. The supervisor faces a dual-task demand: maintain independent SA of the transient through the qualified displays while processing AI advisory output on the secondary display. Reading the AI assessment diverts visual attention from the safety displays; continuing to scan the safety displays means the AI assessment queues unread. The flow gate delivers one agent assessment at a time, but each competes for the cognitive resources the supervisor needs for independent monitoring. When the Primary System Monitor's assessment arrives next, the supervisor must integrate it with both the Synthesiser's overview and their own observations from the qualified displays. The cognitive workload at this point combines monitoring (visual-spatial), reading AI text (visual-verbal), and integrating information across sources (cognitive). Wickens' Multiple Resource Theory (Report 3, Section 5.5) predicts that the visual-verbal channel is the bottleneck.

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with tool access to all plant systems can produce a coherent integrated assessment of a well-understood design-basis transient like a turbine trip, and for this class of event the single agent's strength is integration without coordination overhead. The binding constraints are context budget under high data rates (a turbine trip generates rapid changes across multiple plant systems simultaneously, and the single agent cannot analyse all domains at full depth in one context window) and the inability to observe its own data staleness (a separate Coordination Monitor watching data retrieval timestamps provides a metacognitive function difficult to implement within a single agent's loop). The multi-agent architecture also makes gaps visible: if one of five agents has not reported, the Synthesiser reflects the absence, whereas a single agent's coverage gaps are invisible to the operator.

**Verdict.** For well-understood design-basis transients, a single tool-equipped agent is a viable and simpler alternative. The multi-agent architecture earns its overhead when the transient is complex enough that no single context window can hold the full analytical picture at adequate depth, when the information rate exceeds what one agent can process in real time, or when the consequences of a missed off-normal indication within the transient justify the cost of parallel monitoring. Each subsequent scenario discussion concludes with a verdict; Section 15 synthesises these into a decision framework. See Section 15 for the full comparison framework.

**Decision-type allocation.** This scenario spans multiple decision types simultaneously. Alarm prioritisation and threshold evaluation (Category 2) are better handled by the existing alarm management rule engine: sorting alarms by priority, suppressing consequential alarms, and identifying first-out causes are rule-based functions that plant alarm management systems already perform deterministically. The LLM contribution is Category 4 synthesis: integrating the alarm pattern with RCS transient behaviour, secondary system response, and rod position data to produce a coherent situational assessment that the alarm list alone does not provide. This scenario is also where the latency constraints are most binding (Report 1, Section 7.4a): the operator needs the synthesised assessment within seconds, and agent-parallel execution (Report 2, Section 5.2a) is the minimum viable execution model during a fast transient.


## 5. Scenario 4: Independent Safety Verification of Procedure Modification

**Reactor type:** Generic PWR.
**Primary paper topics:** Common-cause failure (Report 2, Section 7.4), model heterogeneity as safety requirement, KG guardrail enforcement (Report 1, Section 7), adversarial role, governance gate.
**Agent configuration:** Four agents, Pattern 9 with model heterogeneity.

### Operational Context

A proposed revision to an Abnormal Operating Procedure (AOP) for responding to a small primary-to-secondary leak in a steam generator tube. The revision changes the threshold for initiating a controlled shutdown from the current value (based on a percentage of Tech Spec leakrate limits) to a new value (based on a leakrate trend calculation). The engineering analysis supporting the change argues that the trend-based criterion provides earlier detection of accelerating leaks while reducing unnecessary shutdowns from stable, low-level leakage.

Under 10 CFR 50.59, this revision requires screening: does the change alter a method of evaluation, reduce a margin of safety, or create a possibility for a malfunction of a different type than previously evaluated? The screening requires independent technical review.

### Agent Configuration

1. **Procedure Author Agent.** Presents the proposed revision and its technical basis. Has access to the engineering analysis, historical leakrate data, and the current procedure. Runs on Model X.
2. **Independent Safety Reviewer Agent.** Evaluates the proposed revision against safety criteria. Has access only to the proposed revision and relevant safety analysis documents; does not have access to the author's reasoning or the engineering analysis supporting the change. Runs on Model Y (a different base model).
3. **Regulatory Compliance Agent (Domain Expert).** Has access to a knowledge graph encoding Technical Specifications, FSAR Chapter 15 accident analyses for steam generator tube rupture, and NRC Generic Letters and Regulatory Guides relevant to SG tube integrity. Runs on Model X with KG guardrail enforcement.
4. **Human Reviewer.** Nuclear Safety Committee member serving as approver with governance gate authority.

The Independent Safety Reviewer runs on a different base model than the Procedure Author. This is a deliberate design choice grounded in the epistemic independence argument: same-model review shares systematic calibration biases with the original analysis and cannot be considered independent.

### The Review Process

The Procedure Author posts the proposed revision to the shared room with a structured summary: the current threshold, the proposed threshold, the technical basis (trend-based detection provides earlier warning of accelerating leaks), and the affected procedure sections.

The Independent Safety Reviewer, seeing only the proposal (not the supporting engineering analysis), evaluates it against its own understanding. The reviewer identifies a concern: the trend-based criterion requires a minimum observation window to establish a trend, during which leakrate could increase. If the initial leakrate is already close to the Tech Spec limit, the observation window for trend establishment could result in exceeding the limit before the trend calculation triggers a shutdown. The reviewer asks: "What is the minimum observation window for the trend calculation, and what is the maximum leakrate during that window for the worst-case initial condition?"

This challenge is the adversarial function in action. The reviewer's concern arises from its own analysis of the proposal, not from any knowledge of the author's reasoning or the arguments the author considered and dismissed. If the author's model shares a systematic tendency to underweight "worst-case initial condition" scenarios (a plausible calibration gap in training data that emphasises typical rather than bounding conditions), the reviewer on a different model may not share that gap.

### KG Guardrail Enforcement

The Regulatory Compliance Agent evaluates the proposed revision against its knowledge graph. The KG encodes, among other things, the Tech Spec LCO for primary-to-secondary leakrate, the associated Action Statement and Completion Time, and the FSAR Chapter 15 analysis assumptions for the steam generator tube rupture event.

The agent identifies that the FSAR analysis assumes a specific operator action time following detection of a tube rupture that exceeds a threshold. If the proposed trend-based criterion could delay detection relative to the assumed action time, the change could affect the validity of the FSAR analysis.

The KG guardrail function operates here in its most direct form: the agent attempts to assert that the proposed revision is "consistent with the licensing basis." The KG check compares the revision's detection time characteristics against the FSAR-assumed operator action time. If the worst-case detection delay under the trend-based criterion exceeds the FSAR assumption, the guardrail prevents the "consistent" assertion from entering the shared room. Instead, the agent posts: "Unable to confirm consistency with the licensing basis. The trend-based detection criterion has a worst-case observation window of [N] minutes, which exceeds the FSAR-assumed operator action time of [M] minutes for SGTR events."

This is not the agent choosing to be cautious. The KG constraint blocks the assertion based on the relationship between the proposed change and the verified domain knowledge, not on the agent's judgement. A caveat: the guardrail mechanism depends on natural language processing to extract assertions from the agent's output and match them against the knowledge graph. Entity extraction, relationship identification, and KG matching are probabilistic processes. The guardrail reduces the probability of inconsistent assertions entering the shared space; it does not eliminate it. A safety analysis relying on KG guardrails must account for the guardrail's own failure rate, including false negatives (inconsistent assertions that pass the check) and false positives (valid assertions that the guardrail incorrectly blocks because the KG is incomplete or the extraction is imprecise).

### Governance Gate

The human reviewer sees all three agent assessments: the author's proposal, the independent reviewer's concern about worst-case initial conditions, and the regulatory compliance agent's finding about FSAR consistency. The governance gate is clear: this revision requires a 50.59 evaluation (not merely a screening) before it can be approved, because it could affect assumptions in a Chapter 15 analysis.

The human does not approve or reject based on agent recommendations alone. The agents have surfaced specific, verifiable technical questions that the human reviewer can evaluate with full engineering judgement. The governance gate ensures that the decision remains human; the agents ensure that the decision is informed.

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with KG-backed tools can perform the regulatory compliance function effectively, retrieving the relevant FSAR analysis and flagging the detection-time inconsistency against the assumed operator action time. However, it cannot provide the structural independence that the regulatory framework demands for safety review. A single agent reviewing a proposal it has also read in full, along with the author's rationale, cannot claim independent review: its assessment is conditioned on the author's reasoning through unified attention. The NRC framework is explicit on this point, and Report 2, Section 7 demonstrates that this separation cannot be achieved within a single model and context. Model heterogeneity adds a further dimension, since even two separate agents on the same base model share systematic calibration biases that a different base model for the reviewer would mitigate.

**Verdict.** Multi-agent with model heterogeneity is required. This is the clearest case in this report. The requirement is not driven by analytical quality (a single agent might produce an equally competent review) but by the structural independence that the regulatory framework demands and that Report 2's epistemic analysis shows cannot be achieved within a single model and context. The KG guardrail function can be implemented at the tool level and does not require a separate agent, but the independent review function does.


## 6. Scenario 5: Loss of Coolant Accident, Emergency Response

**Reactor type:** Generic PWR.
**Primary paper topics:** Full Pattern 9, all functional roles (Report 2, Table 3), human authority, pattern escalation, authority transfer, projection agent with simulation coupling, SA Bridge under time pressure, out-of-the-loop problem.
**Agent configuration:** Seven agents, full Pattern 9 with model heterogeneity.

### Operational Context

A small-break LOCA. The first indication is a step decrease in pressurizer level accompanied by rising containment pressure and a containment sump level increase. RPS trips the reactor on low pressurizer pressure. ECCS actuates on the safety injection signal. The control room enters EOP-E0 (Reactor Trip or Safety Injection).

This scenario develops in three phases: initial response (first 15 minutes), stabilisation (15-60 minutes), and long-term cooling establishment. Each phase has different agent coordination requirements and human authority dynamics.

### Pattern Escalation: From Pattern 7 to Pattern 9

Before the LOCA, the plant was operating normally with Pattern 7 monitoring agents (as in Scenario 1). The reactor trip and safety injection actuation trigger an automatic escalation to Pattern 9: additional agents are activated, a shared conversation room is established, and the full delivery mode and turn-taking infrastructure becomes active.

The escalation itself creates an SA challenge. The pre-existing Pattern 7 monitoring agent has been tracking plant conditions for hours and has accumulated episodic memory of the pre-event state. The newly activated agents start with empty session context and must build their SA from the current plant state plus whatever the monitoring agent can transfer to the shared room. This is the late-joiner problem from Report 2, Section 5.3's quantitative illustration, made concrete: agents joining mid-event have structurally different (and shallower) SA than agents that were present throughout.

The monitoring agent's first contribution to the shared room is a structured status transfer: pre-event plant conditions, the sequence of trip signals, and the timeline of automatic actuations. This is the "shift handover" equivalent for agent-to-agent SA transfer.

### Agent Configuration

1. **Reactor Core Safety Agent.** Monitors core exit thermocouples, subcooling margin, and reactor vessel level indication. Coupled to a RELAP5 simulation tool for forward projection. Runs on Model X.
2. **ECCS Performance Monitor.** Monitors safety injection flow, accumulator status, RHR system alignment. Verifies that ECCS is delivering design-basis flow. Runs on Model X.
3. **Containment Integrity Monitor.** Monitors containment pressure, temperature, hydrogen concentration, containment isolation status. Runs on Model Y.
4. **Adversarial / Devil's Advocate Agent.** Challenges consensus assessments. Restricted information access: sees only posted conclusions, not the reasoning behind them. Runs on Model Z (a third base model, different from both X and Y).
5. **Synthesiser.** Aggregates across all agent outputs. Produces integrated plant status and tracks EOP progression. Runs on Model X.
6. **SA Bridge Agent.** Translates between agent technical communication and operator-usable displays, adapting format to emergency display mode. Runs on Model X.
7. **Coordination Monitor.** Observes team coordination process, flags staleness, and manages delivery mode.

Human participants: Shift Supervisor (initial authority holder), Reactor Operator, Balance-of-Plant Operator. The Emergency Director arrives at approximately T+30 minutes.

### Phase 1: Initial Response (0-15 minutes)

The delivery mode is set to flow-gate with high priority for the Synthesiser. The room produces outputs in this order:

The Synthesiser's initial integrated assessment: Plant status post-trip, ECCS actuated, containment pressure rising, EOP-E0 entry conditions met. This reaches the operators first.

The Reactor Core Safety Agent reports: subcooling margin at the current value and trending. For initial projections under time pressure, the agent queries a pre-computed scenario library and fast-running reduced-order thermal-hydraulic surrogates rather than invoking a full-scope RELAP5 run. The surrogate returns a projection: "At current depressurisation rate, core exit saturation will be reached in approximately 45 minutes if no operator action is taken to establish stable injection flow." Full-scope RELAP5 runs are reserved for Phase 3 (simulation-supported projection), when the event has stabilised and computation time is available. A validation caveat applies to surrogate use: reduced-order surrogates are trained or calibrated against the full-scope code for a defined envelope of conditions, and their accuracy degrades for scenarios outside that envelope. The surrogate projection should be treated as indicative rather than bounding unless accompanied by a statement of validated applicability.

This is Level 3 SA, projection, generated not by the LLM's parametric reasoning but by a physics-based simulation code (or its reduced-order surrogate). The projection has a basis in validated thermal-hydraulic models, not in token-sequence probability. The distinction matters: the LLM's contribution is framing the question and interpreting the result; the simulation tool provides the physics.

The Adversarial Agent, seeing the Synthesiser's assessment that ECCS is responding as designed, challenges: "Confirm that all four SI accumulator discharge valves are open. In the TMI-2 event, operators manually throttled high-pressure injection, reducing ECCS flow below design-basis rates. The current assessment assumes full ECCS flow; verify the assumption."

This challenge is generated by an agent on a different base model, with restricted information access (it sees the Synthesiser's conclusion but not the underlying data). The challenge may be unnecessary if the ECCS Performance Monitor has already verified valve positions. But it surfaces a specific, verifiable check that the operators can confirm, and it introduces a historical precedent that enriches the team's situational model.

### Phase 2: Authority Transfer (T+30 minutes)

The Emergency Director arrives, having been called in from off-site. The Emergency Director has strategic authority over the emergency response but has not been present during the first 30 minutes. The Director's Level 1 SA of the current plant state is minimal.

The SA Bridge agent generates a structured briefing package for the Emergency Director: current plant status, key parameters, EOP progression to date, agent team assessments, and any unresolved disagreements. The briefing adapts to the Director's role: high-level status, decision points ahead, and items requiring the Director's authority. The detailed technical data that the Shift Supervisor has been working with is available but not foregrounded.

The authority transfer is the out-of-the-loop problem from Report 2, Section 6.2 in its most consequential form. The Emergency Director must exercise authority over a situation they have not been immersed in. The quality of the SA Bridge's briefing directly determines whether the Director can make informed decisions or is operating on insufficient understanding. If the briefing is inadequate, the Director either makes poorly informed decisions (dangerous) or defers entirely to the Shift Supervisor (undermining the emergency response authority structure).

The Shift Supervisor does not lose SA at the moment of authority transfer, but does lose decision authority for strategic choices. The Supervisor retains tactical authority for immediate operator actions. This dual-authority structure is standard in nuclear emergency response and maps directly onto Report 2's analysis of multiple simultaneous human roles (Report 2, Section 6.1): the Supervisor is simultaneously a domain expert (deepest SA) and a subordinate (reduced authority) while the Director is an authority holder (strategic decisions) and an SA-deficient newcomer (minimal Level 1 SA).

### Phase 3: Simulation-Supported Projection

Two hours into the event, conditions have stabilised but the plant has not reached a recognised long-term cooling configuration. The Reactor Core Safety Agent runs a series of RELAP5 projections exploring different recovery paths: what happens if the operators transition to hot leg recirculation at the current time versus waiting another hour? What are the consequences if RHR pump B, which has shown intermittent flow oscillations, fails during the transition?

These projections support Level 3 SA for the shift supervisor and Emergency Director. They are not predictions; they are conditional forward analyses. The agent frames each projection with its assumptions, and the SA Bridge formats them as decision support: "Transition to hot leg recirculation now: projected stable in 90 minutes. Delay one hour: projected stable in 75 minutes but with a 40-minute window of reduced margin during the delay. RHR-B failure during transition: margin remains positive with RHR-A alone, but with reduced margin."

The distinction between the simulation tool's output (physics-based projection) and the LLM's contribution (framing, interpretation, communication) is maintained in the display. The operator sees both the simulation result and the agent's interpretation, and can evaluate them independently.

### Display Under Emergency Conditions

The SA Bridge agent switches to emergency display mode. The overview display shows:

![](figures/fig4-emergency-display.png)

*Figure 2: Emergency display during a small-break LOCA at T+45 minutes. Critical parameters (red) with trend indicators, ECCS status (green) for immediate verification, RELAP5-based projection (blue) with stated basis, agent team status showing model diversity, and an unresolved item flagged by the adversarial agent (yellow banner).*

The display is structured for rapid scanning: critical parameters on the left with trend indicators, ECCS status for immediate verification, the simulation-based projection with its basis stated, and unresolved items flagged at the bottom. Text narration is minimal. The operator's qualified safety displays (SPDS) remain active and visually separate.

### Operator Cognitive Task

The shift supervisor hears the reactor trip and sees the low-pressurizer-pressure alarm. Within 30 seconds, the escalation from Pattern 7 to Pattern 9 activates: the full seven-agent Pattern 9 team activates. The supervisor's display shifts from one agent's ambient monitoring output to a full multi-agent advisory panel. This is a major mode transition during the most stressful phase of the event (Report 3, Section 5.6 on mode awareness). The supervisor must reorient to the new display configuration while simultaneously entering EOP-E0 and verifying ECCS actuation on the qualified SPDS. The Synthesiser provides an initial integrated assessment; the supervisor reads it, cross-checks against the qualified safety parameter display, and either accepts or questions the assessment. At T+3 minutes, the adversarial agent posts a challenge about ECCS valve positions. The supervisor must now evaluate whether this challenge is substantive (a real concern about equipment configuration) or procedural (a routine verification already addressed by the EOP steps). This evaluation demands deep plant knowledge exercised under time pressure, illustrating the cognitive task transformation described in Report 3, Section 5.4: the operator is not diagnosing from raw data but evaluating AI-generated hypotheses against their own plant expertise. At T+30 minutes, the Emergency Director arrives and the SA Bridge must produce a role-appropriate briefing. The supervisor's cognitive task shifts from direct management to reporting: they must summarise 30 minutes of complex multi-agent interaction for someone who was not present, while maintaining their own SA of the still-evolving event.

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with tool access to all plant data systems, the RELAP5 simulation interface, the EOP database, and the alarm system could in principle perform every function that the seven-agent team performs if context budget were unlimited and inference were instantaneous. For the initial assessment (what happened, is ECCS responding, is containment intact), a single capable agent would produce a competent report. However, the LOCA scenario exposes four structural limitations that no single agent can overcome. First, temporal parallelism: during a LOCA, conditions across multiple plant systems evolve simultaneously, and sequential tool queries produce a mix of timestamps rather than a coherent snapshot. Second, the adversarial function: Report 2, Section 7.3 shows that intrinsic self-correction does not reliably improve reasoning, whereas a separate adversarial agent on a different base model provides extrinsic critique. Third, the SA Bridge function under time pressure competes with analysis for context budget and generation time. Fourth, the authority transfer problem at T+30 minutes is better served by a dedicated SA Bridge agent that has been tracking from a communication-oriented perspective throughout.

**Verdict.** Multi-agent is justified for LOCA response. The combination of temporal parallelism, adversarial independence, parallel SA Bridge function, and graceful degradation outweighs the coordination overhead. A single agent cannot provide temporal parallelism (sequential inference is a hard constraint), cannot provide independent adversarial challenge (intrinsic self-correction is unreliable), and represents a single point of failure during an event where reliability matters most.

**Decision-type allocation.** The LOCA scenario exercises nearly the full decision-type spectrum simultaneously. Protection system actuation (Category 1) is handled by qualified I&C without AI involvement. ECCS performance verification against design parameters (Category 2/3) combines threshold checking (rule engine) with procedural compliance tracking (KG traversal). The core assessment, whether the event is a LOCA or something else, what the break characteristics are, and what the plant trajectory looks like, is Category 4/5 diagnostic reasoning under ambiguity, which is the primary LLM contribution. Pre-computed scenario libraries and fast surrogates (Category 2 statistical/simulation tools) handle Phase 1 projections where speed is critical; full-scope simulation coupling (Category 4/5) supports Phase 3 analysis when time pressure has eased. The hybrid pipeline operates differently in each phase: Phase 1 emphasises pre-computed results and fast rule-based checks; Phase 3 shifts to deeper LLM-mediated diagnostic reasoning with simulation support.


## 7. Scenario 6: Long-Term Fuel Integrity Monitoring

**Reactor type:** Generic SMR (single module focus, with implications for fleet monitoring).
**Primary paper topics:** KG and Graph-RAG (Report 1, Section 7), Context Graphs, environmental coupling (Report 2, Section 8.1), adaptive architectures (Report 2, Section 8.3), Domain Expert role, regulatory constraints on self-modification.
**Agent configuration:** Three agents, Pattern 9 with graph-structured knowledge.

### Operational Context

Fuel cladding integrity monitoring over an 18-month fuel cycle. The monitoring integrates data from multiple sources: in-core detector readings (power distribution), primary coolant chemistry (fission product activity indicating cladding defects), fuel inspection results from the most recent outage, fuel performance code predictions (FRAPCON/FRAPTRAN), and the fuel vendor's performance database. The goal is early detection of developing fuel integrity concerns, trending against predicted performance, and maintaining compliance with Tech Spec limits on primary coolant activity.

### Knowledge Graph Structure

The Domain Expert agent's knowledge base is a graph encoding the fuel performance domain:

Fuel assemblies connect to individual fuel rods, which connect to axial segments with burnup, power history, and cladding condition data. Each assembly is linked to its design specification (cladding material, enrichment, vendor), its operational history (cycles in core, peak linear heat rate history, duty factor), and its inspection results (visual, eddy current, ultrasonic). Tech Spec limits on primary coolant activity connect to required actions and completion times. FSAR Chapter 4 analyses define the design-basis fuel performance envelope.

The graph also encodes temporal relationships using the Context Graph quadruple structure (Xu et al., 2024): each data point carries provenance (which measurement, when, by whom), confidence (measurement uncertainty), and temporal validity (when the data point expires or requires re-verification). An inspection result from the most recent outage has high confidence but declining temporal validity as the fuel accumulates additional burnup and duty cycles.

### Agent Configuration

1. **Fuel Performance Domain Expert.** Has access to the fuel performance KG. Queries the graph to answer questions about specific assemblies, trending against predictions, and compliance with limits. KG guardrail enforcement prevents the agent from asserting fuel condition claims that contradict verified data in the graph. Runs on Model X.
2. **Predictive Analytics / Projection Agent.** Coupled to FRAPCON (steady-state fuel performance code) and FRAPTRAN (transient fuel performance code). Runs periodic forward projections based on current operating conditions: given the current power distribution and burnup state, what is the projected cladding condition at end of cycle? Where are the highest-duty fuel rods, and what margin do they have to design limits? Runs on Model X. A validation caveat applies: FRAPCON and FRAPTRAN projections are valid within the codes' assessed uncertainty bands for fuel designs and operating conditions within their qualification basis. For novel fuel types, extended burnup beyond the validated range, or operating conditions outside the codes' qualification envelope, projections should be flagged with reduced confidence and subjected to additional engineering review.
3. **Regulatory Compliance Agent.** Monitors primary coolant activity against Tech Spec limits and tracks the gap between measured activity and the action threshold. If the trending suggests that the action threshold may be approached before end of cycle, the agent flags the timeline. Runs on Model Y.

Human participant: Fuel Engineer, serving as domain expert peer and authority holder for fuel-related operational decisions.

### Monitoring Operation

During normal full-power operation, the agents operate on a slow heartbeat: the Domain Expert and Projection Agent run analyses every 12 hours, coinciding with chemistry sample schedules. The Regulatory Compliance Agent monitors continuously against stored limits.

At month 14 of the cycle, primary coolant iodine activity shows a slow upward trend. The values are well below the Tech Spec limit, but the rate of increase is inconsistent with the Projection Agent's FRAPCON predictions for the current core loading.

The Domain Expert queries the KG for assemblies with the highest duty in the current cycle. The graph returns five assemblies that have accumulated peak burnup above the 90th percentile for their design type. The agent cross-references these with the previous outage's inspection results (stored in the graph with provenance and confidence metadata) and with the current power distribution from in-core detectors. One assembly, located in a high-power region, shows a combination of high burnup, high duty factor, and a previous inspection result that noted minor surface indications on two rods, within acceptance criteria at the time of inspection but now 14 months older with additional burnup accumulation.

The Projection Agent runs a FRAPCON projection for this assembly using its actual power history from the plant data historian. The projection shows that two rods in the assembly are approaching the cladding strain criterion at current power levels. The projection includes uncertainty bounds derived from the code's validated uncertainty methodology.

The Regulatory Compliance Agent tracks the iodine activity trend against the Tech Spec action threshold and reports: "At the current rate of increase, the LCO action threshold will be reached in approximately 45 days. The Tech Spec required action is power reduction within 4 hours of exceeding the threshold."

### KG Guardrail in Operation

The Fuel Engineer asks the Domain Expert: "Is the current fuel condition acceptable for continued full-power operation through end of cycle?"

The agent formulates a response based on its KG queries and the Projection Agent's results. It attempts to assert: "Continued full-power operation is acceptable through end of cycle." The KG guardrail evaluates this assertion against the stored data: the Projection Agent's analysis shows two rods approaching the cladding strain criterion, and the iodine activity trend is moving toward the Tech Spec action level.

The guardrail does not allow the assertion. Instead, the agent posts: "Continued full-power operation through end of cycle cannot be confirmed. Two rods in Assembly [ID] are projected to approach the cladding strain criterion at current power levels (uncertainty band crosses the criterion at approximately 6 weeks). Primary coolant iodine activity is trending toward the LCO action level at approximately 45 days. Recommend core power distribution adjustment to reduce power on the affected assembly, or early end-of-cycle planning."

The guardrail did not make a judgement call. It prevented an assertion that was inconsistent with the verified data and projections in the knowledge graph. The agent's output is constrained by what the domain knowledge supports, not by what the agent's language model would otherwise generate.

### Adaptive Architecture: Post-Event Learning

Suppose that, later in the cycle, a different assembly develops a cladding defect that was not predicted by the monitoring system. Post-event review reveals that the monitoring agents had not been tracking a particular leading indicator (a specific ratio of fission product isotopes in the coolant chemistry that correlates with early-stage cladding degradation in high-burnup fuel).

The Fuel Engineer and the plant's nuclear safety committee review the event and determine that the monitoring agent's analytical framework should be updated to include this indicator. The proposed update involves:

- Adding the isotope ratio to the Domain Expert's KG as a monitored parameter with defined alert thresholds
- Updating the Domain Expert's soul prompt to include the isotope ratio in its routine surveillance queries
- Adding a new FRAPCON projection case that evaluates sensitivity to the corrosion mechanism associated with this indicator

Each of these changes affects the agent's behaviour. The soul prompt change alters the agent's persistent identity. The KG change alters the knowledge base against which guardrails are enforced. The question is: who authorises these changes, and does the modification require 50.59 screening?

The answer depends on whether the AI monitoring system is described in the FSAR as part of the plant's safety monitoring capability. If it is, then changes to the system's analytical framework may require 50.59 evaluation. If it operates as an engineering tool outside the licensing basis, the change process is less constrained but still requires documented engineering review.

This is the adaptive architecture problem from Report 2, Section 8.3 in its nuclear-specific form. The system can improve based on operational experience, but the improvement process must pass through a governance structure that is proportionate to the system's role in plant safety. Autonomous adaptation, where the agent modifies its own monitoring thresholds without human review, is not acceptable in this domain. The governance gate applies to the adaptation process itself.

### Discussion: Single-Agent vs Multi-Agent

For routine fuel integrity monitoring, a single agent with KG-backed tools can query the fuel performance graph, run FRAPCON projections, check against Tech Spec limits, and produce one coherent report, avoiding the coordination overhead of three agents producing assessments that the fuel engineer must integrate. The multi-agent value is narrower than in emergency scenarios: it rests on isolating the simulation coupling in a dedicated agent (so a failed FRAPCON run does not contaminate the broader monitoring context) and on running the regulatory compliance function on a different base model to mitigate shared calibration gaps.

**Verdict.** For routine fuel integrity monitoring at a single unit, a single well-configured agent with KG-backed tools and simulation coupling is sufficient and simpler. Multi-agent adds value primarily when: (a) independent compliance checking on a different model is desired, (b) the simulation coupling is complex enough to warrant isolation in a dedicated agent, or (c) the monitoring spans a fleet of SMR modules where cross-unit fuel performance correlation requires the kind of cross-unit pattern detection described in Scenario 8.


## 8. Scenario 7: Instrument Channel Failure

**Reactor type:** Generic PWR.
**Primary paper topics:** Context divergence under degraded data, SA Level 1 failure, intra-room epistemic asymmetry from threading (Report 2, Section 5.3), attentional tunnelling, structured artefact exchange (Report 2, Section 8.2), human role shift.
**Agent configuration:** Three agents, Pattern 9.

### Operational Context

A reactor protection system instrument channel fails. Specifically, one of four pressurizer pressure transmitters drifts low over a period of approximately 30 minutes, eventually reaching a value that causes a partial trip (bistable trip) on that channel. The plant enters a Technical Specification action statement requiring the tripped channel to be placed in the tripped condition within a specified time, and the remaining channels to be verified operable.

The situation is not an emergency, but it is operationally significant: the plant is now operating with reduced RPS redundancy on pressurizer pressure, and the operators must determine whether the channel failure is isolated (a single transmitter malfunction) or indicative of a broader instrumentation problem (common-mode failure of the pressure sensing system).

### Agent Configuration

1. **Instrument Diagnostics Agent.** Deep-dives into the failed channel: analyses the drift pattern, cross-references with the transmitter's maintenance history, evaluates whether the drift signature matches known failure modes (reference leg leak, transmitter electronics failure, sensing line blockage). Runs on Model X.
2. **Redundancy Assessment Agent.** Evaluates the remaining three pressurizer pressure channels: are they consistent with each other and with independent pressure indications (e.g., RCS wide-range pressure, pressurizer level as an indirect indicator)? Runs on Model Y.
3. **Plant-Wide Monitor.** Maintains broad SA of overall plant conditions while the other two agents focus on the instrument failure. Watches for any indications that the pressure anomaly is a symptom of a real process change rather than an instrument failure. Runs on Model X.

Human participant: I&C Engineer, called to the control room as domain expert. Shift Supervisor retains authority.

### Threading and Epistemic Asymmetry

The Instrument Diagnostics Agent opens a diagnostic thread in the shared room, focused on the failed channel. Over the next 20 minutes, the agent performs a detailed analysis: it retrieves the transmitter's calibration history from the I&C maintenance database, compares the drift rate to historical drift data for the same transmitter model, and evaluates the drift signature against a library of known failure modes. The thread grows to contain 15 messages with detailed technical analysis.

During this same period, the Plant-Wide Monitor detects a subtle change in RCS wide-range pressure that does not appear in the pressurizer pressure channels. The change is small, within normal fluctuation, but the Monitor notes it because of the temporal coincidence with the instrument channel failure.

The Instrument Diagnostics Agent, deep in its diagnostic thread, has consumed most of its context budget on the detailed channel analysis. It has not fully processed the Plant-Wide Monitor's observation about the wide-range pressure indication. The wide-range pressure note appeared in the main room, not in the diagnostic thread, and the Diagnostics Agent's context allocation prioritised the thread.

This is the attentional tunnelling phenomenon described in Report 2, Section 5.3: an agent engaged in detailed Level 2 SA work within a thread loses Level 1 SA of the broader room. The agent is doing good work within its thread, but its awareness of conditions outside the thread has degraded.

The Redundancy Assessment Agent, which has not been engaged in the detailed diagnostic thread, has full awareness of the Plant-Wide Monitor's observation. It integrates the wide-range pressure note with its own assessment of the remaining pressurizer pressure channels and posts to the main room: "The three remaining pressurizer pressure channels are consistent with each other but show a slight systematic offset from the wide-range pressure indication that was not present 30 minutes ago. This is consistent with either (a) a reference leg problem affecting the shared sensing line to the pressurizer (common-mode, affecting all four narrow-range transmitters) or (b) a real but small process pressure change that the wide-range instrument is detecting with a different time constant. The failed channel's drift may be a more severe manifestation of the same common-mode cause."

This assessment changes the diagnostic picture. If the Diagnostics Agent had been the only agent investigating, and if it had been focused on single-channel failure modes within its thread, the common-mode hypothesis might not have been generated until much later.

### Structured Artefact Exchange

The Redundancy Assessment Agent's finding involves precise numerical data: the offset between the narrow-range and wide-range pressure readings, with specific values, timestamps, and uncertainty bounds. If communicated as natural language ("I noticed a slight offset between the narrow-range and wide-range readings"), the precision is lost and the Diagnostics Agent must query the data itself to verify.

Instead, the agent posts a structured artefact: a typed data object containing the four narrow-range readings, the wide-range reading, the computed offset with uncertainty, and the timestamp. The Diagnostics Agent can read this artefact directly without parsing prose. The I&C Engineer can see the same artefact on their workstation display as a formatted data table with clear units and uncertainty bounds.

This is the structured inter-agent communication concept from Report 2, Section 8.2. Natural language is the default medium of the shared room, but for precise operational data, typed artefacts preserve accuracy and reduce the token overhead of encoding and decoding numerical information through prose.

### Operator Cognitive Task

The reactor operator notices the unexpected partial trip. Their cognitive task splits immediately: track the diagnostic agent's analysis in the advisory display thread while monitoring the remaining three RPS channels on the qualified safety displays to confirm they are unaffected. This is the dual-task demand that Wickens' MRT predicts will stress the visual channel. When the Redundancy Assessment Agent posts its finding about the systematic offset between narrow-range and wide-range pressure, the operator must shift from a "single-channel failure" mental model to a "possible common-mode failure" mental model. This cognitive reframing, triggered by an agent's observation that the operator had not independently made, illustrates the evaluation task: the operator is not diagnosing from raw data but evaluating an AI-generated hypothesis against their own knowledge of the pressurizer pressure sensing system. The I&C Engineer's arrival adds a third information source (human domain expertise) that the operator must integrate with both the agent outputs and the qualified instrument readings. The cognitive workload peaks when three information streams (diagnostic agent thread, redundancy agent finding, engineer's reference leg hypothesis) converge and require integration into a coherent diagnostic picture.

### Human Role Shift

The I&C Engineer arrives in the control room with specialised knowledge about the pressurizer pressure sensing system: the specific reference leg configuration, recent maintenance activities on the sensing lines, and known vulnerabilities of this transmitter model. The Engineer enters the shared room as a domain expert peer, contributing information that no agent has in its training data or connected databases.

The Engineer posts: "The four narrow-range pressurizer pressure transmitters share a common reference leg to the reference leg heat tracing junction box on elevation 95'. If the heat tracing on that section has degraded, the reference leg temperature could be shifting, which would produce a slow common-mode drift in all four channels, with the channel closest to the junction box drifting fastest."

This contribution is outside any agent's knowledge base. It is plant-specific installation knowledge that exists in the Engineer's experience and possibly in as-built drawings that are not connected to the agent's data sources. The Engineer has shifted from a supervisory role (monitoring agent work) to an active domain expert role, contributing information that changes the diagnostic direction.

The Shift Supervisor, seeing the convergence of the Redundancy Assessment Agent's common-mode hypothesis and the Engineer's reference-leg explanation, decides to dispatch a field operator to inspect the reference leg heat tracing. This is the human authority function: the supervisor integrates agent analysis and human expertise, makes a decision, and directs physical action. No agent can dispatch a field operator.

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with tool access to all instrument data and the I&C maintenance database can perform the diagnostic analysis competently for a well-characterised, isolated single-channel failure. The structural limitation this scenario exposes is attentional tunnelling: a single agent engaged in detailed diagnostics of the failed channel faces a direct tradeoff between going deep on the failed channel and maintaining broad awareness of overall plant conditions, and cannot do both at full depth in a single context window. In this scenario, the critical finding was not the diagnosis of the failed channel but the detection of the systematic offset between narrow-range and wide-range readings, which came from the Redundancy Assessment Agent precisely because it was not deep in the diagnostic thread and had context budget available for the broader comparison.

**Verdict.** Multi-agent is justified for this scenario. The attentional tunnelling problem is structural: a single agent cannot simultaneously go deep and stay broad. The three-agent architecture provides depth, breadth, and plant-wide awareness in parallel. The cost is coordination overhead, but the scenario is not time-critical (the plant is stable, operating within Tech Spec action times), so the overhead is tolerable. The key risk that multi-agent mitigates, a missed common-mode condition, is more consequential than the coordination risk that multi-agent introduces.

**Decision-type allocation.** Instrument channel cross-validation against redundant channels (Category 2) is fundamentally a comparison operation: are the readings from redundant channels consistent within expected tolerances? This is a rule-engine task, and existing plant computer systems already perform it. The LLM contribution is in two areas: diagnostic reasoning about the cause of the discrepancy (Category 4, integrating maintenance history, environmental conditions, and instrument characteristics) and the broader cross-system pattern recognition that identified the common-mode hypothesis (Category 5, synthesising weak signals across multiple instrument types). The latter is the critical finding in this scenario, and it illustrates a case where the LLM's ability to reason across heterogeneous data sources produces an insight that neither a rule engine nor a statistical method would generate, because the common-mode pattern was not a pre-specified detection target.


## 9. Scenario 8: Multi-Unit SMR Monitoring

**Reactor type:** Generic SMR, four modules, shared control room.
**Primary paper topics:** Context divergence across units, SA scaling, cross-unit common-cause detection, agent architecture for multi-unit operations, Pattern 9 scaling.
**Agent configuration:** Nine agents (four per-unit monitors, four cross-unit specialists, one coordination monitor), Pattern 9.

### Operational Context

A four-module SMR plant in normal full-power operation. All four modules are operating at rated power with no abnormal conditions. The control room has three operators: one senior reactor operator responsible for all four units, one reactor operator monitoring Modules 1 and 2, and one monitoring Modules 3 and 4. Staffing is lower than a traditional single-unit PWR because the SMR design relies on passive safety systems and increased automation.

The scenario explores a design question that has no counterpart in single-unit plants: how should a multi-agent monitoring architecture be structured when multiple identical units share a control room and operating staff?

### Architecture Design Choice: Per-Unit vs Cross-Unit Agents

Two architectures are considered:

**Architecture A: Per-unit agents only.** Each module has its own dedicated monitoring agent team (as in Scenario 1, but expanded to full Pattern 9). Four independent Pattern 9 rooms, one per module. Agents within each room share a conversation space but have no visibility into other modules' rooms.

**Architecture B: Per-unit agents with cross-unit specialists.** Each module has a dedicated monitoring agent, but additional agents span all four modules with specific cross-unit functions.

Architecture A maximises per-unit SA depth. Each agent team can devote its full context budget to its module's conditions. But it cannot detect cross-unit patterns: if all four modules develop a gradual drift in the same parameter, no agent sees it because each agent sees only its own module's data.

Architecture B sacrifices some per-unit context budget (the cross-unit agents consume shared room capacity) but gains the ability to detect fleet-wide patterns. This is a direct instance of the context budget allocation problem from Report 2, Section 2: how should bounded attention resources be distributed between depth (per-unit SA) and breadth (cross-unit awareness)?

### Agent Configuration (Architecture B)

**Per-unit agents (4):**
Each module has one dedicated monitoring agent with tools coupled to that module's plant data historian. The agent maintains continuous Level 1 SA of its module's parameters and flags deviations from expected behaviour. Each agent's soul prompt is identical except for the module designation.

**Cross-unit specialists (4):**

1. **Cross-Unit Pattern Detection Agent.** Reads all four per-unit agents' outputs. Looks for correlations: are multiple units showing the same parameter trend? Is a deviation in one unit's chemistry signature appearing in another unit? This agent addresses the common-cause detection gap that per-unit-only architectures cannot fill. Runs on Model Y (different from the per-unit agents on Model X) to provide some epistemic independence in the pattern detection function.

2. **Shared Systems Monitor.** Monitors systems that serve multiple modules: shared cooling water systems, common electrical buses, shared waste processing. A failure in a shared system affects all connected modules simultaneously.

3. **Unit Confusion Prevention Agent.** A specialised Monitor/Metacognitive agent that watches the conversation room for indications that an operator or agent may be confusing data from one unit with another. In a four-unit control room, unit confusion is a recognised human factors risk. The agent flags any assessment that references a parameter value inconsistent with the specified unit's data.

4. **Multi-Unit Synthesiser.** Produces a plant-level summary across all four modules: which units are in normal operation, which have any open items, and what the overall plant risk profile looks like.

**Coordination Monitor (1):**
Monitors the team coordination process across the expanded agent team. Tracks staleness for all nine agents, flags context divergence, and manages delivery modes.

### Cross-Unit Common-Cause Scenario

Three weeks into the monitoring period, Module 3's per-unit agent flags a gradual increase in primary coolant lithium concentration. The increase is small, within specifications, and the agent assesses it as consistent with normal chemistry evolution. Module 1's agent flags a similar trend two days later, also within specifications, also assessed as normal.

The Cross-Unit Pattern Detection Agent, reading both per-unit agents' outputs, identifies the correlation: two of four identical modules are showing the same unexpected chemistry trend. It posts to the shared room: "Modules 1 and 3 are both showing lithium concentration increases above the expected chemistry model trajectory. Rate and magnitude are similar. Modules 2 and 4 are not showing this trend. Possible common-cause: shared demineralised water supply, shared chemical addition system, or coincidental independent causes. The probability of two independent identical deviations occurring within 48 hours is low for random equipment variance."

This observation could not have been generated by per-unit agents. Each per-unit agent correctly assessed its own module's trend as within specifications. The cross-unit significance exists only at the fleet level.

The senior reactor operator, seeing this correlation, directs investigation of the shared chemical addition system. This is an early detection of a potential common-cause condition that, if it progressed, could affect all four modules. Early detection in one or two modules, before it manifests in the others, allows corrective action before a fleet-wide problem develops.

### Context Budget Challenge

Nine agents in a single shared room produce a significant information volume. The quantitative illustration from Report 2, Section 5.3 applies with amplified force: nine agents at 300 tokens per response and 45-second intervals generate approximately 5,400 tokens per minute. A 128,000-token context window fills in under 23 minutes of full room activity.

In practice, not all agents are active continuously. The per-unit agents report on their regular heartbeat cycles, and the cross-unit specialists activate primarily when patterns are detected. But during an event affecting multiple units, all nine agents may be active simultaneously, and the context budget becomes the binding constraint.

The architecture addresses this through tiered delivery modes: per-unit agent outputs are delivered primarily to the per-unit conversation thread for that module. Cross-unit specialist outputs go to the main room. The Synthesiser produces periodic integrated summaries that compress per-unit detail into fleet-level status. This tiered structure trades some per-unit detail visibility in the main room for manageable information volume, with full detail available in per-unit threads on demand.

### Unit Confusion Prevention

During a Module 2 transient (a feedwater control upset, similar to the event mentioned in Scenario 1), the reactor operator monitoring Modules 1 and 2 receives outputs from both modules' agents simultaneously. The Module 2 agent reports the feedwater transient. The Module 1 agent reports normal conditions.

The Unit Confusion Prevention Agent monitors the operator's interactions with the system. If the operator queries "What is the current SG level?" without specifying a module, the agent intercepts: "Please specify module number. Module 1 SG levels are normal. Module 2 SG level is in a post-transient recovery condition. Responding with the wrong module's data could lead to inappropriate operator action."

This is a human factors protection function specific to multi-unit control rooms. The agent does not prevent the operator from acting; it ensures that the operator's query is directed at the correct unit's data before providing a response.

### What This Scenario Illustrates

Multi-unit SMR operations multiply the SA challenge in ways that single-unit analysis does not capture. The context budget problem scales with the number of units. Cross-unit common-cause detection requires agents with fleet-level visibility that per-unit architectures cannot provide. Unit confusion is a human factors risk that demands specific agent-level mitigation. The architecture design choice between per-unit depth and cross-unit breadth cannot be resolved in general; it depends on the operational context and the relative risk of per-unit SA gaps versus cross-unit blindness.

### Discussion: Single-Agent vs Multi-Agent

A single frontier-class LLM with tool access to all four modules' plant data historians has a structural advantage for cross-unit pattern detection: holding all four modules in one context, it can compare parameters across units on every heartbeat cycle without requiring a dedicated Cross-Unit Pattern Detection Agent, and it may handle unit confusion prevention better by disambiguating queries based on its full four-module context. The binding constraint is context budget at scale: during abnormal conditions on any module, the single agent must split context between detailed transient analysis for the affected module and routine monitoring for three others, and sequential querying of modules produces a less temporally coherent cross-unit picture than parallel per-unit agents.

**Verdict.** The answer depends on operational state. During steady-state normal operations, a single tool-equipped agent is a serious competitor: it provides cross-unit pattern detection naturally, avoids coordination overhead, and the data volume is manageable. During abnormal or emergency conditions on any module, multi-agent becomes justified because the context budget required for detailed analysis of one module while maintaining surveillance of three others exceeds what a single agent can sustain. A hybrid architecture is worth considering: a single cross-unit monitoring agent during normal operations, with per-unit agents activated on demand when conditions on a specific module require detailed analysis.


## 10. Scenario 9: Compound Event with Ambiguous Indications

**Reactor type:** Generic PWR.
**Pattern:** Pattern 9 with model diversity.
**Primary concepts:** AI failure under novel conditions, operator override of AI, limits of pattern matching, skill maintenance justification.

### Operational Context

During a planned power reduction for maintenance, an unexpected combination develops: a stuck-open pressurizer safety valve coincides with a loss of one vital electrical bus. This produces a plant state that does not match any standard event in the AI system's training data or knowledge graph. Neither the stuck-open valve nor the vital bus loss is individually beyond the plant's design basis; both are analysed in the FSAR. Their simultaneous occurrence, however, creates an ambiguous indication set that falls outside the AI's pattern library. The depressurisation from the stuck valve and the partial electrical power loss create ambiguous indications: some suggest a small LOCA (the closest match in the AI's pattern library), while others suggest an electrical transient with secondary effects that the AI does not prioritise.

### AI Behaviour

Both AI agents (on different base models) converge on a LOCA diagnosis because LOCA is the nearest match in their respective training distributions. The adversarial agent does not challenge this diagnosis because both models share the same distributional tendency: when confronted with a novel condition, they match to the nearest familiar pattern. This is the monoculture collapse failure mode (Report 2, Section 7.4) in its most dangerous form: model diversity helps when models have different biases for known conditions, but when both models lack training on the actual condition, both err in the same direction.

The KG guardrail does not catch the error because the LOCA diagnosis is internally consistent with the depressurisation data. The guardrail checks whether the agent's assertions are consistent with the knowledge graph; a LOCA diagnosis given depressurisation data passes this check. The guardrail prevents factual errors against the knowledge base, not pattern-matching errors where the pattern match is plausible but incomplete.

### Operator Cognitive Task

The shift supervisor was present during the power reduction and has contextual knowledge that the AI does not: the maintenance activities in progress and the vital bus configuration. When the AI agents both recommend LOCA response procedures, the supervisor notices that the indications do not fully fit: the depressurisation rate is inconsistent with a typical small-break LOCA, and the electrical bus loss is producing secondary effects (loss of certain instrument channels, partial loss of control room lighting) that the LOCA diagnosis does not account for.

The supervisor's diagnostic reasoning draws on first-principles plant knowledge: the pressurizer safety valve was recently tested during the power reduction; a stuck-open valve would produce depressurisation consistent with the observed rate; the concurrent electrical fault explains the instrument anomalies that the AI attributed to LOCA-related containment effects. This hypothesis integrates all the indications in a way the AI's LOCA diagnosis does not.

The supervisor overrides the AI recommendation, initiates the appropriate AOP for the electrical transient while directing manual monitoring of the pressurizer safety valve status, and informs the shift team that the AI's LOCA assessment is incorrect.

### What This Scenario Illustrates

The limits of AI advisory for novel conditions. Both agents, even on different base models, converge on the same wrong answer because the actual condition is outside their training distribution. The adversarial agent fails because it challenges within the same solution space. The KG guardrail fails because the erroneous diagnosis is internally consistent with the data it can check. The only reliable resource is the human operator's independent reasoning, drawing on contextual knowledge and first-principles understanding that the AI does not possess.

This scenario justifies: (a) the skill maintenance programme in Report 3, Section 5.10, because the supervisor's ability to override the AI depends on diagnostic skills that AI-off training preserves; (b) the design principle that AI advisory must be additive, not substitutive, because the operator must retain the ability to diagnose independently; and (c) the architectural requirement that qualified safety displays remain the authoritative information source, because the AI's advisory display showed a confident but wrong assessment.

### Discussion: Single-Agent vs Multi-Agent

A single tool-equipped agent would make the same pattern-matching error. The multi-agent architecture with model diversity does not help for truly novel conditions where both models lack relevant training. For beyond-design-basis compound events, the architecture that matters is not the AI architecture but the human-AI architecture: the system must be designed so that the human can recognise AI failure and override it effectively, which requires maintained manual competency, transparent AI reasoning, and an unambiguous authority structure.

**Verdict.** Neither single-agent nor multi-agent provides reliable advisory for truly novel conditions. The binding constraint is the AI's training distribution, not its architecture. The value of the multi-agent architecture in this scenario is not in the agents' performance (both fail) but in the system's overall design: the display integrity principle ensures the operator has unmediated access to qualified data; the skill maintenance programme ensures the operator retains diagnostic capability; and the governance gate ensures the operator's override is effective.


## 11. Tool Architecture for Nuclear AI Advisory Systems

The nine scenarios collectively deploy a recurring set of tool categories. This section catalogues those tools, analyses their properties, and identifies cross-cutting concerns that apply regardless of the specific scenario.

### 11.1 Plant Data Interfaces

Read-only query interfaces to plant data historians, instrument channels, alarm databases, in-core detectors, and chemistry systems form the most common tool category, appearing in all nine scenarios.

**Read-only constraint.** No agent in any scenario actuates plant equipment, modifies setpoints, or executes control actions. This is an explicit architectural constraint, not a gap to be addressed in future work. The human operator remains the sole actuator of plant equipment. Every tool call to a plant data system is a query that returns information without altering plant state.

**Query frequency and context budget.** Query frequency determines the trade-off between data freshness and context consumption. S1 uses a 90-second heartbeat for steady-state monitoring across four SMR modules; S6 uses a 12-hour heartbeat for fuel cycle trending. Higher query frequency produces fresher data but consumes more of the agent's context window per reasoning cycle.

**Temporal coherence.** In S3 and S5, a single agent queries multiple plant systems in sequence. The first and last query results may describe the plant at different instants during a fast transient. If the agent queries RCS pressure, then containment pressure, then ECCS flow 30 seconds later, the three readings form an internally inconsistent snapshot. Multiple agents querying their respective systems in parallel (each agent querying its own domain system simultaneously) produce a more temporally coherent set of readings, provided the results are timestamped and the synthesiser accounts for any residual offsets.

**Data provenance.** Each query result should carry the instrument channel ID, calibration date, and measurement uncertainty. These metadata support the audit trail requirements identified in Report 3 and allow the operator to assess the quality of the underlying measurement, not just the AI's interpretation of it.

**Failure modes.** Report 1, Section 3.2 identifies three failure modes for tool calls that apply directly here: wrong query parameters (the agent requests data from the wrong instrument channel or time window), stale data from a missed refresh cycle, and wrong field extraction from structured results (the agent reads the wrong column from a historian return). Each of these can introduce errors that propagate through the agent's reasoning without any indication of tool malfunction.

**Scenario coverage:** S1 (per-module historians), S2 (RCS historian, in-core thermocouples), S3 (nuclear/RCS/secondary historians, alarm database), S5 (RCS/ECCS/containment historians), S6 (chemistry system data), S7 (pressure channels, wide-range level), S8 (per-unit historians, shared system data), S9 (all plant systems).

### 11.2 Knowledge Structures

Knowledge graphs, context graphs with provenance metadata, failure mode libraries, and regulatory document databases serve as the primary mechanism for grounding agent assertions against verified domain knowledge. S4 and S6 are the primary scenarios; S9 demonstrates a limitation.

**Guardrail function.** The knowledge graph checks agent assertions against stored domain relationships before delivery to the operator. In S4, the KG prevents the regulatory compliance agent from asserting that a procedure revision is "consistent with the licensing basis" when the FSAR-assumed operator action time would be exceeded by the proposed change. In S6, the KG blocks an assertion that continued full-power operation is acceptable when fuel performance projections show fuel rods approaching cladding strain criteria. In both cases, the KG intercepts a specific factual error that the agent's probabilistic reasoning produced.

**NLP extraction as the weak link.** The guardrail depends on extracting assertive content from the agent's natural-language output and matching it against KG relationships. This extraction step is itself a natural language processing task subject to error. Imprecise extraction produces false negatives (unsafe assertions pass the check because the extraction step failed to identify the assertive content) or false positives (valid assertions are blocked because the extraction mischaracterised them). The guardrail is a probabilistic filter, not a deterministic gate. Its reliability is bounded by the accuracy of the extraction step, which is separate from the reliability of the KG itself.

**Temporal validity.** S6 uses context graphs (Xu et al., 2024) with provenance metadata. Each data point carries its source, measurement timestamp, confidence level, and temporal validity window. Fuel inspection data from the last outage has high initial confidence but declining temporal validity as burnup accumulates through the cycle. The context graph tracks this decay, ensuring that the agent's reasoning accounts for how recently each piece of evidence was measured, not just what it showed.

**Completeness ceiling.** The guardrail cannot catch errors against knowledge not in the graph. S9 demonstrates this directly: the LOCA diagnosis passes the KG check because it is internally consistent with the stored failure-mode patterns. The actual condition (a stuck-open pressurizer safety valve combined with an electrical bus fault) is not represented in the KG as a distinct failure mode. The guardrail prevents factual errors against known relationships but cannot prevent plausible pattern-matching errors where the wrong diagnosis happens to be consistent with the stored patterns.

These failure modes connect directly to the KG grounding and guardrail failure mode analysis in Report 1, Sections 8.2 and 8.3.

### 11.3 Physics-Based Simulation Coupling

RELAP5 (thermal-hydraulic transient analysis), FRAPCON (steady-state fuel performance), and FRAPTRAN (transient fuel performance) provide the only tool category that supports Level 3 situation awareness: projection of future plant states. All other tools provide Level 1 data (current parameter values) or Level 2 analysis (comprehension of current conditions). Simulation coupling is what enables the system to answer "what will happen if current conditions persist" rather than "what is happening now." S5 and S6 are the primary scenarios.

**Responsibility separation.** The LLM frames the simulation query: it selects boundary conditions from the current plant state, decides what scenario to simulate, and specifies the simulation parameters. The physics code computes the thermal-hydraulic or fuel performance response. The LLM then interprets and communicates the result. The physics does not come from the LLM's parametric reasoning. S5 makes this explicit in its display architecture: RELAP5 projections are rendered in blue, visually distinct from the LLM's interpretive framing shown in the standard advisory format.

**Boundary condition risk.** The LLM selects what boundary conditions to pass to the simulation code. If the LLM mischaracterises the current plant state (due to hallucination, an incorrect tool call to the plant historian, or stale data from a missed refresh), the simulation runs with incorrect inputs and produces a valid-looking but wrong projection. The simulation output carries the authority of "physics-based code," but its input came from a probabilistic text generator. No established validation methodology exists for LLM-coupled simulation invocation. This is a distinct problem from V&V of the simulation code itself (which follows existing NRC guidance): the question is whether the invocation was correct, not whether the code is correct.

**RELAP5 surrogate validation caveat.** When reduced-order surrogates are used in place of full-scope RELAP5 runs (as in S5 Phase 1), the surrogate's accuracy depends on whether the current plant conditions fall within the envelope of scenarios against which the surrogate was trained or calibrated. Outside this envelope, surrogate predictions may diverge from full-scope results in ways that are not flagged by the surrogate itself. Deployment of surrogates for real-time advisory should be accompanied by automated envelope checks that flag when current conditions approach or exceed the surrogate's validated range, triggering a revert to full-scope computation or an explicit uncertainty warning.

**Temporal constraints.** RELAP5 transient runs can take minutes to hours depending on the modelled scenario duration and nodalization detail. FRAPCON steady-state fuel performance calculations are typically faster. This constrains when simulation coupling is practical. S5 addresses this explicitly: Phase 1 initial projections use pre-computed scenario library lookups and fast-running reduced-order thermal-hydraulic surrogates, while full-scope RELAP5 runs are reserved for Phase 3 when the event has stabilised and computation time is available. S6 operates on fuel cycle timescales where longer computation times are acceptable.

### 11.4 Documentation and Procedure Systems

FSAR chapters, Technical Specifications, emergency operating procedures, maintenance management systems, shift logs, I&C calibration history, and vendor performance databases appear in S1, S2, S4, S5, S6, and S7.

**Retrieval quality.** The agent queries a document store and retrieves relevant text, functioning as a retrieval-augmented generation (RAG) system. Two quality dimensions determine whether the retrieved information is correct. Retrieval quality: did the agent find the right procedure section, the right FSAR chapter, the right Tech Spec table? Extraction quality: did it extract the relevant clause, the correct numerical limit, the applicable condition? Failure in either dimension means the agent's citation may be wrong even when the underlying document is correct.

**Tool-access asymmetry as independence mechanism.** S2 and S4 deliberately restrict which agents can access which documentation. Agent B in S2 has access to the I&C maintenance log and calibration history that Agent A cannot query. The Independent Safety Reviewer in S4 is denied access to the engineering analysis that supports the proposal under review. This information asymmetry, enforced through tool-access control at the architectural level, is the mechanism for creating epistemic independence. It provides a stronger independence guarantee than model diversity alone because it prevents the agents from reasoning over the same evidence. Even if both agents use identical base models, they reach different conclusions because they see different data (this connects to the epistemic independence argument developed in Report 2, Section 7).

**Procedure currency.** If the procedure database is not synchronised with current plant revisions, the agent retrieves superseded text. This is an existing plant configuration management concern, not a new problem introduced by AI. However, AI advisory amplifies its consequence: the operator may trust the AI's procedure citation without independently verifying the revision number, because the citation carries the implicit authority of having been retrieved by a system with direct database access.

**Structured metadata on operational documents.** The documentation categories listed above range from formally structured (Technical Specifications with numbered LCOs, defined action levels, and explicit completion times) to informally structured (shift logs with narrative entries that embed system identifiers, parameter values, severity assessments, and temporal references in free text). Semantic search through RAG treats all of these as text to be embedded and searched by similarity, which works well for conceptual queries but poorly for structured queries that require filtering by specific properties (system, date range, document type, revision status). Adding typed metadata properties to operational documents enables agents to query the documentation as a database, not only as a text corpus. For shift logs and condition reports in particular, structured metadata (date, affected system, event category, severity, status, cross-references) allows the agent to filter the retrieval corpus before applying semantic search. Report 6 (Hildebrandt, 2026f), Section 3.2a develops this approach in detail, drawing on the property-based querying paradigm used in knowledge management tools such as Obsidian's Bases and Dataview features, where typed frontmatter properties on plain-text documents enable database-like filtering, sorting, and aggregation without requiring a separate structured database.

### 11.5 Display and Communication Interfaces

SPDS (qualified safety parameter display system), overview displays, emergency displays, the SA Bridge, structured artefacts, and flow-gated delivery systems appear across all nine scenarios. This subsection provides only a brief treatment; the display architecture is developed in Section 12.

The display is the sole interface between the AI system and the operator. Everything upstream (data queries, KG checks, simulation invocations, agent reasoning, coordination) is invisible to the operator; only the formatted display output is visible. Display integrity is therefore the final quality gate: errors that survive all upstream checks become visible to the operator only through the display, and the display's design determines whether those errors are detectable.

Qualified safety displays remain the authoritative information source in every scenario. They are visually and logically separate from AI advisory output. The operator's primary instrumentation is never under AI control, and the display architecture enforces this separation through spatial layout, colour coding, and labelling conventions.

Section 12.1 develops display integrity, Section 12.2 covers delivery modes and degraded state communication, Section 12.4 defines the SA Bridge and structured artefact concepts, and Section 12.5 addresses prompting as HSI design.

### 11.6 Cross-Cutting Concerns

**Table 8: Tool inventory by category and scenario**

| Category | Representative Tools | Temporal Class | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | V&V Implications |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plant data interfaces | Historians, instrument channels, alarm DB, in-core detectors, chemistry | Real-time (seconds) to near-real-time (minutes) | x | x | x | x | x | x | x | x | x | Query correctness, data freshness, field extraction accuracy |
| Knowledge structures | Knowledge graphs, context graphs, failure mode libraries, regulatory DB | Offline (hours); updated per revision cycle | | | | x | | x | | | x | KG completeness, NLP extraction accuracy, temporal validity |
| Simulation coupling | RELAP5, FRAPCON, FRAPTRAN | Near-real-time (minutes) to offline (hours) | | | | | x | x | | | | Boundary condition selection, invocation V&V, code qualification |
| Documentation systems | FSAR, Tech Specs, EOPs, maintenance logs, calibration history, vendor DB | Offline (hours); static between revisions | x | x | | x | x | x | x | | | Retrieval quality, extraction accuracy, procedure currency |
| Display interfaces | SPDS, overview displays, SA Bridge, structured artefacts, flow gates | Real-time (seconds) | x | x | x | x | x | x | x | x | x | Display integrity, qualified/advisory separation, delivery timing |

**No-actuation constraint.** All tools across all nine scenarios are read-only or simulation-only. No agent actuates plant equipment, modifies setpoints, or executes control actions. This is a deliberate architectural boundary maintained across the entire scenario set. It is not a limitation to be overcome in future iterations but a design principle: the human operator is the sole actuator. The system advises; the operator acts.

**Tool chain reliability.** Three caveats apply to any calculation of compounding tool-call error rates in multi-step reasoning. First, the independence assumption underlying multiplicative reliability estimates is optimistic: common-cause failures in tool infrastructure (for example, a network timeout affecting all historian queries simultaneously, or a shared authentication token expiring mid-chain) would produce correlated failures across steps, reducing chain reliability below the independent-failure estimate. Second, the benchmark data from Zhuang et al. (2023), which documents GPT-4 achieving 40-50% accuracy on hard multi-step tool use tasks, is drawn from general-purpose tasks; domain-specific structured queries against plant data historians with well-defined schemas and return formats may have different reliability profiles, though whether higher or lower is unknown without nuclear-specific benchmarking. Third, any numerical illustration is illustrative of the general problem, not a reliability estimate for any specific system configuration. As an illustration of the compounding effect: in S5 (LOCA response), a single reasoning cycle might involve five sequential tool calls (query the RCS historian for current pressure and temperature, query the ECCS historian for injection flow rates, invoke RELAP5 with boundary conditions extracted from those queries, interpret the simulation result against current plant state, and compare the projected trajectory against EOP entry conditions). If each call has 90% individual reliability, the chain reliability is 0.9^5 = 59%; at 95% individual reliability, the chain reaches 77%. The gap between current benchmark performance and the reliability required for nuclear advisory is large. Multi-agent architecture does not eliminate this problem; it distributes the tool chain across agents, each of which faces its own chain reliability challenge. The total system reliability depends on how agent-level errors combine, which depends on the coordination architecture and whether errors are correlated across agents.

**MCP as integration standard.** The Model Context Protocol (Report 1, Section 3.6) provides the standardisation layer for tool connectivity. MCP defines a uniform interface through which agents invoke tools, receive results, and handle errors. The same tool interfaces work with different underlying base models, enabling the model diversity that S4, S5, and S7 require for epistemic independence. MCP's model-agnostic design means that switching an agent from one base model to another (for instance, replacing one vendor's model with another to reduce common-cause failure risk) does not require rebuilding tool integrations.

**MCP as plugin architecture.** Beyond integration standardisation, MCP provides the foundation for a plugin architecture where new capabilities can be added to the agent system without modifying the core agent framework. Each new data source, knowledge graph, document repository, or verification tool is packaged as an MCP server with a typed interface. The agent discovers available tools at startup and selects among them based on relevance to the current reasoning task. This extensibility model means that plant engineers and domain experts can contribute new capabilities (a site-specific equipment knowledge graph, a plant-specific alarm interpretation tool, a vendor-specific instrument diagnostic module) by building MCP servers rather than modifying agent code. Report 2, Section 8.3a (Hildebrandt, 2026b) develops the architectural and governance implications of this plugin approach. The critical governance requirement is that each new tool registration changes the agent's capability envelope and must be treated as a configuration change subject to the plant's management-of-change process, including review of the new tool's failure modes and its impact on existing agent behaviour.

**Tool access as independence mechanism.** S2 and S4 use tool-access restriction, not just model diversity, to create epistemic independence between agents. Restricting what data an agent can query is a stronger independence guarantee than running two agents on different models with access to the same data, because it enforces information asymmetry at the architectural level. An agent cannot anchor on evidence it has never seen. This mechanism is distinct from model diversity (which reduces correlated reasoning errors) and complementary to it: the strongest independence comes from agents on different models with access to different data.

**Cybersecurity boundary conditions.** Tool interfaces connecting an LLM to plant data historians, alarm databases, and instrument channels create an attack surface subject to 10 CFR 73.54 cybersecurity requirements. The no-actuation constraint limits the consequence of a successful attack (no unauthorised control actions) but does not eliminate it: a manipulated data feed could cause the AI system to produce dangerously incorrect advisory output that misleads the operator. Read-only access does not mean the interface is safe from exploitation. The cybersecurity boundary assessment for an AI advisory system must evaluate each tool interface for data integrity, authentication, and authorisation requirements, treating the AI system as a new digital pathway to plant instrumentation data. Report 3 (Hildebrandt, 2026c), Section 5.7, develops the argument that these cybersecurity considerations require a local-first architecture as a design principle: all model inference, knowledge base queries, and tool execution should run on plant-controlled hardware behind the security boundary, with no transmission of plant-specific information to external API endpoints.

**Tool version configuration management.** Knowledge graphs change as plant modifications are made. Simulation codes are updated as models are refined. Regulatory databases are revised with each rulemaking cycle. Procedure databases are updated with each revision. Under 10 CFR 50 Appendix B quality assurance requirements, each tool version must be tracked, validated against its intended function, and controlled through the plant's configuration management programme. A change to the fuel performance KG (S6) or the Tech Spec KG (S4) is a change to the AI system's knowledge base and should receive the same configuration control treatment as a change to any other safety-relevant database.

**Graceful degradation.** When a tool call fails, three outcomes are possible. First, silent failure: the tool returns no result and the agent reasons without the data, potentially producing output based on stale or incomplete information without any indication that data is missing. Second, explicit error: the tool returns an error code and the agent reports its inability to access the data, allowing the operator to seek the information through conventional channels. Third, cascading failure: the tool returns incorrect data (wrong value, wrong unit, stale timestamp not flagged as stale), the agent incorporates the error into its reasoning, and subsequent tool calls or conclusions compound the original error. The HSI must communicate the system's degraded state to the operator (Section 12.2), and the operator must recognise when tool failure has occurred and revert to unassisted procedures (Section 14.5).

### 11.7 Response Latency Constraints

The scenarios expose an inverse relationship between event urgency and the time available for AI inference. During steady-state monitoring (S1, S6), heartbeat cycles of 90 seconds to 12 hours provide ample time for multi-step reasoning, tool queries, and even full-scope simulation runs. During a fast transient (S3, S5), the operator needs actionable information within seconds, yet the multi-step tool chains and model inference required to produce that information may take tens of seconds or longer.

This creates a fundamental tension: the events where AI advisory is most valuable (complex, fast-moving transients with high consequence) are precisely the events where inference latency is least tolerable. Three mitigations appear across the scenarios. First, pre-computation: S5 uses a pre-computed scenario library and fast-running surrogates for Phase 1 projections, reserving full-scope RELAP5 for Phase 3 when time pressure has eased. Second, prioritised delivery: flow gates in S3 and S5 ensure that the Synthesiser's overview reaches the operator first, with detailed per-system analyses queued behind it, so that the most actionable assessment arrives with minimal delay even if deeper analyses are still processing. Third, graceful temporal degradation: if an agent's analysis is not complete when the operator needs to act, the system should communicate what is available and what is still processing, rather than withholding all output until the full analysis is finished.

Deployment architectures must account for end-to-end latency (from plant data query through model inference to display rendering) as a first-order design parameter, not an afterthought. Latency budgets should be established for each operational mode, with the most stringent budgets assigned to the emergency scenarios where operator decision time is shortest.

**Latency budget framework.** The following table decomposes end-to-end advisory latency into constituent stages and establishes illustrative budgets for three operational modes. These values are representative targets for system design, not measured performance data; actual values will depend on hardware, model selection, network topology (for non-air-gapped deployments), and the complexity of the specific query. The intent is to provide a design template that makes the latency allocation explicit and testable.

**Table 14: Illustrative end-to-end latency budget for AI advisory systems**

| Stage | Normal operations | Abnormal conditions | Emergency response |
|---|---|---|---|
| Data acquisition (plant system queries) | 100 to 500 ms | 100 to 500 ms | 50 to 200 ms |
| Context assembly (RAG retrieval, KG query, prompt construction) | 200 to 500 ms | 200 to 500 ms | 100 to 300 ms |
| LLM inference per agent (single reasoning chain) | 2 to 10 s | 2 to 10 s | 1 to 5 s (smaller or faster model, shorter chain) |
| KG guardrail validation of LLM output | 100 to 500 ms | 100 to 500 ms | 50 to 200 ms |
| Inter-agent communication (for multi-agent systems) | 500 ms to 2 s | 500 ms to 2 s | 200 ms to 1 s |
| Synthesis and prioritisation (Synthesiser agent) | 2 to 5 s | 2 to 5 s | 1 to 3 s |
| Display rendering and delivery | 100 to 200 ms | 100 to 200 ms | 50 to 100 ms |
| **End-to-end, single agent** | **3 to 12 s** | **3 to 12 s** | **1.5 to 6 s** |
| **End-to-end, multi-agent (parallel execution)** | **5 to 18 s** | **5 to 18 s** | **2 to 10 s** |

Several features of this budget merit discussion. The LLM inference step dominates in all modes. Report 1, Section 7.4a describes inference optimisation techniques (speculative decoding, quantisation, continuous batching) that can reduce this component, but the inference step will remain the largest contributor for the foreseeable future. The emergency response column assumes a deliberate design choice to use a smaller or more heavily quantised model for time-critical functions, trading some reasoning depth for speed. This is a version of the pre-computation strategy already present in S5, applied at the model selection level rather than at the scenario library level.

The multi-agent row assumes agent-parallel execution (Report 2, Section 5.2a), where agents run concurrently and the system response time scales with the slowest agent plus synthesis overhead rather than with the sum of all agents. Under synchronous-sequential execution, the multi-agent times would scale linearly with agent count, producing latencies of 30 seconds or more for a five-agent system, which is incompatible with emergency response timelines.

The data acquisition stage depends on the interface between the AI advisory system and the plant data systems. Air-gapped local deployment (Report 1, Section 7.4) eliminates network variability but introduces a different constraint: the AI system must have a dedicated, low-latency data interface to the plant computer or data historian, separate from the operational displays that operators use, to avoid introducing contention on the operational data path.

**Parallel agent execution as a latency mitigation.** The scenarios already demonstrate that multiple agents querying their respective plant systems in parallel produce a more temporally coherent set of readings than a single agent querying sequentially (S3, S5, S7). This parallel execution also has a direct latency benefit that extends beyond temporal coherence. If five specialist agents each take 8 seconds to complete their analysis but run concurrently, the complete set of analyses is available in approximately 8 seconds. A single agent performing the same five analyses sequentially would take approximately 40 seconds, assuming comparable reasoning depth per analysis. During a fast transient, this difference can be the difference between advisory that informs the operator's initial response and advisory that arrives after the operator has already committed to a course of action.

**Where speed does not matter.** A significant category of nuclear AI applications operates on timescales where inference latency is operationally irrelevant. Shift handover summarisation (S1) has a preparation window of 30 minutes or more. Long-term fuel integrity trending (S6) operates on heartbeat cycles of hours to days. Procedure modification review (S4) has a review timeline of days to weeks. Operating experience compilation, knowledge base maintenance (Report 1, Section 8.5), training scenario generation, and post-event timeline reconstruction all operate on timescales that make seconds or even minutes of inference time negligible relative to the human activities surrounding the AI output. For these applications, design effort invested in latency optimisation produces no operational benefit. The engineering effort is better directed at output quality, knowledge grounding fidelity, explanation depth, and human review integration. Latency optimisation should be concentrated on the emergency-mode path, where the return on investment in reduced response time is highest.

## 12. HSI Architecture for Human-AI Systems in the Control Room

### 12.1 The Display Integrity Principle

Qualified safety displays, including the Safety Parameter Display System (SPDS), are the operator's authoritative information source. AI advisory output is advisory. This distinction is maintained across all nine scenarios and is the single most consequential HSI design constraint for AI integration in the control room.

The distinction requires both visual and logical separation. AI advisory output appears on secondary displays and never on the qualified safety instrumentation. Three scenarios test this principle under stress. In S5, the emergency display mode provides an AI advisory panel alongside but visually separate from the SPDS: the operator can see both, but the boundary between authoritative data and advisory interpretation is unambiguous. In S9, the AI's confident but wrong LOCA recommendation does not corrupt the qualified displays that the operator uses to reach the correct diagnosis. In S3, five agents producing simultaneous output during a turbine trip could overwhelm attention, but the advisory outputs remain on the secondary display while the primary safety parameters hold their authoritative position.

Physical placement matters. Where the AI advisory display sits in the control room affects attention allocation and visual scanning patterns. During emergencies (S5), the shift supervisor may move between workstations, and the AI advisory display must be accessible from multiple positions without competing for the operator's primary attention on safety displays. The principle is not a design preference but a regulatory requirement under NUREG-0700 guidance for display hierarchy and safety significance classification.

### 12.2 Delivery Modes and Information Flow Control

The flooding problem, made concrete in S3: without delivery control, five agents triggered simultaneously by a turbine trip produce five assessments within seconds. The shift supervisor, already processing more than twenty plant alarms, receives five simultaneous AI outputs. This is the information flooding problem from Report 2, Section 5.3 instantiated in an operational context.

The primary solution across emergency scenarios is the flow gate. Agent responses are queued and delivered one at a time, with priority rules determining order. In S3, the Synthesiser delivers first (providing the most actionable overview), followed by system-specific monitors in priority order. In S5, the flow gate assigns high priority to the Synthesiser's integrated assessment, with other agents queued behind it.

Tiered delivery addresses the multi-unit scaling problem in S8. Per-unit agent outputs go to per-unit conversation threads; cross-unit specialist outputs go to the main room display; the Multi-Unit Synthesiser produces periodic compressed summaries. This architecture trades per-unit detail visibility for manageable information volume, a deliberate design choice that accepts reduced granularity in exchange for preventing cognitive overload across four reactor modules.

Delivery modes are not static. They change within a scenario as conditions evolve. S5 transitions from Pattern 7 ambient monitoring (no delivery control needed for a single agent) to Pattern 9 emergency mode (flow gate required for seven agents). The transition itself must be annunciated to the operator, because the change in information delivery rate and format is a significant alteration to the operator's information environment.

Communicating degraded state is an underspecified but critical requirement. When a tool fails or an agent goes offline, the delivery system must flag the gap. If the Reactor Core Safety Agent in S5 stops producing output (due to model failure, tool error, or context exhaustion), the operator needs to know that nuclear instrumentation data is no longer being analysed by an agent. Silence from an agent is ambiguous: it could mean "nothing to report" or "system failure." The delivery mode architecture must distinguish these two states, either through periodic heartbeat confirmations or through explicit silence-detection alerts.

**Table 9: Delivery mode by scenario and operational context**

| Scenario | Operational Context | Delivery Mode | Priority Rule | Dynamic Transition |
|---|---|---|---|---|
| S1 | SMR ambient monitoring | Heartbeat (90 s cycle) | Single agent, no queuing | None (steady state) |
| S2 | Valve leak investigation | Sequential turn-taking | Agent A then Agent B then Synthesiser | None (investigation mode throughout) |
| S3 | Turbine trip transient | Flow gate with priority queue | Synthesiser first, then by system criticality | Ambient to emergency on trip detection |
| S4 | Safety analysis verification | Structured review sequence | Independent Reviewer before group discussion | None (review mode throughout) |
| S5 | LOCA emergency | Flow gate, high-priority Synthesiser | Synthesiser first, SA Bridge for briefings | Pattern 7 ambient to Pattern 9 emergency |
| S6 | Fuel integrity monitoring (SMR) | Tiered by module priority | Module with largest deviation first | Normal monitoring to active advisory |
| S7 | Instrument discrepancy | Threaded diagnostic | Instrument Diagnostics leads, others respond | Normal to investigation on discrepancy detection |
| S8 | Multi-unit load follow | Tiered by unit and function | Per-unit threads plus main room summaries | Per-unit to cross-unit on shared-system events |
| S9 | Adversarial stress test | Flow gate (same as S5) | Synthesiser first | Ambient to emergency (same as S5) |

### 12.3 Display Modes and Mode Transitions

Normal mode provides ambient advisory in an overview format. S1 establishes the baseline: a four-module summary on the overview display, colour-coded (green for normal parameters, yellow for items of note), structured identically across modules so the operator can scan by position rather than reading each entry.

Investigation mode presents side-by-side agent assessments with drill-down capability. In S2, the operator sees Agent A's conservative assessment alongside Agent B's instrument-focused analysis, with the ability to expand each agent's reasoning chain and inspect the data sources. In S7, the diagnostic thread provides structured artefacts (formatted data tables for instrument readings, computed offsets, and uncertainty bounds) rather than narrative prose.

Emergency mode uses a rapid-scan layout with colour coding. S5 defines the emergency display: critical parameters in red with trend indicators, ECCS status in green, simulation-based projections in blue with the stated basis, and unresolved items in yellow. Text narration is minimal. The layout is designed for time-pressured scanning rather than detailed reading, with numerical values and trend arrows taking precedence over explanatory text.

Mode transition annunciation is a design requirement drawn from Report 3, Section 5.6. The Pattern 7 to Pattern 9 escalation in S5 is a major display mode change occurring during maximum operator stress. The display shifts from one agent's ambient output to a full multi-agent advisory panel with flow-gated delivery. The escalation must be explicitly annunciated: a brief orientation indicating what has changed, how many agents are now active, and what the new information delivery pattern will be. Without this annunciation, the operator experiences an unexplained change in the information environment at the worst possible moment.

The multi-unit display in S8 uses spatial partitioning: per-unit threads for depth, main room display for cross-unit summaries. The unit confusion prevention agent monitors for unit-referencing errors. If the operator queries "What is the current SG level?" without specifying a module, the system requires clarification before responding rather than assuming a default unit.

### 12.4 Role-Adapted Presentation and Information Formats

The SA Bridge is an agent or agent function that translates between the AI system's internal technical communication and operator-usable display formats, adapting the presentation to the recipient's role and current needs. This is the authoritative definition for the report series.

In S1, the SA Bridge is a formatting layer within each Pattern 7 agent, producing standardised handover summaries with consistent structure across shift changes. In S5, it is a dedicated agent that maintains a communication-oriented perspective throughout the event, enabling it to produce briefings without context-switching from a technical analysis role.

Role adaptation appears most clearly in S5. The shift supervisor receives operational detail: parameter values, EOP step tracking, agent team status, and specific recommended actions with stated basis. The Emergency Director, arriving at T+30, receives a high-level briefing: current plant status, key parameters with trend direction, decision points ahead, and items requiring the Director's authority. The detailed data remains available but is not foregrounded. The same SA Bridge agent produces both presentations, adapting format and detail level to the recipient.

Structured artefacts (S7) are typed data objects for inter-agent and agent-to-human data exchange. The Instrument Diagnostics Agent posts a structured artefact containing four narrow-range pressure readings, the wide-range reading, the computed offset with uncertainty, and the timestamp. The I&C Engineer sees this as a formatted data table, not a paragraph of prose. Typed artefacts preserve numerical precision, reduce token overhead in inter-agent communication, and support direct comparison by the human reviewer.

Information provenance is tracked in the display layer. Each data item indicates its source: which agent produced it, which tool retrieved the underlying data, which plant data source the tool queried, and how old the data is. S5 maintains provenance for simulation-based projections: the display marks RELAP5 output separately from the LLM's interpretation of that output, so the operator can evaluate the simulation result and the agent's commentary on it independently.

### 12.4a Spatial Reasoning Displays

The delivery modes described above present AI advisory output as sequential text, formatted tables, and annotated parameter displays. An alternative presentation paradigm, developed in Report 3 Section 5.3 (Hildebrandt, 2026c), uses spatial layout to represent the relational structure of the AI's reasoning.

In a canvas-based spatial display, the AI advisory appears as a network of connected nodes rather than as paragraphs of text. Each node represents a distinct element of the agent's assessment: a parameter reading, an alarm condition, a procedure step, a diagnostic hypothesis, a knowledge graph constraint, or a simulation projection. Edges between nodes represent the relationships the agent has identified: causal connections (this temperature trend is consistent with that valve position), temporal sequences (this alarm preceded that parameter deviation by 30 seconds), procedural links (this condition is an entry criterion for that procedure), and evidential support or contradiction (this reading supports hypothesis A but contradicts hypothesis B).

The display paradigm is most valuable for scenarios where the relational structure of the agent's reasoning carries information that sequential text delivery loses. S9 (compound event with ambiguous indications) provides the clearest illustration. In S9, the multi-agent system is evaluating competing hypotheses (LOCA versus instrumentation failure) with evidence supporting and contradicting each. A canvas display would present the two hypotheses as central nodes, with supporting evidence nodes connected by green edges and contradicting evidence nodes connected by red edges. The operator sees at a glance which hypothesis has more evidential support and where the ambiguity lies, without reading through paragraphs of agent text to extract the same relational information.

The concept draws on the canvas paradigm implemented in knowledge management tools such as Obsidian, which uses an open JSON Canvas specification for representing networks of connected content cards. The JSON Canvas format (nodes with typed content, directional labelled edges, spatial coordinates) provides a structured data model for this kind of display, and its open specification allows integration with both agent output systems and display rendering engines.

The canvas display is advisory and subject to the same display integrity requirements as all AI output: labelled as "AI ADVISORY", visually separated from qualified safety displays, and rendered in a designated advisory zone. The spatial layout must not compete with the operator's primary attention on safety-classified instrumentation. During high-stress events, the cognitive load of interpreting a spatial network must be weighed against the information density it provides. Wickens' Multiple Resource Theory (2002) suggests that spatial displays exploit the visual-spatial processing channel that text-based AI advisory does not use, potentially reducing rather than increasing the cognitive-verbal bottleneck that arises when all AI output is delivered as natural language. Whether this theoretical advantage holds under realistic operational stress is a human factors research question that requires simulator-based evaluation.

### 12.5 Prompting and System Prompt Architecture as HSI Design

This subsection addresses the HSI dimension of system prompting: how the soul prompt determines what the AI surfaces to the operator and in what form. Non-HSI aspects of prompting (reasoning strategy, uncertainty calibration) are addressed in Report 1, Section 5.

**Soul prompts as the hidden HSI layer.** The soul prompt defines what the agent attends to, what it prioritises, how it communicates, and what thresholds trigger a report to the operator. This is an interface design decision, not merely an AI configuration choice.

In S1, the soul prompt defines module scope and monitoring priorities. The heartbeat frequency (90 seconds) is a prompting decision that determines the information refresh rate seen by the operator. In S2, Agent A's soul prompt includes conservative risk thresholds and explicit instructions to flag DNB margin concerns; Agent B's prompt defines instrumentation expertise and diagnostic approach. These prompt differences determine what each agent surfaces to the operator and, equally, what each agent omits. In S4, the Independent Safety Reviewer's prompt deliberately excludes access to the supporting engineering analysis. Prompt-level information restriction creates epistemic independence, a design feature with direct HSI consequences: the reviewer's output reflects an assessment uncontaminated by the original analysis team's framing. In S8, per-unit agent soul prompts are identical except for module designation. Prompt identity determines per-unit scope and prevents cross-unit data contamination.

**Soul prompt modification as a regulated change.** S6 proposes updating the Domain Expert's soul prompt to include isotope ratio monitoring. This changes the agent's persistent surveillance behaviour. Whether 50.59 applies depends on whether the AI advisory system is within the plant's licensing basis. If the system is described in the FSAR (for example, if it is credited as part of the operator's information environment in the Chapter 18 HFE programme), then prompt changes require 50.59 screening. If the system operates as an engineering tool outside the licensing basis, prompt changes are governed by the plant's engineering change process but not by 50.59. In the former case, a prompt change is a change to a facility component as described in the FSAR. Under 10 CFR 50.59(c)(2), this requires screening. A concrete example: if the S4 safety verification agent's prompt is modified to change the discrepancy flagging threshold from 2% deviation to 5%, the effective independent verification function changes. An assertion that would have been flagged under the old prompt now passes undetected. This is not a software configuration change; it is a change to the safety function performed by the AI advisory system.

**Prompt opacity** (Report 1, Section 7.5): if the system uses a frontier API rather than a locally deployed model, the provider injects additional system-level instructions that the operator and the regulator cannot see. The actual prompt that reaches the model is the developer's prompt plus the provider's hidden additions. For a nuclear application where the prompt defines the agent's safety-relevant behaviour, this opacity is incompatible with the V&V and configuration management requirements of the regulatory framework. Local deployment, where the entire prompt is controlled and auditable, is the only viable approach for regulated applications. This is the double opacity problem identified in Report 1: the model's internal reasoning is opaque (inherent to current architectures), and the prompt itself may be partially hidden (a deployment choice that can be eliminated).

**Prompt sensitivity** (Report 1, Section 5.3): minor prompt changes can produce major output changes. A rewording intended to "clarify" a monitoring instruction could change what the agent reports. The boundary between "configuration change" and "behaviour change" is not well-defined for natural-language prompts, unlike traditional software parameters with defined valid ranges.

**Prompt testing and validation** has no established methodology. No accepted protocol exists for verifying that a prompt produces intended HSI behaviour across the range of plant conditions. This is the prompt equivalent of Integrated System Validation (NUREG-0711 Chapter 12), and it remains an open problem. A prompt may perform correctly for hundreds of test scenarios and then produce unexpected output for a plant condition that falls outside the tested range but within the design basis.

**Prompt configuration management** requires version control, review, authorisation, and rollback capability. The review process should include human factors evaluation (does the prompt change alter what information reaches the operator?) alongside technical review of the prompt's effect on agent reasoning.

### 12.6 Open HSI Challenges

**No validated HSI guidelines.** NUREG-0700 Chapter 5 predates LLM-based advisory systems. AI advisory displays, including flow-gated multi-agent output, role-adapted presentations, and mode-transitioning layouts, are not addressed by current guidance. The scenarios in this report constitute a preliminary exploration of the design space, not a validated set of solutions.

**Context budget visibility.** Should the operator see how much context each agent has consumed? In S7, the Instrument Diagnostics Agent's attentional tunnelling (context budget exhausted by the diagnostic thread) was invisible to the operator. Making context consumption visible would allow the operator to recognise when an agent's analysis may be incomplete because it has run out of working memory. A simple percentage indicator per agent could serve this function.

**Agent agreement and disagreement indicator.** Across multi-agent scenarios (S2, S3, S4, S5), the operator must assess whether agents agree or disagree. A concise visual indicator of agent consensus state would reduce the cognitive overhead of reading and comparing individual agent outputs. The design of such an indicator is non-trivial: agreement may be partial (agents agree on diagnosis but disagree on severity), and a binary agree/disagree signal may oversimplify.

**Alarm-AI integration.** The architectural relationship between the plant alarm system and AI advisory is undefined. The scenarios treat them as separate systems. In practice, the operator receives alarms from one system and advisory from another, with no integrated view. Whether integration is desirable (providing a unified information stream) or whether separation preserves the independence of both systems is an unresolved design question with safety implications in both directions.

**Spatial and canvas-based advisory displays.** Section 12.4a introduces the concept of presenting AI reasoning as a spatial network rather than sequential text. Whether spatial layouts improve operator comprehension during complex multi-variable scenarios (S9, S5), or whether they introduce new mode confusion risks (the operator must interpret the spatial topology in addition to the content), is an open research question. The interaction between spatial advisory displays and Wickens' Multiple Resource Theory predictions (visual-spatial channel utilisation) requires empirical evaluation through simulator studies. The design space also includes hybrid approaches where text-based delivery is the default and spatial display is available on demand for situations where the operator wants to see the relational structure of the AI's assessment.

**NUREG-0711 programme lifecycle.** An AI advisory HSI must undergo the same HFE programme review as any other control room display: task analysis (Chapter 4), HSI design (Chapter 11), HSI evaluation, and Integrated System Validation (Chapter 12). Current ISV methods assume deterministic systems where the same input produces the same output. Adapting ISV for non-deterministic AI advisory displays, where the same plant condition may produce different advisory text on different occasions, is an open methodological challenge that must be resolved before any AI advisory system can complete the regulatory review process.

## 13. Procedure-AI Interaction

Nuclear operations are procedure-driven. Operators execute actions following Abnormal Operating Procedures (AOPs), Emergency Operating Procedures (EOPs), or surveillance procedures. The relationship between AI advisory and the procedural framework is a design question that the scenarios raise but do not fully resolve.

Three interaction models appear across the scenarios, ordered from least to most coupled:

*Procedure-unaware:* the AI has no knowledge of which procedure the operator is currently executing. It provides advisory based on plant state alone. The operator must mentally reconcile AI output with the current procedure step. S1 and S2 operate in this mode implicitly. In S1, the shift handover agent summarises plant state and notable events without reference to which surveillance or operating procedures the incoming crew will execute. In S2, both agents assess the RCS temperature anomaly based on process data and instrumentation history; neither tracks the operator's procedure path or references the applicable AOP. The operator integrates AI advisory with their own procedural context.

*Procedure-tracking:* the AI monitors procedure execution, knows which EOP step the operator is on, and can flag when plant conditions change the procedure path. S5 is the primary example. The Synthesiser's initial integrated assessment explicitly reports "EOP-E0 entry conditions met," tracking the procedural context of the emergency response and identifying when plant conditions satisfy transition criteria for moving between EOP branches. The AI does not direct the operator to execute procedure steps; it confirms that the conditions triggering procedural transitions have been reached, leaving the transition decision to the operator.

*Procedure-suggesting:* the AI recommends procedure transitions. This is the most aggressive model and the most problematic, because it creates ambiguity about whether the operator should follow the procedure or the AI's recommendation when they conflict. S9 illustrates the risk directly. Both agents recommend LOCA response procedures (EOPs) based on their pattern-matching diagnosis. This is procedure suggestion: the AI is telling the operator which procedure to execute. The operator correctly overrides because the compound event (stuck-open pressurizer safety valve coinciding with vital bus loss) requires a different AOP that the AI did not identify. This is the most dangerous interaction mode because it creates direct competition between the procedure's authority and the AI's recommendation, and an operator who defers to the AI executes the wrong procedure.

### Representing EOP Logic as Structured Data

The feasibility of procedure-tracking and procedure-suggesting AI depends on how procedural logic is represented in the system's knowledge base. Emergency Operating Procedures in the Westinghouse tradition are written as prose documents in a two-column format: the left column specifies the action and its expected response; the right column (Response Not Obtained, or RNO) specifies contingency instructions if the expected response does not occur. Every step is implicitly an IF/THEN/ELSE branch. A flat text representation of an EOP, suitable for RAG retrieval, preserves the words but loses this branching logic. For an LLM to track procedure state or evaluate transition criteria, the logical structure must be made explicit in the data representation.

A knowledge graph encoding of the Westinghouse EOP framework would represent each procedure step as a node with two outgoing edges: one for the nominal path (expected response obtained, proceed to next step) and one for the RNO path (expected response not obtained, execute contingency actions). Procedure transitions (E-0 directing the operator to E-1, or E-1 branching to ES-1.2 based on RCS pressure conditions) become edges between procedure subgraphs, with transition criteria encoded as conditions evaluated against plant parameters. Foldout page requirements, which impose continuous applicability conditions that the operator must monitor throughout execution regardless of the current step, become always-active condition nodes that can trigger transitions from any position in the current procedure.

The Westinghouse framework adds a further layer of complexity through Critical Safety Function Status Trees (CSFSTs). Six status trees (Subcriticality, Core Cooling, Heat Removal, RCS Integrity, Containment, RCS Inventory) are evaluated continuously in parallel with the main procedure, typically by the Shift Technical Advisor. Each tree produces a colour-coded priority status: RED indicates an extreme challenge requiring immediate entry into the corresponding Function Restoration procedure, overriding the current procedure; ORANGE indicates a significant challenge requiring FR procedure entry at the next convenient point; YELLOW and GREEN indicate degraded and satisfied conditions respectively. An AI system providing procedure-tracking must replicate this parallel evaluation and priority arbitration, which requires structured access to both the status tree decision logic and real-time plant parameters. Representing CSFSTs as separate decision graphs with priority-ranked edges to FR procedures, rather than as flat text descriptions, is a prerequisite for any system that claims to track procedural state during emergency response.

The practical implication for prototyping is that EOP logic encoding provides a well-defined, verifiable test case for knowledge graph construction (Report 6, Level 2). Encoding even a single EOP such as E-0 exercises the graph's ability to represent procedural branching, conditional transitions, and parallel monitoring requirements in ways that simpler factual encodings (parameter limits, equipment relationships) do not. Given a set of plant conditions, the encoded graph should correctly identify which procedure step applies and whether transition criteria are met, a validation that is deterministic and suitable for automated regression testing.

Procedure-AI interaction is arguably the most important HSI design question for nuclear AI advisory, because procedure adherence is a cornerstone of nuclear safety culture. The three models above represent increasing coupling and increasing risk. A deployment that begins as procedure-unaware may drift toward procedure-tracking as operators come to rely on AI confirmation of their procedure step, even if the system was not designed for that function. An operator who routinely checks AI output to confirm that they are on the correct EOP branch is, in practice, using the AI as a procedure-tracking tool regardless of its design intent. This emergent coupling should be anticipated in the HFE programme and addressed through training and periodic assessment of how operators actually use AI advisory relative to their procedures.

The procedural authority question sits at the centre of this design space. The procedure is the operator's authoritative operational guide. AI advisory must not create ambiguity about the locus of procedural authority. When the AI recommends an action that differs from the current procedure step, the operator must understand that the procedure takes precedence unless a procedure transition is warranted by plant conditions. The AI can inform the operator that transition conditions may be met, but the decision to transition remains with the operator.

This interface connects to NUREG-0711 Chapter 8 (procedure development): if AI systems reference or track procedures, the procedure-AI interface becomes part of the HFE programme review scope.

## 14. Human and Organisational Factors

Report 3 (Hildebrandt, 2026c, Section 5) establishes the theoretical human factors framework for AI-augmented nuclear operations, drawing on constructs from Endsley (situation awareness), Lee and See (trust in automation), Wickens (multiple resource theory), and Parasuraman (automation levels and complacency). This section applies those constructs to the specific operational situations developed in Scenarios 1 through 9. Each finding below is grounded in at least one scenario with concrete operational detail. The theoretical construct provides the analytical lens; the scenario provides the operational evidence.

**Table 11: Human factors topic coverage in Report 3 (theoretical framework) versus Report 4, Section 14 (scenario-specific findings)**

| HF Topic | Report 3 Coverage | Report 4, Section 14 Coverage |
|---|---|---|
| Cognitive task transformation | Construct definition, ACTA methodology, generation-to-evaluation shift (Report 3, Section 5.4) | Specific dual-task demands in S3, S5, S7; cognitive reframing in S7; hypothesis evaluation in S2, S9; verification evaluation in S4 |
| Situation awareness | Endsley Levels 1-3 mapped to LLM primitives, DSA framework (Report 3, Section 5.2; Report 2, Section 6) | SA continuity at shift handover (S1), context divergence (S3), attentional tunnelling (S7), cross-unit SA gaps (S8), SA failure under novelty (S9), late-joiner problem (S5) |
| Trust dynamics | Lee and See trust dimensions, calibration theory, Merritt and Ilgen formation timelines (Report 3, Section 5.9) | Trust formation during steady-state (S1, S6), trust under disagreement (S2), anchoring effects (S2), override as trust test (S9), recalibration delay after AI failure (S9) |
| Workload | Wickens MRT, resource competition theory, workload redirection hypothesis (Report 3, Section 5.5) | Visual-verbal channel bottleneck in S3, pattern escalation workload spike in S5, multi-stream integration in S7, reconciliation workload in S2 |
| Error modes | Automation bias taxonomy, complacency mechanisms, mode confusion categories (Report 3, Section 5.8) | Monoculture collapse (S9), reconciliation failure (S2, S3), mode confusion during pattern escalation (S5), uninformed reliance under silent failure (S3, S7), superposition of simulacra (S2) |
| Skill maintenance | Arthur et al. degradation rates, Casner et al. pilot analogy, training programme requirements (Report 3, Section 5.10) | S9 as justification case, specific skills at risk mapped to scenarios, AI-off exercise design, evaluation competency as new training requirement |

### 14.1 Operator Cognitive Task Transformation

The generation-to-evaluation shift described in Report 3, Section 5.4 manifests concretely across Scenarios 2, 3, 5, 7, and 9: the operator's primary cognitive task changes from generating a diagnosis from raw data to evaluating AI-generated hypotheses against their own plant knowledge. This shift is not a simplification. Evaluation requires the operator to comprehend the AI's assessment, assess its data basis, compare the assessment against independent knowledge, and judge whether to accept, reject, or investigate further.

The scenarios expose specific dual-task demands. In S3, the operator must maintain situation awareness through qualified SPDS displays (visual-spatial processing) while reading AI advisory text (visual-verbal processing), creating the visual-verbal channel bottleneck that Wickens' MRT predicts. In S5, the operator must reorient to a new multi-agent display configuration during maximum operational stress. In S7, three concurrent information streams (diagnostic agent thread, redundancy agent finding, I&C engineer's reference leg hypothesis) converge and require integration. Cognitive reframing in S7, where the operator must shift from a "single-channel failure" to a "possible common-mode failure" mental model based on an agent observation the operator had not independently made, illustrates a demand distinct from dual-task management.

S4 introduces a meta-evaluation variant: the Safety Committee member must assess whether the AI agents' independent review was adequate, not whether the procedure revision itself is correct. During extended emergency operations (S5), sustained evaluation demands may accelerate fatigue rather than reduce it, as the evaluation task adds processing overhead on top of operational demands that remain regardless of AI support.

### 14.2 Situation Awareness in Human-AI Teams

SA continuity at shift handover (S1) illustrates how the AI agent's curated shift history supplements verbal briefing, though the summary reflects the agent's perception rather than the outgoing crew's judgement; if the agent missed something the outgoing crew noticed but did not log, the incoming crew inherits the gap. S1 also introduces the problem of AI system state turnover: when a new crew takes over, they inherit an AI system with accumulated context, established monitoring patterns, and a trust relationship calibrated by the outgoing crew. Traditional turnover checklists do not address AI system state.

Engineered information asymmetry in S2 creates productive disagreement through tool-access restriction, an instance of distributed SA by design (Report 2, Section 6). Context divergence in S3 illustrates a temporal SA problem: ten minutes after the turbine trip, three monitoring agents hold different Level 1 SA pictures because their most recent data retrievals occurred at different times, and the Coordination Monitor makes this divergence visible. Attentional tunnelling in S7 is compensated architecturally by role separation (depth, breadth, and plant-wide awareness in parallel). Cross-unit SA in S8 reveals that fleet-level patterns exist only at the cross-unit level, addressed by the dedicated Cross-Unit Pattern Detection Agent. SA failure under novelty (S9) is the most consequential finding: both agents comprehend the data as a LOCA, but the comprehension is wrong because the actual condition is outside their training distribution. The late-joiner problem in S5 at T+30 minutes places the Emergency Director's decision-making quality at the mercy of the SA Bridge's compressed briefing.

### 14.3 Trust, Calibration, and Override

Trust formation during steady-state operations (S1, S6) follows the pattern that trust is slow to build and fast to lose, with a nuclear-specific concern: extended periods of correct AI performance provide few opportunities for operators to calibrate trust against negative evidence (Report 3, Section 5.9). Trust under disagreement (S2) tests whether operators treat inter-agent disagreement as a signal to investigate rather than as noise to resolve by selecting the more confident agent. Anchoring effects compound this challenge, as the first AI recommendation the operator reads anchors subsequent investigation in ways that persist even when the anchor's basis is understood.

Override in S9 is the binding test case. Both agents confidently recommend LOCA response procedures; the supervisor, drawing on contextual knowledge of the ongoing power reduction and vital bus configuration, correctly overrides both agents. Override effectiveness depends on maintained diagnostic skills (Report 3, Section 5.10), an unambiguous authority structure, and transparent AI reasoning. After the override, the operator's discovery that both agents were confidently wrong triggers a recalibration period during which the AI system provides reduced value because the operator double-checks everything. The calibration paradox ties trust and skill maintenance together: high AI reliability during normal operations reduces the operator's practice at critical evaluation, and when the AI finally errs (S9), the evaluation skill may have atrophied from disuse.

### 14.4 Authority, Leadership, and Crew Dynamics

Across all nine scenarios, the human operator retains final authority over operational decisions, consistent with 10 CFR 50.54 requirements for licensed operator authority. In S5, AI advisory does not reduce the leadership burden; the supervisor must coordinate EOP execution, verify automatic safety system actuation, direct crew actions, process AI advisory input, and manage the crew's interaction with the AI system simultaneously. Authority transfer at T+30 in S5 creates a dual authority structure where the Emergency Director has strategic authority but minimal SA, while the Supervisor has the deepest SA but reduced authority, instantiating the out-of-the-loop problem in its most consequential form.

The I&C engineer's entry in S7 shifts team composition by introducing plant-specific installation knowledge that no agent possesses, creating a mixed human-AI team dynamic. Multi-unit crew coordination in S8 introduces unit confusion risk at the crew communication level, and the design question of whether AI systems should share information between crews or maintain strict crew-level partitioning remains unresolved.

### 14.5 Error Modes in AI-Augmented Operations

Automation bias presents a nuclear-specific manifestation: long steady-state periods provide extended opportunities for trust to reach uncritical levels, and S9 demonstrates the operational consequence when both agents confidently recommend the wrong procedure. Reconciliation failure arises in S2 and S3 when the operator cannot resolve disagreements between agents on technical grounds and workload spikes from comprehending and evaluating each assessment.

Monoculture collapse (S9) is the most dangerous error mode identified: both agents converge on the same wrong diagnosis because both models lack training on the actual condition, presenting as consensus when it is shared ignorance. Mode confusion in S5 results from simultaneous changes to agents running, display layout, and delivery mode during maximum operational stress. Uninformed reliance, distinct from automation bias, occurs when a tool fails silently and the operator relies on degraded AI output without knowing its data basis has changed; the mitigation is architectural (Section 12.2) rather than behavioural. Superposition of simulacra (S2, Pattern 0) produces outputs correlated at the source, adding no independent evidential weight, as analysed in Report 2, Section 7.

### 14.6 Skill Maintenance and Training Implications

S9 provides the operational justification for skill maintenance requirements: the operator's ability to override both agents' confident wrong recommendation depended on diagnostic skills preserved through training. The specific skills at risk are plant state diagnosis from raw instrumentation (S9), alarm response without AI prioritisation (S3), EOP execution without AI tracking (S5), and manual monitoring across units without AI pattern detection (S8). Arthur et al. (1998) found that cognitive-procedural skills degrade within one to two years without practice, and Casner et al. (2014) documented pilot manual flying skill atrophy in automated cockpits, establishing the urgency for periodic AI-off simulator exercises calibrated to these degradation rates.

AI advisory introduces a new competency that traditional training programmes do not address: the ability to evaluate AI-generated output critically. This includes detecting when an AI recommendation is inconsistent with plant indications (S9), recognising when agent disagreement reflects shared bias rather than genuine diversity (S2), assessing whether the AI's data basis is current (S3, S7), and deciding when to override with confidence. Training programme adaptation should incorporate conditions where the AI is correct, wrong in detectable ways, self-contradictory, and silently degraded, with the S2, S3, S5, and S9 scenarios providing templates for such exercises.

## 15. Synthesis

Across the nine scenarios, the single-agent vs multi-agent discussions produce a spectrum of verdicts rather than a blanket answer.

At one end, Scenario 1 (shift handover monitoring) and the routine portion of Scenario 6 (fuel integrity) conclude that a single well-configured agent with appropriate tool access is sufficient and often preferable. The single agent avoids coordination overhead, provides cross-unit or cross-data-source awareness that separate agents lack, and introduces fewer failure modes. For these use cases, multi-agent architecture adds engineering complexity without corresponding benefit.

At the other end, Scenario 4 (independent safety verification) and Scenario 5 (LOCA emergency response) conclude that multi-agent architecture with model diversity is required. In Scenario 4, the regulatory independence requirement cannot be satisfied by a single model reviewing its own work. In Scenario 5, the combination of temporal parallelism, independent adversarial challenge, parallel SA Bridge function, and graceful degradation under component failure exceeds what sequential single-agent processing can provide.

Between these extremes, Scenarios 3 (alarm cascade), 7 (instrument failure), and 8 (multi-unit SMR) conclude that multi-agent is justified but not universally required: the verdict depends on transient complexity, the number of concurrent information streams, and whether attentional tunnelling is a risk. Scenario 8 proposes a hybrid architecture (single agent for normal monitoring, multi-agent activated for abnormal conditions) that matches architectural complexity to operational demand.

The following table extracts the verdict conditions into a decision framework:

**Table 4: Architectural recommendation by operational context**

| Operational Context | Independence Required? | Information Rate | Recommended Architecture | Complexity |
|---|---|---|---|---|
| Normal monitoring (steady state) | No | Low | Single agent (Pattern 7). Multi-agent adds complexity without benefit. | Low |
| Routine analysis (fuel trending, shift handover) | No | Low-moderate | Single agent with tools. Cross-source integration is a strength. | Low |
| Abnormal conditions (transient, alarm cascade) | No, but SA depth needed | High | Multi-agent justified when context budget of a single agent is insufficient for the information rate. | Medium |
| Diagnostic investigation (instrument failure) | No, but depth + breadth needed | Moderate | Multi-agent justified by the attentional tunnelling problem: one agent cannot go deep and stay broad simultaneously. | Medium |
| Independent safety verification | Yes (regulatory) | Low-moderate | Multi-agent with model diversity required. Single-model review does not satisfy independence requirements. | High |
| Emergency response (LOCA, beyond-design-basis) | Yes (diversity + parallelism) | Very high | Full multi-agent (Pattern 9) with model diversity, adversarial role, and simulation coupling. | Very High |
| Multi-unit monitoring (SMR) | Depends on operational state | Variable | Hybrid: single cross-unit agent for normal operations, multi-agent activated for abnormal conditions on any unit. | Variable (Low normal, High abnormal) |

A reader could observe that single-agent approaches are sufficient or preferable in four to five of the nine scenarios and conclude that multi-agent architecture is rarely needed. This reading misses the pattern: the scenarios where single-agent suffices are routine operations (shift handover, fuel trending, normal multi-unit monitoring) where the consequences of AI error are limited. The scenarios requiring multi-agent are the high-consequence events (independent safety verification, emergency response) where the stakes are highest and the regulatory independence requirements most stringent. A practical deployment strategy might use single-agent for routine operations and activate multi-agent for emergency or safety-critical functions, which is the hybrid architecture Scenario 8 proposes.

Scenarios not addressed in this report include reactor startup and shutdown (procedure-intensive operations with evolving acceptance criteria and frequent mode transitions), fire response involving potential control room evacuation and operation from alternative shutdown facilities, and security events. These operational contexts present distinct AI advisory requirements, particularly around procedure tracking through mode transitions and operation under degraded instrumentation, that warrant future development.

The scenarios that provide primary input to Report 5's HRA method walkthroughs are Scenario 5 (LOCA emergency response, providing the post-trip diagnosis context) and Scenario 9 (compound event, illustrating AI failure and operator override). Scenarios 3 (alarm cascade, reconciliation failure under time pressure) and 7 (instrument failure, attentional tunnelling leading to delayed common-mode detection) provide additional HRA-relevant error mode illustrations.

Two further observations cut across all scenarios. First, the architectural analysis from Report 2 produces different recommendations for different operational contexts. The taxonomy is a design vocabulary, not a prescription. Second, the binding constraint across all scenarios is the absence of empirical data. Every scenario describes what an AI advisory system would need to do and what properties it would need to have, but none can verify that current LLM technology can deliver those properties at the reliability levels nuclear operations require. Empirical validation through nuclear simulator studies, as described in Report 3, Section 4.9, is the most urgent next step.

Report 6 will develop practical guidance for constructing sandbox environments along the capability gradient identified in these scenarios, from single-agent ambient monitoring through multi-agent emergency advisory, providing a structured pathway from conceptual architecture to empirical evaluation.

## References

Hildebrandt, M. (2026a). LLM Agents: Foundations, Capabilities, and Reliability. IFE Report.

Hildebrandt, M. (2026b). Multi-Agent LLM Systems: Architecture, Coordination, and Epistemic Properties. IFE Report.

Hildebrandt, M. (2026c). AI Agents in the Nuclear Control Room. IFE Report.

Hildebrandt, M. (2026d). AI Agent Scenarios for Nuclear Control Rooms. IFE Report.

Hildebrandt, M. (2026e). Human Reliability Analysis for AI-Assisted Nuclear Operations: Scenarios and Method Walk-Throughs. IFE Report [forthcoming].

Hildebrandt, M. (2026f). Practical Sandbox Guide for Nuclear AI Advisory Systems. IFE Report [forthcoming].
