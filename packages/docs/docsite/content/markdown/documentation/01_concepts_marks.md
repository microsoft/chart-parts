---
title: 'Marks'
path: '/documentation/concepts/marks'
order: 1
---

## Marks

_Marks_ are a key concept in chart-parts, and any system implementing a _grammar-of-graphics_. Marks are the fundamental building blocks of these "grammars". Marks' relation to charts are analagous to words' relationship to text.

![Mark-to-word Analogy](/images/analogy.png)

### Mark Parameterization

Marks often have multiple parameters to describe how they appear. For example, to describe a rectangle, one needs at a minumum: (height, width, (x,y) position, and color).

<img alt="Mark Encoding Example" src="/images/mark_encoding.png" height="275">

### Encoding Mark Parameters

In our system, when we bind these parameters to our data, this is called an _encoding_. When we encode a parameter, we create an instance of the mark for each row in our data table, and parameterize the mark against that data context.

#### Renderless API

```jsx
<Rect
  table="my-data"
  x={({ d }, { x }) => x(d.category)}
  y={0}
  height={({ d }, { y }) => y(d.amount)}
  width={30}
  fill="blue"
/>
```

#### SceneNodeBuilder API

```js
// SceneNodeBuilder API
rect()
  .table('my-data')
  .encode({
    x: ({ d }, { x }) => x(d.category),
    y: (d, { y }) => 0,
    height: ({ d }, { y }) => y(d.amount),
    width: () => 30,
    fill: () => 'blue',
  })
```

In the above examples we specify an object where the keys are _parameter names_ (e.g _x_, _y_, _height_, _width_, and _fill_) and the values are _encoding functions_.

Encoding functions have the following signature:

- **_encode_(_data_: MarkData, _scales_: Scales)**
  - **data**: this parameter contains the data context for binding the mark. This contains the following properties:
    - **d**: The current datum (row) in the bound table that this mark is reflecting
    - **index**: The index of the current row in its table
    - **data**: the table the current d is a member of
    - **tables**: An object where the keys are the names of all available tables and the values are the data-tables.
  - **scales**: an object where the keys are the names of the available scales and the values are the scales.
