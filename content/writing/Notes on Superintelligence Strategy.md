---
title: Notes on Superintellience Strategy
date: 2025-03-22
description: My notes on the "Mutual Assured AI Malfunction" paper by Dan Hendrycks, Alexandr Wang, and Eric Schmidt.
published: true
---

Dan Hendrycks, Alexandr Wang, and Eric Schmidt published a new piece last week (and got a great url, [nationalsecurity.ai](https://www.nationalsecurity.ai/)) arguing for a potentially-stable deterrence regime that they dub “Mutual Assured AI Malfunction.” I only got around to reading it now, thanks to spring break, but I’ve included my notes below — I sometimes abbreviate authors as HSW. You can listen to Dan Hendrycks talk about on the Lawfare podcast wherever you get your podcasts, and Zvi’s notes are [here](https://thezvi.substack.com/p/on-maim-and-superintelligence-strategy) — I recommend them, though I didn’t read them until after going through on my own.

## Chapter 1 — Executive Summary

**Deterrence** comes from the fact that AGI would create a huge power imbalance, but nations could sabotage their rivals’ efforts, bringing us to **Mutual Assured AI Malfunction (MAIM)**, a stable deterrence regime that the authors spend the rest of the paper discussing how to achieve.

**Nonproliferation** comes from actors investing in:

- **compute security**, by which you track where high-end AI chips go and [curb smuggling](https://www.henryjosephson.com/writing/https%20//www.aipolicybulletin.org/articles/ai-chip-smuggling-is-the-default-not-the-exception)
- **information security**, by which you prevent [advanced model weights from falling into the hands of bad actors](https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2800/RRA2849-1/RAND_RRA2849-1.pdf)!\[\[Pasted image 20250321131132.png\]\]
- and **AI security**, by which you can detect and prevent malicious use. **Competitiveness** comes from *military strength*, *economic security* (protect those supply chains!), *robust legal frameworks*, and *political stability*.

## Chapter 2 — Introduction

AI will touch everything — we’ve been using all sorts of analogies, but none seem to really capture everything we want. HSW think nuclear is as close as we can get, though: huge potential for gain… and also for killing us all.

We can learn from the way we managed those technologies when we’re trying to manage these. Specifically,

> Nuclear annihilation has been avoided thus far despite significant tensions between nuclear states in part through the deterrence principle of Mutual Assured Destruction (MAD), where any nuclear use would provoke an in-kind response.

High-end chips could be today’s uranium — a simple, easy-to-control bottleneck. To ensure we have a comprehensive strategy to [capture the benefits while mitigating the risks](https://www.lesswrong.com/posts/dLbkrPu5STNCBLRjr/applause-lights), we have a bunch of tough problems to figure out:

| Topic | Tame Technical Subproblem | Wicked Problems |
| --- | --- | --- |
| Malicious Use | Train AI systems to refuse harmful requests | Coordinate nonproliferation among countries, incentivize AI deployers to prevent misuse, validate know‐your‐customer information |
| Deterrence | Prepare cyberattacks for AI datacenters | Define escalation thresholds and signal intent, surveil rival AI projects, adapt verification measures as AI evolves |
| Compute Security | Upgrade AI chip firmware to add geolocation functionality | Enforce export controls to track AI chips, report suspicious shipments to allies, verify the decommissioning of obsolete AI chips |
| Information Security | Patch known vulnerabilities in AI developers’ computer systems | Counter insider threats, balance security measures with productivity, prevent ideological leaks |
| Military Strength | Design military drones | Secure supply chains, adapt military organizational structures to diffuse AI, maintain meaningful human control over AI‐augmented command and control |
| Economic Strength | Improve AI performance on economically valuable tasks | Draw from legal frameworks for AI agents, establish and evolve multiagent infrastructure, preserve stability amid automation |
| Loss of Control | Research methods to make current AIs follow instructions | Steer a population of rapidly evolving AIs during an intelligence recursion, co‐evolve safeguards with AI systems, red team AIs to identify unknown unknowns |

## Chapter 3 — AI Is Pivotal for National Security

HSW contend that there are three threats to AI could threaten national security — through **rival states**, **rogue actors**, and on their own as **uncontrolled AI systems**.

### Rival States / Strategic Competition

Without a single world government, you protect yourself by being strong. AI will change how you can be strong — indirectly and economically by having lots of AI chips, and more directly by by enabling military dominance through helping you build both:

- “subnuclear” superweapons that’d let you project power without disrupting MAD deterrence (these look like crazy cyberweapons, autonomous drones, etc), and
- superweapons that do erode MAD, e.g. by enabling missile defense that actually works, improving underwater surveillance enough to remove [nuclear submarines’](https://en.wikipedia.org/wiki/Hyman_G._Rickover) second-strike capabilities, or stuff we can hardly dream of.

Obviously, building new superweapons disrupts the balance of power.

> Faced with the specter of superweapons and an AI-enabled strategic monopoly on power, some leaders may turn to *preventive action*. Rather than only relying on cooperation or seeking to outpace their adversaries, they may consider sabotage or datacenter attacks, if the alternative is to accept a future in which one’s national survival is perpetually at risk.

### Rogue Actors / Terrorism

AI lowers the bar for terrorism. It makes it easier to build bioweapons and to commit cyberattacks against critical infrastructure. Because AI is often offense-dominant (biological weapons can self-replicate very quickly, and “Critical infrastructure systems often suffer from”patch lag,” resulting in software remaining unpatched for extended periods, sometimes years or decades”), which makes this all the more worrying.

### Loss of Control / Rogue AIs

As AIs get more and more capable, we’ll probably hand over more and more control. Economically, this is a vicious cycle — once you start using AI as a manager, you need to keep using more to keep pace. It’ll be very difficult to detangle the AIs once we start using them, and the cost of cutting them out will only increase. The same goes for national defense — the power

> does not stem from any outright seizure; it flows form the fact that a modern force lacking such technology would be outmatched. The loss of control unfolds not through a dramatic coup, but through a series of small, apparently sensible decisions, each justified by time saved or costs reduced.

And it only takes one rogue AI to get really bad results. The rogue AI could mimic tactics from rogue states like North Korea — maybe they’d make billions from cyberattacks and [cryptocurrency theft](https://www.cnn.com/2025/02/24/politics/north-korean-hackers-crypto-hack/index.html) — or they could just use robotics to get a physical foothold. If AI can improve recursively, we might end up with an intelligence explosion — once you have a single AI that can operate as a human-level software engineer, you can automate R&D pretty easily. This puts the next generation of models behind another layer of opacity, which is even more worrying when you look at the track record less-intelligent beings have with respect to controlling more-intelligent beings.

There’s no silver bullet to control recursive self-improvement, but it’s an attractive target for actors who want to get a strategic monopoly, since it’s a clear way to outpace rivals. Recursive self-improvement could cement first-mover advantages, and geopolitical pressures mean most nations will be willing to tolerate these risks — remember when Manhattan Project scientists thought nuclear explosions could start a chain reaction that ignites the atmosphere?

### current strategies Suck

**It’s all just code, bro** — or, as HSW call it, the *Hands-off (“Move Fast and Break Things”, or “YOLO”) Strategy.* This is pretty clearly not a credible national security strategy.

**PauseAI** — the *moratorium strategy*. These folks are, on HSW’s account, naive. They assume that major powers would actually stop if they saw evidence of dangerous capabilities, or that any treaties would have teeth.

**We have to beat China** — the *monopoly strategy*. Think Manhattan Project for AI. HSW don’t love it. If you put all the top US AI talent (many of whom are necessarily Chinese nationals) in a single airgapped facility in the New Mexico desert, they could “easily \[be\] observed by satellite and \[be\] vulnerable to preemptive attack.” For something as decisive as AGI, do we really think that China would sit back and let it happen?

![](https://cdn.prod.website-files.com/6747c60014d14fc1cba63c28/67c6771ac0fd3306475e6f1d_Possible%20outcomes-02-02.png)

To get around this, HSW propose the **Multipolar strategy**.

## Chapter 4 — Deterrence with Mutual Assured AI Malfunction (MAIM)

You can maintain a MAIM regime by:

- **preserving rational decisionmaking** — i.e. clarifying the escalation ladder of “espionage, covert sabotage, overt cyberattacks, possible kinetic strikes, and so on.” If you want deterrence to hold, both sides need to know that the other would MAIM them in a way that wouldn’t cause escalation.
	- This weakens if rogue actors get AI, though (so we should prevent chip smuggling and model weight theft).
- **Get good at disrupting AI projects without escalation** — especially when the alternative is kinetic attacks, which would almost certainly lead to huge escalation, coming up with ways to “severely disrupt destabilizing AI projects with minimal diplomatic fallout” is super important. HSW give a nice long list that hopefully isn’t too infohazardous (I think the NSA has figured most of them out, anyway).
- **Build your datacenters far from population centers**. If everything goes to shit, at least your cities are safe(r).
- **Clarify which AI uses are destabilizing and which are acceptable** — more transparency here means that mundane utility doesn’t get disrupted. Probably requires coordination, which could come from…
- **AI-assisted inspections**. If you trust the outputs of an AI, they could be a great way to check more information than any human ever could, while reducing the infosec concerns with giving humans from the other side knowledge of what, exactly, you’re working on.

## Chapter 5 — Nonproliferation

You can constrain other states by constraining *intent* or by constraining *capabilities*. You can’t really do the latter with rogue actors, though, so you’d better also be able to constrain capabilities through **compute security**, **information security**, and **AI security**.

### 1\. Compute Security

AI is uniquely chip-dependent, and there are easy bottlenecks for (theoretically) making sure these don’t fall into bad actors’ hands. To do this, we can use **export controls** on compute, just like we have for key nuclear and chemical weapon tech. That’s because compute is a key input, and because export controls work — or at least they *can* work if we can keep track of all the cutting-edge chips (**record-keeping**) and actually stop smugglers (**enforcement**).

We can also install on-chip features, like GPS to check if a chip is in an export-controlled place (**geolocation and geofencing**), making sure they’re being used by people we’ve authorized to use them (**licensing and remote attestation**), preventing them from combining with technology we don’t want them to connect to (**networking restrictions and operational modes**), and by making these controls tough to override (**physical tamper resistance**).

### 2\. Information Security

Don’t let sensitive information get to rival or rogue actors. You can’t put information toothpaste back into the tube. Pay close attention to who has access to the actual stuff you need to do inference, and don’t let them get the stuff they need to replicate the stuff you’ve built to do inference (**Model Weights and Research Ideas as Core AI Information**). You can do this technologically, but people are the weakest link — make sure you trust everyone who works for you, and recognize that some people will be ideologically-motivated to expose your model weights (**Information Security is a Technical and Social Challenge**). You’re still fucked if a state-level actor with zero-days you’ve never heard of, ten thousand experts, billions of dollars, and a spy network out of a Bond movie decides to target you, though (**Superpower-Proof Information Security Is Implausible**).

Get better information security by following the classics (**Corporate Measures: Enhancing Datacenter Security and Insider Threat Programs**) and asking friendly governments for help detecting and responding to attacks (**Governmental Role: Assist With Threat Intelligence**). International governance on some pretty-obvious red lines (HWS suggest open-weight AI virologists) are plausible (**International Agreements: Establishing a Red Line on Open-Weight AI Virologists**), but only among entities that actually agree to international coordination efforts, which brings us to…

### 3\. AI Security

#### Malicious Use

How do we stop rogue actors from using AI to do really bad stuff? Luckily, refusal training is actually pretty good, we can selectively grant API calls to people we’re pretty sure aren’t terrorists, and we can configure circuit-breakers that trip if they detect certain weapon-ish inference patterns (**Model-Level Safeguards Can Be Fairly Robust**). We can make sure we aren’t giving important capabilities to bad people (**Balancing Access Through Know-Your-Customer Protocols**), and we can test this regularly to ensure we’re actually achieving this (**Mandatory Government Safeguard Stress Testing**). If we make developers partially responsible if their systems are maliciously used to cause significant harm, we can create a strong incentive to enhance safeguards proactively (**Incentivizing Continuous Improvement Without Licensing**).

#### Loss of Control

Ok, well how do we stop the AIs themselves from going rogue, especially when they’ll probably fail in ways that we don’t understand (**AI Systems Exhibit Unpredictable Failure Modes**)? HSW say there are two key ways:

**Controlling AIs’ Emergent Value Systems** AIs get coherent value systems. We can control their outputs, but this might not actually change what’s represented underneath – we can also shift internal representations, though. We could also try to ensure models have values similar to representative assemblies of citizens (Iason Gabriel has some work on this), though I’m not sure this is what’d actually be best (people are often wrong).

This is all well and good when we’re talking about systems we can easily control, but what about runaway superintelligence?

**Controlling an Intelligence Recursion** It’s tough to control recursive self-improvement. We have to make sure the model-training AIs themselves remain unable to exfiltrate themselves and remain honest (*model-level control*), that they can’t get outside of the datacenter even if they wanted to (*boxing*), and that we can check if they’re deceptive, about to break through, or otherwise malicious (*monitoring*).

## Chapter 6 — Competitiveness

HSW identify four key regions where we need to stay competitive:

### Military Strength

It isn’t enough to think it, you have to do it, and you have to do it at sufficient scale.

Drones are everywhere, and right now largely depend on Chinese supply chains. We don’t just need to diversify — we also need to ensure that states can diffuse tensions with open crisis hotlines, regular communication, and other *confidence-building measures*. (**Guarantee Drone Supply Chains and Reduce Misunderstanding**) Humans are just too slow and expensive to stay competitive. (**Integrate AI into cyber offense**) We’ll have to ensure humans stay in the loop at least a little — HSW offer that “demanding human approval of all individual lower-level engagements may be less important than ensuring explicit human approval for more severe or escalatory attacks” (**Diffuse AI Into Command and Control**).

### Economic Security

We’re *really* reliant on Taiwan right now, and China’s probably going to invade sometime soon. Such an invasion would undermine the West’s current chip advantage much more than it’d hurt China — we should invest in chip fabs entirely within our own territories (**Manufacture AI Chips**). We should also make sure that top AI talent can get to the US as easily as possible — we’re failing at this right now:

> 60% of non-citizen AI PhDs working in the United States reported significant immigration difficulties, and many indicated that these challenges made them more likely to leave.

It’s much easier for the US to lead on AI when we keep the best researchers in the US working for US firms, especially when the alternative is them working elsewhere (**Facilitate Immigration for AI Scientists**).

### Law

AI agents are coming, so we should make sure that they do things we want them to do — at least generally (**Aligning Individual AI Agents**) by ensuring that they take a reasonable level of caution (**Duty of Care to the Public (Reasonable Care)**), stay honest (**Duty Not to Lie**) and stay faithful to the principals for whom they act — this includes keeping the principals informed (**Duty of Care to the Principal (Fiduciary Duties)**).

We can also affect the way agents work — we’re building them, after all — at both the individual (**Custom Goals and Market-Driven Variations**) and group (**Aligning Collectives of AI Agents**) levels. With groups, we’ll have to actually build ways to do this on more than vibes (**Establishing Trust Mechanisms and Institutions**) — HSW suggest the following:

- *Insurance* to underwrite risks and absorb liability from users and developers,
- *Action firewalls* to make sure bad things don’t happen,\[^4\]
- *Human oversight services* to make human verification easier,
- *Reputation systems* to aggregate and persist information about particular agents, and
- *Mediation and collateral arrangements* to make sure that disputes are transparently resolvable.

They also ensure that each agent be directly connected to human legal entities (**Linking AI Agents to Human Legal Entities via IDs**) and suggest that, especially given the unlikelihood of getting a definitive answer in the near future, we avoid particularly thorny topics about whether AIs are moral patients (**Deferring Consideration of AI Rights**).

### Politics

AI is going to be really tough for democracy. It’ll make it tough to tell what’s true and what isn’t, while simultaneously enabling large-scale censorship and mass surveilance (**Erosion of the Information Ecosystem**). That said, AI could also make it tougher to suppress good information (**AI as a Tool for Clarity**) and could make it easier for us to predict the future (**AI Forecasts May Be Cheaper and More Accurate than Human Ones**), which would be especially useful when the stakes are high (**Forecasting with AI During Crises**) and when people in power can be better-informed (**Empowering Decision-Makers with AI Insights**).

AI is also going to change the labor market in ways we can’t yet fully grasp (**Automation and Political Stability**). Unlike previous technological revolutions that unfolded gradually over decades, AI-driven automation could upend employment patterns at unprecedented speed. Even the Industrial Revolution, which occurred more slowly, caused significant disruption. Traditional solutions like retraining programs may not work if AI capabilities advance faster than people can develop new skills, and our existing social safety nets weren’t designed to handle massive cross-sector unemployment.

We don’t know exactly who’ll benefit and who won’t from this shift (**Uncertain Winners and Losers**). If economic bottlenecks (like legal hurdles to building factories) remain significant, people with skills that AI can’t replace might capture most of the economic gains. But if AI becomes truly general-purpose and eliminates these bottlenecks, the owners of AI compute could end up with most of the wealth.

To prevent extreme concentration of wealth and power (**Wealth and Power Distribution**), policymakers could consider targeted value-added taxes on AI services with rebates. But merely redistributing wealth is vulnerable to governments later changing their minds. For a more durable solution, HSW suggest distributing power by giving citizens unique keys tied to portions of compute that only they can activate or lease out. This would give people lasting economic leverage similar to how workers currently can withhold their labor, helping prevent the extreme concentration of wealth and authority that otherwise might result from widespread automation.

HSW conclude that maintaining competitiveness in the age of AI requires expanding domestic drone manufacturing, creating legal frameworks that keep AI agents accountable to humans, and realistically addressing automation’s impact on labor markets. Most critically, they emphasize that dependence on Taiwan for advanced AI chips represents a major vulnerability that Western countries must address by developing guaranteed domestic supply chains, despite the significant investment required.