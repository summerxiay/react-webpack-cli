const path = require('path');
const config = require('../config');
const APP_PATH = path.resolve(__dirname, '../app');

module.exports = {
    entry: {
        app: './app/index.js',
        framework: ['react', 'react-dom']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                // 定于了rules执行的范围
                include: APP_PATH
            }
        ]
    }
}