---
title: Tying Myself to the Mast
date: 2025-03-27
description: Credible and tough-to-reverse precommitment mechanisms are good! I've used one to make sure I post at least every other week.
published: true
---

![](/assets/odyss-bee-us.png)
*Ulyss-bees. If you don't get the bee reference, read the post.*

One of my fatal flaws is that I hate having free time.

I'll fill my schedule with cool and interesting and exciting obligations, and my skin will start to crawl when I have nothing to do. This is sometimes good — it means I'm almost always working on something. More often, though, it's bad — the breadth of things I've signed myself up to do means that things in the "important but not urgent" corner of the [Eisenhower Matrix](https://sps.columbia.edu/sites/default/files/2023-08/Eisenhower%20Matrix.pdf) can get consistently deprioritized. After all, if they're never urgent, then I'll just fill my time with the urgent-er things.

I think this blog probably falls into that corner. I think it's incredibly useful to give people who don't know me (and maybe want to evaluate me) a low-cost way to look into my head, so I think blogging is important, but there isn't anybody watching over my shoulder to check if I'm posting. It's just me.

When things in this corner are one-offs, I'm sometimes able to gaslight myself into thinking it's urgent by blocking off time to do deep work for it. I find this works less well for recurring things, though, especially when I inevitably miss one instance and my lizard-brain realizes that *I* get to decide whether there are any actual consequences to missing an instance. Crucially, I get to make that decision *after* I've made the error.

The straightforward option, then, is to just credibly and irreversibly precommit to doing the thing. Make future you's incentives align with present you's.

People have realized this is a good idea since [time immemorial](https://www.owleyes.org/text/odyssey/read/book-xii#root-219186-14/51005), yet people have relatively recently won [Nobel Prizes for suggesting that you do this](http://www.finnkydland.com/papers/Rules%20Rather%20than%20Discretion%20The%20Inconsistency%20of%20Optimal%20Plans.pdf), and I think it's a good stab at a [solution to Newcomb's Problem](https://basilhalperin.com/essays/newcomb.html).

How am I operationally doing this? Turns out there's a company offering incentives-as-a-service: [Beeminder](https://beeminder.com).

Now I'll get charged $5 if I don't add at least one new post every other week! More specifically, I added an api call to my `newsletter-sender` lambda function on AWS[^1] that increments the counter by one after it sends the emails. This level of granularity is important to me, because I want to be sure that whatever future me is actually incentivized to do is as close as possible to the thing current me wants to encourage. Here, I'm lucky, and the "I pushed a new blogpost!" function only runs if I actually push a new blogpost. This alignment does not happen by default, though, and it's important to be deliberate about it!

Regardless, by posting this piece, I'm pushing the deadline back two weeks — you can expect another piece from me before then.

[^1]: Remember when I [built my own backend](../My-Own-Blog-Backend.html)? Came in handy here!
