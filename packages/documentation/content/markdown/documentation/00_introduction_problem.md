---
title: 'The Missing Abstraction'
path: '/documentation/introduction/missing_abstraction'
order: 0
---

## The Missing Abstraction of Charting

Charting is a common and complex problem. Charting libraries are often implemented with the most common visualizations and use-cases in mind. When a developer wants to augment a chart or make something slightly out-of-the-box, such as a mean line in a bar chart, it's often necessary to eject out of the charting library and work directly with a 2D rendering API such as _svg_, _canvas_ or _webgl_. Additionally, charting libraries are often browser-dependent, which precludes the ability to abstractly describe charts independently of platform.

![The missing abstraction of charting](/imagesmissing_abstraction.png)

We believe that the notion of a _Grammar of Graphics_, sometimes referred to as _mark-based visualization_, has been proved in many contexts to be an elegant way to describe expressive, beautiful charts that are not as constrained by the charting library that is selected. Moreover, this level of abstraction is easier to develop software at than low-level graphics libraries, and is not bound a-priori to any platform.