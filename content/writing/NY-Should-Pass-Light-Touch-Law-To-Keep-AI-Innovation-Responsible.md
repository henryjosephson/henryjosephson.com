---
title: NY Should Pass Light-Touch Law to Keep AI Innovation Responsible
date: 2024-10-13
description: Arguing that NY should pick up the torch that CA dropped after Newsom vetoed SB1047.
published: true
---

## **Or “Alex Bores Should Introduce SB1047 In NY”**

*Author’s note: Since writing this, I’ve read [Scott Alexander’s SB1047 postmortem](https://www.astralcodexten.com/p/sb-1047-our-side-of-the-story), which has made me think that the DSA / left wing of New York’s democratic party might be more amenable to this sort of bill than I initially thought.*[^1]

The biggest AI policy news of the past week has been Gavin Newsom’s veto of SB1047. Especially in an era of concern about [catastrophic risks from advanced AI](https://www.nytimes.com/2024/09/16/business/china-ai-safety.html), SB1047 was CA State Senator Scott Weiner’s attempt at light-touch regulation which would make sure that the corporations pushing the frontier do it responsibly.

Because I want to keep this piece short and because I think my audience is sympathetic, I won’t argue why I think some sort of frontier AI regulation would be good.[^2]

[Here](https://thezvi.substack.com/p/guide-to-sb-1047)’s a quick summary of what the bill would have done:[^3]


>IF AND ONLY IF you wish to train a model using $100 million or more in compute (including your fine-tuning costs):

>You must create a reasonable safety and security plan (SSP) such that your model does not pose an unreasonable risk of causing or materially enabling critical harm: mass casualties or incidents causing $500 million or more in damages.

>That SSP must explain what you will do, how you will do it, and why. It must have objective evaluation criteria for determining compliance. It must include cybersecurity protocols to prevent the model from being unintentionally stolen.

>You must publish a redacted copy of your SSP, an assessment of the risk of catastrophic harms from your model, and get a yearly audit.

>You must adhere to your own SSP and publish the results of your safety tests.

>You must be able to shut down all copies under your control, if necessary.

>The quality of your SSP and whether you followed it will be considered in whether you used reasonable care.

>If you violate these rules, you do not use reasonable care and harm results, the Attorney General can fine you in proportion to training costs, plus damages for the actual harm.

>If you fail to take reasonable care, injunctive relief can be sought. The quality of your SSP, and whether or not you complied with it, shall be considered when asking whether you acted reasonably.

>Fine-tunes that spend $10 million or more are the responsibility of the fine-tuner.

>Fine-tunes spending less than that are the responsibility of the original developer.


The bill is dead in California,[^4] but we could bring it back to life in New York. In the rest of this piece, I’ll briefly explore:



1. Why here and now?

2. What would have to change in the bill?

### Why New York? 

New York passes legislation. We introduced more bills than any other state last year, and enacted the third-most.[^5]

More specifically (as you well know, you’re quoted in the article), the New York legislature is already [thinking a lot about AI](http://entral-ny/politics/2024/10/03/new-york-lawmakers-on-drafting-new-ai-regulations). Senator Kristen Gonzalez’s [bill](https://spectrumlocalnews.com/nys/central-ny/news/2024/07/31/sen--kristen-gonzalez-on-her-bill-to-oversee-a-i--in-state-government) from last session was just the start: there are at least 40 AI bills in assembly committees right now,[^6] which means there’s motivation to get this done. 

New York isn’t just [home to 5.7% of the nation’s tech jobs](https://www.osc.ny.gov/files/reports/osdc/pdf/report-10-2023.pdf), behind only California and Texas — it’s also an economic powerhouse all to itself. 52 of this year’s Fortune 500 companies [were based in NY](https://www.visualcapitalist.com/map-the-number-of-fortune-500-companies-in-each-u-s-state/), second only to — you guessed it — California.

New York is in a great spot to act: strike while the iron is still hot — we’re in session right now, people want to pass AI laws, and we can use SB1047 while it’s fresh in everyone’s minds as both inspiration and a punching bag to get NY’s bill through (more on that second part below).

Most importantly, if we craft the law correctly it can *de facto* apply outside of NY. This is something that basically only CA or NY could easily do, and the *de facto* national effects would’ve been one of SB1047’s biggest benefits. 

The rough idea is as follows: New York is a giant market. If a company has to choose between complying with light-touch regulation or being cutting off from every company in New York, they’ll probably choose the former. Crucially, though, if we craft the regulation just right and pick a target that’s tough to edit in a few key ways, it can be cheaper to just use the NY-compliant version everywhere — even the places that don’t require it.

The [textbook example](https://archive.org/details/tradingupconsume0000voge) of this is California’s auto emissions standards. In the ‘90s, the EPA let CA set emissions laws that were stricter than the rest of the country’s. It turned out that, in many cases, it was just cheaper for car manufacturers to sell a CA compliant car everywhere than it was for them to make two versions.

This is also part of what makes a new CA animal welfare law so potent: [Prop 12](https://en.wikipedia.org/wiki/2018_California_Proposition_12), as it’s called, affects any pork that’s sold in California, no matter where it’s from. Producers in other states need to follow CA’s rules if they want access to CA’s massive market. Though the National Pork Producers Council argued it was unconstitutional regulation of interstate commerce, the Supreme Court ruled it [kosher](https://www.vox.com/future-perfect/23721488/prop-12-scotus-pork-pigs-factory-farming-california-bacon). 

As I’ve [written before](https://www.henryjosephson.com/AI-CA-Effect-2022.pdf), AI is a particularly good candidate for this sort of effect —training runs are very expensive, so it’d be tough to do two separate mega-training runs — one for NY, with a safety plan, and one for the rest of the world without one — just to dodge the bill. You could stop training early and release a half-baked model in NY, but you’d then be running a similar risk as you’d run if you just stopped selling your model in New York at all: every company in New York City using one of your competitors.

What’s more, the ubiquity of the regulation is important for another reason: it means that companies in NY can’t avoid the regulation by leaving. This is important, since one of the biggest critiques levied against SB1047 was that it would drive tech innovation of of California[^7] — preventing covered models from being sold in NY, no matter where they were trained, avoids this problem. 

Let’s explore some other changes we might need to make to SB1047 before we pass a similar bill in NY.


### What needs to change about the bill?

One of the biggest reasons to move on SB1047-esque legislation now is that we can improve on the ways it failed. Learning opportunities at this scale are rare, and the farther SB1047 gets into the rear-view mirror, the less applicable its lessons will be.

Some changes are more substantive — we can probably lose the section establishing the CalCompute cluster (especially with the plans for the NY cluster proceeding separately), and saving the compute cluster KYC for another bill might streamline things. 

Some changes, though, are cosmetic — a large amount of opposition to SB1047 was based on misunderstandings of what the bill would actually do.

For one, many were concerned that the bill would [disproportionately impact startups](https://static.politico.com/95/0a/a317efe44616af436ce6a4f32647/founder-led-statement-on-sb1047-june-20-2024-2.pdf), when the bill only applied to training runs costing more than $100 million.[^8] It’s tough to overstate how big that is — See fig. 2 [here](https://epochai.org/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year) — no model we know of has reached the 10^24 FLOP threshold.

The[ median series C round for an AI startup in 2024 is $54 million](https://aventis-advisors.com/ai-valuation-multiples/). Even if startups were spending every cent of cash they had on hand on training a new foundation model, none but the largest would be affected by the bill.

SB1047 would have also covered fine-tuning runs over $10 million — would this have crushed startups? Well, [Andreesen Horowitz estimated earlier this year](https://a16z.com/generative-ai-enterprise-2024/) that “the average spend across foundation model APIs, self-hosting, and fine-tuning models was $7M across the dozens of companies we spoke to.” Even if we assume that all the money was going towards a single fine-tuning run, that fine-tuning run still wouldn’t be affected. 

You could very well reply (as I imagine a16z would), that these numbers are only going to go up, and that many startups could be spending over $10 million on single fine-tuning runs within a year or so. These are valid concerns! That’s why the bill would create a group of experts who can raise the threshold but can’t lower it. The point of the bill isn’t to make things harder for startups, and it’d be trivial to include a line affirming that the intent is to make sure the frontier is pushed responsibly, not to stop your Y-Combinator-backed GPT-4 wrapper.

There are a few more examples — e.g. the worry that the “kill switch” requirement would *de facto* kill open source models[^9] and the worry that the liability was too broad.[^10] 

I see these all as PR failures more than legislative failures, and I don’t think it’d be too difficult to speak as if you opposed SB1047’s supposed suppressive effects on startups and open-source models — that’s why *our* bill only applies to closed-source and big tech training runs that cost more than the GDP of a micronation. 

To [paraphrase Zvi](https://thezvi.substack.com/p/guide-to-sb-1047), there’s only one scenario in which AI gets slowed down by a bill like SB1047:



1. The model in question is bigger than one we’ve ever seen before,

2. It would have been released without the bill,


3. But its developers didn’t take reasonable care — or even have a plan — to reduce the risk that their model causes mass casualties or >$500 million in damages.

And you know what? If a developer is unwilling or unable to take reasonable care to stop their model from being the but-for cause of mass casualties or >$500 million in damages? That’s the sort of developer I’d want to stop.

We have an opportunity, right now, to make sure that capabilities advance responsibly without stifling innovation, harming startups, or disincentivizing open-source development. We can address misconceptions, clarify intent, and maintain focus on keeping the largest models responsible.

The time to act is now, while the lessons from California are fresh and the need for thoughtful AI governance is clear.


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     More specifically, Alexander writes about a sense that SB1047 was the best chance the AI industry would get at light-touch regulation, and that when the next bill comes from anti-big-tech folks further to the left than Sen. Weiner, the tech companies that opposed SB1047 will have to lie in the bed they've made. Excerpts from Jacobin and Current Affairs seem to back up that socialists are genuinely interested in this, and give a sort of “us vs. the capitalists who don’t care about safety” vibe that makes me (an Albany outsider) think that DSA support might be more feasible than I’d initially think.

[^2]:
     That’s another blogpost that’s in the works, though!

[^3]:
     It’s from Zvi Moshowitz (who lives in Brooklyn!).

[^4]:
     Unless the CA legislature overrides Newsom’s veto, [though they haven’t overturned a veto since 1979](https://calmatters.org/politics/2024/10/californa-veto-overrides/).

[^5]:
     You probably wouldn’t guess the first two — Texas in first place, then Tennessee in second. [Source](https://fiscalnote-marketing.s3.amazonaws.com/FN080823-Most-Effective-States-WP_v2.pdf)

[^6]:
     This is the count of 2024 bills with the string “artificial intelligence” in their title. This is probably an underestimate, since some AI bills probably don’t say “AI” in the title. If you want to check this yourself, I have a good script to download a json of all current NY bills [here](https://github.com/henryjosephson/State-Legislator-Effectiveness-Dashboard/blob/main/src/state_specific_data_downloads/NY_read_senate_api.py), or you can use [Legiscan’s bulk download tool](http://legiscan.com/datasets).

[^7]:
     To be clear, I don’t think SB1047 would have caused companies to leave CA in this way, but others did.

[^8]:
     It also applied to fine-tuning runs that cost >$10 million. I cover this two paragraphs later.

[^9]:
     Consider the worries that the requirement for a “kill switch” would *de facto* kill open source models. The original SB1047 only applied this to instances “controlled by a developer” — i.e. not the open-weights version I’m running on my laptop — but the fact that Garry Tan wrote [a letter](https://static.politico.com/95/0a/a317efe44616af436ce6a4f32647/founder-led-statement-on-sb1047-june-20-2024-2.pdf) contending that “the requirement of a Kill Switch is possibly a backdoor open source AI ban” means this point wasn’t clear enough. It’d be easy to say “SB1047 sucked because it could have backdoored a ban of open-weights AI. We think that’s bad! That’s why no portion of this bill should be interpreted as backdooring a ban on open-weights or open-source AI.”

[^10]:
     The same thing goes with the worry that an open-source “[model developer is liable if the hackers use [their model] to hack the power grid](https://x.com/krishnanrohit/status/1824559133904998619)” — the liability only kicks in if the harm materially stems from the developer’s failure to take reasonable care. I think this was pretty clear in the original text of the bill, but it’s once again easy to say “you aren’t liable if someone uses your model to do harm in a crazy way you couldn’t reasonably have foreseen,” and we can easily codify this in the intent of the bill. The point isn’t to sue VSCode for making it easier to commit cyberattacks, it’s to sue models that counterfactually enable harms that wouldn’t happen without the model.”