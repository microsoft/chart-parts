---
title: 'Scales'
path: '/documentation/concepts/scales'
order: 0
---

## Scales

Scales are a construct that allow us to translate values from a source domain into a target domain. Practically, what this means is that we can translate values from our data into values that are shown to users, namely screen coordinates, colors, etc..

Scales are based on d3 scales, and assume basic familiarity with how they operate. 

Here are some resources regarding d3 scales that may he helpful:
* [d3-scale Github repository](https://github.com/d3/d3-scale)
* [d3-scale-chromatic Github repository](https://github.com/d3/d3-scale-chromatic)
* [_Introducing d3-scale_ by Mike Bostock](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f)

## Supported Scale Types
These are the basic scale types supported by the system. More details about using and creating them can be found in the [Client APIs](/documentation/apis) documentation section.

### Quantitative
* Linear
* Log
* Pow
* Sequential
* Sqrt
* Time
* UTC

### Discrete
* band
* ordinal
* point

In our system, each created scale has a name. This allows us to reference the scale when we are defining [mark encodings](/documentation/concepts/marks).