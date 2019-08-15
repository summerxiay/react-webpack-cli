'use strict'
 
const path = require('path');

module.exports = {
    base: {
        // 是否开启cssModule
        cssModule: true,
        // cssModule排除的目录，其他css库可以放这里
        cssModuleExcludePath: /public/
    },
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        index: path.resolve(__dirname, '../public/index.html'),
        proxyTable: {},
        host: 'localhost',
        port: '8899',
        autoOpenBrowser: true,
        cssSourceMap: true
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        index: path.resolve(__dirname, '../public/index.html'),
        productionSourceMap: false,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}