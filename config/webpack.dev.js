// Plugins
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const devConfig = () => {
	return merge([
		{
			plugins: [
				new webpack.HotModuleReplacementPlugin()
			]
		}
	])
}

module.exports = env => {
	return merge(commonConfig(env), devConfig());
}