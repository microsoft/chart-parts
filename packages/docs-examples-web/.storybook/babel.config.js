module.exports = {
	presets: [
		['@babel/preset-react', { runtime: 'automatic' }],
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
				},
			},
		],
		['@babel/preset-typescript', {}],
	],
}
