---
title: 'Introduction'
path: '/documentation/introduction'
order: 0
---

# Introduction

Markable is a flexible [Grammar-of-Graphics](https://www.springer.com/us/book/9780387245447) rendering pipeline designed for application developers.


## Markable Vision

Markable is a mark-based visualization system that is inspired by Leland Wilkinson's concept of a _Grammar of Graphics_, published in his seminal book _The Grammar of Graphics_, and systems that have implemented these ideas, namely Vega, Vega-Lite and Altair.

![Wilkinson's Book](/images/wilkinson_book.png)

The vision of Markable is to support the _rendering phases_ of Wilkinson's pipeline in a flexible, architecture-agnostic way while dovetailing nicely with view technologies such as React. To date, implementations of the _Grammar of Graphics_ have tended to exist as closed systems. While a closed system can be useful for certain users, and for certain abstraction levels, we believe that a closed graphical system should be built on top of an open graphics system to allow for maximum architectural flexibility.