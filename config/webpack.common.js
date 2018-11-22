/* eslint-disable */

const path = require('path')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
	const { PLATFORM, STAT } = env;
	return merge([
		{
			mode: PLATFORM === 'dev' ? 'development' : 'production',
			devtool: PLATFORM === 'dev' ? 'eval-source-map' : 'source-map',
			entry: {
				app: './src/index.jsx'
			},
			output: {
				filename: '[name].bundle.js',
				path: path.resolve(__dirname, '..', 'dist')
			},
			resolve: {
				extensions: ['.jsx', '.js'],
				modules: ['node_modules'],
				alias: {
					Containers: path.resolve(__dirname, '..', 'src', 'app', 'containers'),
					Components: path.resolve(__dirname, '..', 'src', 'app', 'components'),
					Services: path.resolve(__dirname, '..', 'src', 'app', 'services')
				}
			},
			devServer: {
				historyApiFallback: true,
				contentBase: '.',
				stats: 'minimal',
				open: true
			},
			module: {
				rules: [
					{
						test: /\.scss$/,
						use: [
							PLATFORM === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									modules: true
								}
							},
							{
								loader: 'sass-loader',
								options: {
									includePaths: [path.resolve(__dirname, '..', 'src', 'assets', 'scss')]
								}
							}
						]
					},
					{
						test: /\.(jsx|js)$/,
						exclude: /node_modules/,
						use: [
							'babel-loader',
							{
								loader: 'eslint-loader',
								options: {
									failOnError: PLATFORM === 'dev' ? false : true,
									failOnWarning: false
								}
							}
						]
					}
				]
			},
			plugins: [
				STAT ?
					new BundleAnalyzerPlugin() :
					(
						// new HotModuleReplacementPlugin(),
						new HtmlWebpackPlugin({
							template: './src/index.html'
						})
					)
			]
		}
	])
}