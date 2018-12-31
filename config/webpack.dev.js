const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.MODE_ENV !== 'production'

module.exports = {
	entry: {
		main: "./src/index"
	},
	mode: devMode ? "development" : "production",
	output: {
		filename: "[name]-bundle.js",
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/"
	},
	devServer: {
		contentBase: "dist"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: devMode ? "[name].css" : "[name].[hash].css",
			chunkFilename: devMode ? "[id].css" : "[name].[hash].css"
		})
	],
	module: {
		rules: [

			/////////////////////
			// CSS files
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: [require('autoprefixer')]
						}
					},
					"sass-loader"
				]
			},

			/////////////////////
			// HTML files
			{
				test: /\.html$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					{
						loader: "extract-loader",
						options: {
							publicPath: "../"
						}
					},
					{
						loader: "html-loader"
					}
				]
			}
		]
	}
}