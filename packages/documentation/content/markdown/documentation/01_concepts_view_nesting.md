---
title: 'View Nesting'
path: '/documentation/concepts/view_nesting'
order: 3
---

## View Nesting

A common task in charting is to divide the view-space into separate sub-charts. There are a variety of reasons we may want to do this.
* Rendering different chart types in adjacent areas to focus on different aspects of the data
* Rendering a detail view and an overview to allow brush-selection of what's show in detail
* Data faceting and small-multiple views

<img alt="View Nesting" src="/images/view_nesting.png" height="250">

To support this, our view model supports the idea of recursively splitting view areas based on data-faceting or manual definition.

## Group Marks
__Group__ type marks are how we split views into sub-views. Each group instance provides a localized view-space to marks nested within it. Groups, like any other mark type, can be bound rows in a table or defined as singleton instances. When groups are data-bound they may optionally define a "facet" parameter to facet the source data table.

### Singletons
Group marks may be specified as a _singleton_, in which case it is unbound to a data-table and emits only a single item. 

### Faceting
Groups may specify a __facet__ value that describes how to facet incoming data. In this case, the data is partitioned into a set of sub-tables, each representing a view of the source table, and one group item is emitted per each data partition. When faceting is used, the data partition is given a name and provided to child marks so that they can render based on the faceted view of the data the group provides.

```js
    group()
    .table('my-data')
    .facet({
        name: 'my-data-facet',
        partitionOn: r => r.category,
    })
```

#### Faceting Specification Object
* __name__: The name of the facet table to provide to child-marks.
* __partitionOn__: A string describing a field to use as a _partition key_, or a function that returns a _partition key_ for each row of the incoming data set. The partition key is used to separate the data rows into different partitions.
* __transform__: A function that accepts a partition of data and performs final transformation before providing it to chlidren. Clients may use this to define aggregation, layout-transformations, or any other augmentation that is necessary for child marks to render. Default is an identity function.