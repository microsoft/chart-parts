---
title: Introducing chart-parts
date: '2018-07-18'
path: /blog/introduction
---

## Introducing chart-parts (apologies for the late post)

<author-details name="Chris Trevino" github="darthtrevino" twitter="darthtrevino"></author-details>

Our team at Microsoft Research is passionate about making great user
experiences, and often our user experiences involve making charts. One idea
that we've found is particularly interesting is the
[_Grammar of Graphics_](https://www.springer.com/us/book/9780387245447)
by Leland Wilkinson.

Here's a [link to a talk](https://www.youtube.com/watch?v=qqffsEHKMcM) I gave
at React-Conf 2018 describing the intent behind this project. There are a lot
of great charting libraries in the JavaScript ecosystem - however, we wanted
something more flexible, that did have an encoded taxonomy, but was less
legwork than using raw d3. We surveyed the landscape of Grammar of Graphics
implementations, and did not find any that suited our particular needs: Vega
was the best implementation, however it's a relatively sealed system and
difficult to customize and integrate with in application code.

Our goal with chart-parts has been to make a library with the same
expressiveness of Vega, but that interacted naturally in application code,
particularly with React.

There's a lot of work left to be done, but this is an idea we're passionate
about and we hope you find it useful.

-Chris
