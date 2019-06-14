/**
 * To capture vega scenegraphs, use this stringify function on the vega scenes in debug mode.
 *
 * 1) Open Dev console, view vega source
 * 2) Find the render function (has comment "Render an input scenegraph, potentially with a set of dirty items")
 * 3) Place a breakpoint in this function and refresh
 * 4) Evaluate scene to console
 * 5) Paste this function in
 */
/* eslint-disable */
JSON.stringify(scene, (key, value) => {
	if (
		key === 'mark' ||
		key === 'group' ||
		key === 'context' ||
		key === 'source' ||
		key === 'd' ||
		key === 'bounds' ||
		key === 'exit'
	) {
		return undefined
	}
	return value
})
