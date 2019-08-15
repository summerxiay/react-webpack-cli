const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = _path => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = options => {
    options = options || {};

    let cssLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: options.sourceMap
        }
    }

    if (options.cssModule) {
        cssLoader.options.modules = {
            localIdentName: '[local]__[hash:7]'
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders)
        } else {
            return ['style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less', { javascriptEnabled: true, indentedSyntax: true }),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = options => {
    let output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        let loaderObj = {
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        }
        if (options.cssModule) {
            loaderObj.exclude = options.cssModuleExcludePath;
        }
        output.push(loaderObj);
    }
    
    if (options.cssModule) {
        options.cssModule = false;
        const cssModuleLoaders = exports.cssLoaders(options);
        for (const extension in cssModuleLoaders) {
            const cssModuleLoader = cssModuleLoaders[extension];
            let cssModuleLoaderObj = {
                test: new RegExp('\\.' + extension + '$'),
                use: cssModuleLoader
            }
            cssModuleLoaderObj.include = options.cssModuleExcludePath;
            output.push(cssModuleLoaderObj)
        }
    }
    return output;
}