renderer = new SvgRenderer(topDiv, chartdimensions, sceneGraph)
renderer.render()



const scene = {{...defn}}

renderer = new renderer(scenes)
scenes.next(scene)


renderer = new renderer()
renderer.render(scene, chartoptions)

```
// on if data is new, triggers a rerender
<ReactScene data={data}>
  <group>
    <rect {..rectprops} />

      {/* instances are bound by data, these won't work */}
      <rect.instance ...>
    </rect>
  </group>
</ReactScene>
```

###Key Components
* Scene graph generator (data + marks => scenegraph)
* Scene graph renderer
* Render reconciler (external?)
