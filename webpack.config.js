const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');



// https://webpack.js.org/configuration/
module.exports = {

	entry: './src/index.js',

	output: {
		filename: 'flow-diagram.[fullhash].js',
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "flow-diagram"
		}),
		new MiniCssExtractPlugin({
			filename: "flow-diagram.[fullhash].css"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "static/img", to: "img" }
			]
		}),
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: [
					/node_modules/,
					/static/,
					/dist/
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			}
		],
	},

	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		static: {
			directory: path.join(__dirname, 'static'),
			publicPath: '/'
		},
		watchFiles: [
			'src/**/*',
			'static/**/*'
		],
		compress: true,
		port: 3000,
		hot: true,
		open: ['/']
	},
};
