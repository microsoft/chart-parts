---
title: 'Introduction'
path: '/documentation/introduction'
order: 0
---

# Introduction

_chart-parts_ is a flexible [Grammar-of-Graphics](https://www.springer.com/us/book/9780387245447) rendering pipeline designed for application developers.

## Project Vision

In his seminal book _The Grammar of Graphics_, Leland Wilkinson envisioned a system of charting components and data-flows to support charts. There have been several systems that have implemented these ideas, such as [Vega](http://vega.github.io/), [Vega-Lite](https://vega.github.io/vega-lite/) and [Altair](https://altair-viz.github.io/).

![Wilkinson's Book](/images/wilkinson_book.png)

The vision of `chart-parts` is to support the _rendering phases_ of Wilkinson's pipeline in a flexible, architecture-agnostic way while dovetailing nicely with React. To date, implementations of the _Grammar of Graphics_ have tended to exist as closed systems. While a closed system can be useful for certain users, and for certain abstraction levels, we believe that a closed graphical system should be built on top of an open graphics system to allow for maximum architectural flexibility.
