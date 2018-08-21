---
title: 'Architecture'
path: '/documentation/introduction/architecture'
order: 2
---

## Architecture

Creating charts is a process similar to compiling executable programs from source code. In a compilation process, there are two distinct phases "frontend compilation" and "backend compilation". These compilation phases use a generic representation known as an _Abstract Syntax Tree_ (AST) to communicate the structural representation of the source code. The frontend turns source code into this abstract representation, and the backend turns this abstract representation into executable software.

The charting process is very similar. In charting, our notion of an AST comes from the [Vega Scenegraph](https://github.com/vega/vega-scenegraph). Vega's scenegraph is a plain Javascript object that is the result of binding a charting specification to user data. The scenegraph is then handled by rendering components to emit charts for users. We believe that the scenegraph specification is a useful abstraction that should allow any number of front-ends or back-ends to interact with, much like how modern compilers work.


### Architecture Diagram
![Architecture Pipeline Diagram](/images/architecture_pipeline.png)

### Frontend Charting Components
The front-end of our charting system is comprised of everything required to turn data into a Scenegraph. The frontend consists primarily of:

* A _SceneBuilder_ API that is used to create scene specifications.
* A _React Renderless_ component set that is used as a convenience for the SceneBuilder API.
* A _Scene Generator_ that binds a scene specification to user data and emits Scenegraph objects.

### Backend Charting Components
The goal of the backend charting components is to translate the Scenegraph object into an output that is viewable by users. Our goal is to support several rendering options, from dom-based SVG to more advanced WebGL rendering.

#### SVG Renderers

We support (or plan to support) of number of SVG-based output rendering options. Currently there is support for rendering SVG in __React-DOM__ and __React-Native-SVG__. SVG-based renderers operate by first translating the scenegraph into a _Virtual SVG_, which is  a virtual-dom of SVG-based nodes. This is then translated into any svg-based output. Our react-based outputs emit React virtual-dom based on whatever SVG elements are appropriate for the platform.