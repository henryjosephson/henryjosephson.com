---
title:  NY Introduced Light-Touch Legislation to Keep AI Innovation Responsible! (Alex Bores RAISE Act)
date: 2025-03-05
description: A quick response and analysis of Alex Bores's RAISE Act, which looks like a good way to address risks from frontier AI without stifling startups or impeding innovation.
published: true
---

*I’m writing this up as a quick take, where “quick” means <1 hour. More detailed analysis will come at a later date.*

This morning, New York State Assemblyman Alex Bores introduced the [Responsible AI Safety and Education Act](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=A06453&term=&Summary=Y&Actions=Y&Text=Y). I’d like to think some of [my previous advocacy](https://www.henryjosephson.com/writing/NY-Should-Pass-Light-Touch-Law-To-Keep-AI-Innovation-Responsible.html) was helpful here, but I know for a fact that I’m [not](https://futureoflife.org/ai-policy/poll-shows-popularity-of-ca-sb1047/)[the](https://calltolead.org/)[only](https://safesecureai.org/experts)[one](https://economicsecurity.us/campaign/ca/) who supports legislation like this that only targets frontier labs and ensures the frontier gets pushed responsibly.

To quote [Dean Ball](https://www.hyperdimensional.co/p/what-comes-after-sb-1047), whose takes are generally good:

> the AI safety movement, on the whole, is a long-term friend of anyone who wants to see positive technological transformation in the coming decades. Though they have their concerns about AI, in general this is a group that is pro-science, techno-optimist, anti-stagnation, and skeptical of massive state interventions in the economy (if I may be forgiven for speaking broadly about a diverse intellectual community).

I know AM Bores. He's pro-science, anti-stagnation, and one of the smartest guys I've met. He has New Yorkers’ best interests at heart — it’s why I’m not surprised that, on my first read of the bill (and you should always read the actual bill) it does a pretty darn good job. Three things in particular stand out to me:

## 1\. Including distillation

This is, on my first read, the biggest difference between Bores’ bill and other efforts like [IL HB3506](https://www.ilga.gov/legislation/fulltext.asp?DocName=&SessionId=114&GA=104&DocTypeId=HB&DocNum=3506&GAID=18&LegID=162191&SpecSess=&Session=) and last year’s [CA SB1047](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1047). That is, it defines “frontier models” as not only those using >10^26 training FLOPs or >$100 mil in training costs, but also as:

> an artificial intelligence model produced by applying knowledge distillation to a frontier model as defined in paragraph (a) of this subdivision.

What’s distillation? Don’t worry, the bill defines that, too:

> “Knowledge distillation” means any supervised learning technique that uses a larger artificial intelligence model or the output of a larger artificial intelligence model to train a smaller artificial intelligence model with similar or equivalent capabilities as the larger artificial intelligence model.

Note that, on this definition, the bill doesn't affect you if your distillation isn't ~as capable as the original!

As [Deepseek showed us](https://peterwildeford.substack.com/p/ten-takes-on-deepseek), it’s super feasible to achieve frontier progress with a smaller model by distilling a bigger one. If this bill didn’t include distillation in the definition, companies could simply train enormous models privately and then release distilled versions that technically fall below the compute threshold while maintaining most of the capabilities (and risks) of the original. I’m not a fan of loopholes, and I’m glad to see this one closed.

## 2\. Sparing the little guy

The bill wouldn’t hurt academics or startups, which I think is super important. There’s an explicit exemption for academics:

> Accredited colleges and universities shall not be considered large developers under this article to the extent that such colleges and universities are engaging in academic research. (§ 1420(9))

And, after defining a frontier model as either

> 1. an artificial intelligence model trained using greater than 10^26 computational operations (e.g., integer or floating-point operations), the compute cost of which exceeds one hundred million dollars.
> 2. an artificial intelligence model produced by applying knowledge distillation to a frontier model as defined in paragraph (a) of this subdivision.

The bill explicitly says that its requirements would only apply to companies that have **both**:

1. Trained at least one frontier model with a compute cost exceeding $5 million, AND
2. Spent over $100 million in aggregate compute costs training frontier models.

I worry that critics of the bill will focus too much on the first of these bullets and not the second. Sure, there might be many startups that can spend ~$5 million on a single training run — but how many of those companies have spent over $100 million on compute overall? Much, much fewer.

I also worry that critics will misinterpret the forward-looking provision in 1421.9 as applying to any old startup. It wouldn’t. This provision only applies to companies that are specifically planning to train models that would qualify them as “large developers” — meaning they’re planning to spend $5M on a single model AND will have spent over $100M in aggregate compute costs.

Let’s be clear about what this means in practice: we’re talking about extremely well-funded companies that have raised hundreds of millions of dollars and are deliberately setting out to train frontier-scale models. Your typical Series A or B AI startup developing specialized applications or fine-tuning existing models would be nowhere close to these thresholds. The forward-looking requirements are also lighter than those for established large developers — they’re simply asked to create a safety protocol (with fewer requirements than full-fledged large developers) and publish a redacted version.

This is a reasonable “heads up” mechanism for companies transitioning into frontier model development, not an onerous burden on everyday startups. It ensures that safety considerations begin before the first massive training run, rather than after capabilities (and potential risks) have already emerged.

## 3\. Demanding the bare minimum to be effective

Especially in a fast-moving field like AI where innovation could be really important, it’s crucial not to throw out the baby with the bathwater and halt progress, which could be [really, really good](https://darioamodei.com/machines-of-loving-grace).

This is why it’s important to look at what the bill actually requires the massive developers to do:

1. **Don’t deploy models with “unreasonable risk of critical harm” (§1421.2)** - The bill clearly defines “critical harm” as events causing death or serious injury to 100+ people or at least $1 billion in damages. This includes creation or use of WMDs, or AI that acts with limited human intervention in ways that would constitute crimes requiring intent or recklessness. If you’re ok with deploying this kind of model, we probably disagree on something more fundamental.
2. **Implement a written safety and security protocol (§1421.1(a))** - These protocols must specify “reasonable protections and procedures” to reduce the risk of critical harm and describe cybersecurity protections against unauthorized access, especially by sophisticated actors.
3. **Publish redacted versions of safety protocols (§1421.1(c))** - you don’t need to publish trade secrets or anything that’d be particularly compromising, but you do need to show the public your plan.
4. **Retain records of safety protocols and testing (§1421.1(b))** - Testing procedures must evaluate if models pose “unreasonable risk of critical harm,” including assessing potential misuse.
5. **Get an annual third-party audit (§1421.4)**
6. **Report safety incidents within 72 hours (§1421.6)** - Quick reporting of incidents like autonomous behavior, unauthorized access, or control failures enables rapid response to emerging threats.

That is, the bill requires frontier labs to:

1. Think systematically about safety before deployment
2. Test for potential harms
3. Create technical guardrails against misuse
4. Submit to independent verification
5. Maintain vigilance after deployment

These requirements aren’t burdensome for companies operating at this scale. [Anthropic](https://assets.anthropic.com/m/24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf), [OpenAI](https://cdn.openai.com/openai-preparedness-framework-beta.pdf), [DeepMind](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0%20\(1\).pdf), [xAI](https://x.ai/documents/2025.02.20-RMF-Draft.pdf), and even [Meta](https://ai.meta.com/static-resource/meta-frontier-ai-framework/) (!) already publish responsible scaling policies and have internal safety protocols. The bill simply asks them to formalize these processes, get independent verification, and be transparent about potential risks.

What’s notable is what these requirements *don’t* do — they don’t stifle innovation for smaller startups, prevent companies from releasing new models, or impose impossible technical standards. They focus specifically on the most severe risks from the most powerful models from the best-resourced companies.

Instead, the regulatory burden is “Don’t deploy models that risk catastrophic harm, get a third-party audit once a year, and report serious safety incidents promptly.” That sounds pretty darn reasonable to me.

  

---

*Thanks to Thomas Dorsey, Noah Birnbaum, Mark Josephson, Jo Jiao, and Garrett Chalfin for their feedback.*