const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

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
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // set to true if you want JS source maps
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_console: true
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},	
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	],
	module: {
		rules: [

			/////////////////////
			// CSS files
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
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