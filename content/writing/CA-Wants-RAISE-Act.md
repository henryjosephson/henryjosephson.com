---
title: California Recommends the RAISE Act
date: 2025-03-19
description: After vetoing SB1047, Gavin Newsom commissioned a report on what CA's AI governance efforts should look like. The recommendations look a lot like the RAISE Act.
published: true
---

Like all of you, I was up late last night reading the Joint California Policy Working Group on AI Frontier Models's [new report](https://www.cafrontieraigov.org/wp-content/uploads/2025/03/Draft_Report_of_the_Joint_California_Policy_Working_Group_on_AI_Frontier_Models.pdf) when it dropped last night. When Gavin Newsom [vetoed](https://www.gov.ca.gov/wp-content/uploads/2024/09/SB-1047-Veto-Message.pdf) SB1047 last November, he [created this commission](https://www.gov.ca.gov/2024/09/29/governor-newsom-announces-new-initiatives-to-advance-safe-and-responsible-ai-protect-californians/) and charged it with figuring out how California should approach AI governance. 

Especially because cries for "evidence-based AI policy" have historically been a sign that the crier cares about precedented harms and doesn't care about unprecedented harms.[^1] The unwillingness to consider is awfully reminiscent of the handful of scientists who spent decades alleging that "the science isn't settled!" when people tried to connect smoking to lung cancer.[^2] Just because we couldn't yet see enough of the smoking death curve to realize it's the same as the cigarette sales curve (see fig below) doesn't mean the facts are up in the air!

![](https://i.redd.it/68t5e5s7mkb71.jpg)
*They're the same curve. Credit Our World In Data.*

Anyway, I was a bit worried that the commission would use that "evidence-based" worry to dismiss harms we — thankfully — don't encounter every day, especially given that they were charged with doing so by someone who had just vetoed a bill that would address risks like that. But now that I've read the report? I'm really pleasantly surprised... and honestly? I'm getting a bit of deja vu. The expert commission recommends a bunch of policies for California, but I've seen most of them before.

And I've seen them in New York.

I've seen them in the RAISE Act.

## What Does the California Commission Actually Endorse?

The 35-page report lays out several key principles for AI regulation. Let's break down what they're actually recommending:

### 1. Transparency Requirements

The commission doesn't mince words about the importance of transparency:

> "Transparency is a fundamental prerequisite of social responsibility and accountability." (p. 20)

They note that among major foundation model developers, transparency is woefully inadequate right now:

> "The [2024 Foundation Model Transparency Index](https://crfm.stanford.edu/fmti/May-2024/index.html) documents an average score of 32% across major foundation model developers for data sourcing transparency." (p. 21)

The report even gets specific about what should be transparent: data acquisition, safety practices, security practices, pre-deployment testing, and downstream impact. 

### 2. Third-Party Assessment and Auditing

The commission doesn't just want companies to self-report — they want independent verification:

> "Third-party risk assessment...is essential for building a more complete evidence base on the risks of foundation models and creating incentives for developers to increase the safety of their models." (p. 23)

They go further, explaining how this changes market incentives:

> "When safety measures and risk assessments are publicly disclosed and verified, companies face stronger incentives to implement best practices, as deviations would be apparent and could attract greater scrutiny. This transparency coupled with third-party verification effectively creates a 'race to the top' rather than a 'race to the bottom' in safety practices." (p. 23)

The commission specifically recommends direct third-party evaluation of model capabilities:

> "Pre-deployment testing. Transparency into pre-deployment assessments of capabilities and risks, spanning both developer-conducted and externally-conducted evaluations, is vital given that these evaluations are early indicators of how models may affect society..." (p. 22)

This is big — **the committee recommends third-party evaluations on actual model capabilities**![^3] As we'll see in a sec, this **goes farther than the RAISE Act does**, which only asks for third-party audits of compliance with safety protocols.

### 3. Whistleblower Protections

The report recognizes that [internal company culture might suppress safety concerns](https://www.vox.com/future-perfect/353933/openai-open-letter-safety-whistleblowers-right-to-warn):

> "Whistleblowers can play a critical role in surfacing misconduct, identifying systemic risks, and fostering accountability in AI development and deployment." (p. 24)

### 4. Adverse Event Reporting

For when things inevitably go wrong, the commission recommends:

> "An adverse event reporting system...promotes continuous learning, reduces information asymmetries between government and industry, and enables both regulators and industry to coordinate on mitigation efforts." (p. 26-27)

### 5. Smart Thresholding

The commission doesn't just recommend any random thresholds — they specifically point to compute costs:

> "Compute thresholds are currently the most attractive cost-level thresholds, but they are best combined with other metrics for most regulatory intents." (p. 34)

They recommend focusing primarily on the largest models that could pose systemic risk, not startups or academic researchers — a direct refutation of one of the main criticisms levied against SB1047.

## How Does the RAISE Act Implement These Principles?

Remember when I wrote [a piece in October](/writing/NY-Should-Pass-Light-Touch-Law-To-Keep-AI-Innovation-Responsible.html) arguing that New York should pick up where California left off after Newsom's veto? Well, Alex Bores actually did it, and the RAISE Act aligns almost perfectly with what the California commission is now recommending. 

In my [analysis of the RAISE Act](/writing/RAISE-Act.html) when it was introduced a couple weeks ago, I highlighted three key strengths of the bill that now appear in the commission's recommendations:

### 1. Transparency Requirements

The RAISE Act directly implements transparency requirements similar to what the commission recommends:

> "[Large developers must] conspicuously publish a copy of the safety and security protocol with appropriate redactions and transmit a copy of such redacted safety and security protocol to the attorney general." (§1421.1(c))

Just like the commission recommends, the RAISE Act maintains a balance between transparency and protecting legitimate trade secrets through "appropriate redactions."

### 2. Third-Party Assessment and Auditing

The RAISE Act requires:

> "Beginning on the effective date of this article, or ninety days after a developer first qualifies as a large developer, whichever is later, a large developer shall annually retain a third party to perform an independent audit of compliance with the requirements of this section." (§1421.4)

The commission goes further than the RAISE Act here. While the RAISE Act focuses on auditing compliance with safety protocols (whether companies are following their own plans), the commission advocates for direct third-party evaluation of the models' capabilities themselves.

### 3. Whistleblower Protections

The RAISE Act includes comprehensive protections for employees who speak up about unsafe practices:

> "A large developer or a contractor or subcontractor of a large developer shall not prevent an employee from disclosing, or threatening to disclose, or retaliate against an employee for disclosing or threatening to disclose, information to the large developer or the attorney general, if the employee has reasonable cause to believe that the large developer's activities pose an unreasonable or substantial risk of critical harm..." (§1422.1)

### 4. Adverse Event Reporting

Just as the commission recommends, the RAISE Act requires prompt reporting of safety incidents:

> "A large developer shall disclose each safety incident affecting the frontier model to the attorney general within seventy-two hours of the large developer learning of the safety incident..." (§1421.6)

### 5. Smart Thresholding

The RAISE Act uses the exact type of thresholding approach the commission recommends, focusing on compute costs to identify large developers:

> "'Large developer' means a person that has trained at least one frontier model, the compute cost of which exceeds five million dollars, and has spent over one hundred million dollars in compute costs in aggregate in training frontier models." (§1420.9)

It also specifically exempts academic institutions to protect research:

> "Accredited colleges and universities shall not be considered large developers under this article to the extent that such colleges and universities are engaging in academic research." (§1420.9)

In my RAISE Act analysis, I highlighted how important it was that the bill "wouldn't hurt academics or startups" and praised this dual threshold approach that ensures only well-resourced frontier labs are covered.

### Safety Doesn't Mean Stifling Innovation


What's particularly striking is how both the commission report and the RAISE Act are grounded in the fact that regulation and innovation can coexist. The California report uses seat belts as a prime example of this balance:

> "The National Highway Traffic Safety Administration estimates that in the past four decades, seat belts have saved over 8,900 lives per year. This is a technology that demonstrably works. But the path to a national requirement was neither fast nor straight.
>
> In 1959, Volvo introduced the first modern, three-point seat belt. It took nearly a decade of fact-finding and debate—and overcoming opposition from the auto industry—for the federal government in the United States to adopt a mandate that all new cars include these safety devices in 1968. As late as 1984, a Washington Post poll found that 65% of Americans still opposed mandatory seat belt laws. Today, seat belts are an unquestioned, ubiquitous part of daily life." (p. 19)

The commission emphasizes that seat belt requirements managed to enhance safety without impeding the primary function of cars:

> "The inclusion of seat belts in cars does not impact the main beneficial function of the machine: transporting people from one place to another. Their requirement provides measurable public safety benefits without impeding the utility of the main technology. National seat belt laws have neither made American automakers less competitive than their foreign counterparts nor increased marginal costs to the point of making cars unaffordable." (p. 19)

The RAISE Act embodies this same principle in its focused approach on just the largest models. As I noted in my analysis:

> "What's notable is what these requirements don't do — they don't stifle innovation for smaller startups, prevent companies from releasing new models, or impose impossible technical standards. They focus specifically on the most severe risks from the most powerful models from the best-resourced companies."

I called this "demanding the bare minimum to be effective" in my RAISE Act analysis, and it's clear the commission has reached the same conclusion about the right balance. All too often, people think — wrongly — that we're on the Pareto frontier, and that the only way to improve on one axis is by getting worse on another. This just isn't true, and seatbelts are a classic example of this. The RAISE Act, which essentially codifies and standardizes much of what frontier developers are already doing,[^4] would be the same.

## What Are the Differences?

There are a few areas where the commission's report and the RAISE Act diverge, though they're relatively minor:

1. **Third-party evaluation scope**: As mentioned, the commission recommends broader third-party evaluation of model capabilities themselves, going beyond the RAISE Act's focus on auditing compliance with safety protocols.

2. **Scope of liability**: The commission doesn't explicitly address liability frameworks, while the RAISE Act includes provisions for civil penalties tied to compute costs.

3. **Implementation specifics**: The commission offers principles but doesn't get into the exact mechanics of implementation, whereas the RAISE Act contains specific statutory language.

4. **Technical definitions**: The RAISE Act provides more concrete definitions of terms like "critical harm" and "knowledge distillation," while the commission's report speaks more broadly about risks and technologies.

But these differences are vastly outweighed by the similarities.

## The Irony Is Delicious

So let me get this straight: Newsom vetoes SB1047, creates a commission to figure out what California *should* do instead, and they come back with recommendations that look remarkably like... SB1047. And while California is still figuring out what to do, New York is actually doing things. The NY legislative session is in June — this bill will probably go to a vote within 90 days!

The commission's report essentially provides intellectual backing for exactly the kind of targeted, proportionate approach the RAISE Act embodies. As the commission states:

> "Consistent with available evidence and sound principles of policy analysis, targeted interventions to support effective AI governance should balance the technology's benefits and material risks." (p. 2)

That's exactly what the RAISE Act does, focusing only on those models with the resources and capabilities to potentially cause significant harm.

It's hard not to see this as vindication for the approach many of us have been advocating: light-touch regulation that focuses just on the frontier, ensuring that these powerful technologies are developed responsibly without impeding innovation across the broader ecosystem.

Maybe California will end up passing a version of SB1047 after all. But New York isn't waiting around to find out.

[^1]: See [Casper et al. 2025](https://arxiv.org/abs/2502.09618) for a great discussion of this phenomenon.

[^2]: The canonical text here is Naomi Oreskes and Erik Conway's *Merchants of Doubt*, but it's kinda dry — I could hardly get through it. Interested readers should check out [Ozy Brennan's review](https://thingofthings.substack.com/p/the-four-guys-who-wouldnt-shut-up?utm_source=publication-search) instead.

[^3]: [Which I've recommended before!](/writing/AI-Safety-Institute-Politics.html)

[^4]: See the last paragraph of [my initial piece on the RAISE Act](/writing/RAISE-Act.html), which highlights each frontier lab's responsible scaling policy (or equivalent, they all have fancy names for them).