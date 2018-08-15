const path = require('path')
// const blacklist = require('metro/src/blacklist')

module.exports = {
	extraNodeModules: {
		react: path.resolve(__dirname, 'node_modules/react'),
		'react-native': path.resolve(__dirname, 'node_modules/react-native'),
		lodash: path.resolve(__dirname, 'node_modules/lodash'),
		'd3-array': path.resolve(__dirname, 'node_modules/d3-array'),
		'd3-format': path.resolve(__dirname, 'node_modules/d3-format'),
		'd3-path': path.resolve(__dirname, 'node_modules/d3-path'),
		'd3-scale': path.resolve(__dirname, 'node_modules/d3-scale'),
		'd3-shape': path.resolve(__dirname, 'node_modules/d3-shape'),
		'd3-time-format': path.resolve(__dirname, 'node_modules/d3-time-format'),
	},
	getProjectRoots: () => [
		// Include current package as project root
		path.resolve(__dirname),
		// Include symlinked packages as project roots
		path.resolve('../../client/builder'),
		path.resolve('../../client/interfaces'),
		path.resolve('../../client/react'),
		path.resolve('../../examples/testdata'),
		path.resolve('../../processing/orchestrator'),
		path.resolve('../../processing/scene'),
		path.resolve('../../processing/scenegraph'),
		path.resolve('../../processing/vsvg'),
		path.resolve('../../util/scales'),
		path.resolve('../../util/shapes'),
		path.resolve('../../util/transform'),
		path.resolve('../../renderers/react-native-svg'),
	],
}
