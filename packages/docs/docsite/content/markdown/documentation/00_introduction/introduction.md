---
title: Introduction
path: /documentation/introduction
order: 0
---

## Introduction & Background

> **chart-parts** is a flexible
> [Grammar-of-Graphics](https://www.springer.com/us/book/9780387245447)
> designed for application developers.

In the seminal book _The Grammar of Graphics_, Leland Wilkinson envisioned a
system of charting components and data-flow processes to support the generation
of charts.

[![Wilkinson's Book](/images/wilkinson_book.png)](https://www.springer.com/us/book/9780387245447)

The vision of **chart-parts** is to implement a grammar of graphics in
JavaScript in a flexible, architecture-agnostic way while dovetailing nicely
with frameworks application developers use such as React. To date,
implementations of the _Grammar of Graphics_ have tended to exist as closed
systems. While a closed system can be useful for certain categories of users,
we believe that these systems should provide escape hatches and flexibility.

## The Missing Abstraction

Charting is a common and complex task. Charting libraries are often implemented
as _taxonomies_ of charts, providing components such as _BarChart_,
_LineChart_, _AreaChart_, or _ScatterPlot_ to cover the most broadly used types
of charts. When a developer wants to augment a chart with a modest graphic
such as a mean line or an uncertainty band, or make a novel visualization,
it's often necessary to eject out of the charting library and work directly
with a 2D rendering API such as _SVG_, _Canvas_ or _WebGL_. Additionally,
charting libraries are often browser-dependent, which precludes the ability to
abstractly describe charts independently of platform.

![The missing abstraction of charting](/images/missing_abstraction.png)

We believe that the notion of a _Grammar of Graphics_, sometimes referred to as
_mark-based visualization_, has been proved in many contexts to be an elegant
way to describe expressive, functional charts that are not as constrained by
the charting library that is selected. Moreover, this level of abstraction is
easier to develop software at than low-level graphics libraries, and is not
coupled to any platform.

## Key Concepts

In _The Grammar of Graphics_, the author envisions a sequenced pipeline of
steps that are common to creating charts: including data transformations, scale
applications, mark binding, and rendering of marks and guides. Each of these
steps is predicated on components existing to define these processes.

These systems are built on the analogy that graphical elements are to charting as
words are to prose, and they are constructed of a "language" of fundamental
charting elements. These charting elements are described at a higher level than
raw graphics primitives.

![Mark-to-word Analogy](/images/analogy.png)

![Leland Wilkinson's Grammar of Graphics Pipeline](/images/pipeline.png)

- **Marks** are a key concept in chart-parts, and any system implementing a
  _grammar-of-graphics_. Marks are the visual building blocks of charts, such as
  rectangles, dots, and arcs.
- **Scales** are mathematical functions that allow us to translate values from
  a source domain into a target domain. These allow us to translate data into
  visually encoded values such as color or height.
- **Axes** are a common feature of charts that allow us to understand the
  encoding of a spatial dimension in the chart such as height or width.
- **Legends** are chart components that provide translation for data encodings
  that are non-spatial, such as color values.
- **Data Transformations** provide aggregation operations or visual processing
  to manipulate source data into a chartable form.

## Existing Systems

Mark-based systems are common in data-visualization research, but are
relatively rare in practice. The most notable implementations of these systems
presently are [Vega](http://vega.github.io/) and it's descendants
[Vega-Lite](https://vega.github.io/vega-lite/)
and [Altair](https://altair-viz.github.io/).

These systems are excellent for certain use cases, but are often tightly
coupled to a target rendering context (e.g. Browsers), and may not integrate
easily with application code.
