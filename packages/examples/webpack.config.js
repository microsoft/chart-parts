const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x|)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	plugins: [new HtmlWebPackPlugin()],
}
