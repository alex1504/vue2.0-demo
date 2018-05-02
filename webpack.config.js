var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: process.env.NODE_ENV === 'development' ? '/build/' : './build/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            '/api/douban/**': {
                target: 'https://api.douban.com/v2/',
                secure: false,
                changeOrigin: true,
                // 默认情况下，会将规则拼接到target字段的尾部
                pathRewrite: {"^/api/douban/" : ""}
            },
            '/api/netease/common/**': {
                target: 'http://music.163.com/api',
                secure: false,
                changeOrigin: true,
                pathRewrite: {"^/api/netease/common/" : ""}
            },
            '/api/netease/search/**': {
                target: 'http://s.music.163.com/search',
                secure: false,
                changeOrigin: true,
                pathRewrite: {"^/api/netease/search/" : ""}
            }
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
