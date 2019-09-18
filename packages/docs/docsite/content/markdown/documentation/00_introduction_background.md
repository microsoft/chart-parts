---
title: History & Related Work
path: /documentation/introduction/background
order: 1
---

## Mark-Based Visualization Systems

Mark-based visualization systems implement a concept known as the
_Grammar of Graphics_. These systems are built on the analogy that graphical
elements are to charting as words are to prose, and they are constructed of a
"language" of fundamental charting elements. These charting elements are
described at a higher level than raw graphics primitives.

In _The Grammar of Graphics_, Leland Wilkinson envisions a sequenced pipeline
of steps that are common to creating charts: including data transformations,
scale applications, mark binding, and rendering of marks and guides.

![Leland Wilkinson's Grammar of Graphics Pipeline](/images/pipeline.png)

### Vega

Mark-based systems are common in data-visualization research, but are
relatively rare in practice. The most notable implementations of these systems
presently are [Vega](http://vega.github.io/) and systems based on Vega such as
[Vega-Lite](https://vega.github.io/vega-lite/)
and [Altair](https://altair-viz.github.io/).

Vega's mark-based abstraction is excellent, but there are some design issues
with its API that make it suboptimal for integrating into applications:

- The pure-declarative nature of the JSON-specifications can be cumbersome to
  work with.
- The signal/state system of Vega allows for the observation and mutation of
  chart state, but application developers often want to control their own state
  and have control over what happens with events.
- The rendering engine is browser-dependent, precluding it from being used in
  native contexts.
