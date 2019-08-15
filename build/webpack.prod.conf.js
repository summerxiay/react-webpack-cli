const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('../config');
const utils = require('./utils');
const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCss: true,
            cssModule: config.base.cssModule,
            cssModuleExcludePath: config.base.cssModuleExcludePath
        })
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.build.index,
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(),
        // 导出css
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'),
            chunkFilename: utils.assetsPath('css/[id].[hash].css')
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true ? {map: {inline: false}} : {}
            })
        ],
        // cacheGroups对象，定义了需要被抽离的模块，其中test属性是比较关键的一个值，
        // 他可以是一个字符串，也可以是正则表达式，还可以是函数。如果定义的是字符串，
        // 会匹配入口模块名称，会从其他模块中把包含这个模块的抽离出来。name是抽离后生成的名字，
        // 和入口文件模块名称相同，这样抽离出来的新生成的framework模块会覆盖被抽离的framework模块，虽然他们都叫framework
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                framework: {
                    priority: 200,
                    test: 'framework',
                    name: 'framework',
                    enforce: true,
                    reuseExistingChunk: true
                },
                vendor: {
                    priority: 10,
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true,
                    reuseExistingChunk: true
                }
            }
        }
    }
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig