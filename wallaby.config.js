const path = require('path')
const packages = [
	'packages/client/*',
	'packages/processing/*',
	'packages/util/*',
]

module.exports = wallaby => ({
	files: [
		...packages.map(p => path.join(p, 'src/**/*.json')),
		...packages.map(p => path.join(p, 'src/**/*.ts*')),
		...packages.map(p => `!${path.join(p, 'src/**/__tests__/*.spec.ts*')}`),
	],
	tests: [
		...packages.map(p => `${path.join(p, 'src/**/__tests__/*.spec.ts*')}`),
	],
	compilers: {
		'**/*.ts?(x)': wallaby.compilers.typeScript({
			module: 'commonjs',
			jsx: 'React',
		}),
	},
	env: {
		type: 'node',
		runner: 'node',
	},
	testFramework: 'jest',
})
