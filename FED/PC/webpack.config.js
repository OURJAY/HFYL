var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var COMPONENTS_PATH = path.resolve(SRC_PATH, 'components');
var TEMPLETES_PATH = path.resolve(SRC_PATH, 'templetes');

module.exports = {
    entry: {
        vendors: ['jquery'],
        login: './src/components/login/login.js',
        store: './src/components/store/store.js'
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlwebpackPlugin({
            title: 'OURJAY-登录.注册',
            template: './src/templetes/login/login.html',
            filename: 'login.html',
            chunks: ['vendors', 'login'],
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'OURJAY-商城',
            template: './src/templetes/store/store.html',
            filename: 'store.html',
            chunks: ['vendors', 'store'],
            inject: 'body'
        })

    ],
    devServer: {
        historyApiFallback: true,
        progress: true,
        // hot: true,
        // inline: true,
        port: 8088,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8088',
                secure: false
            }
        },
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            include: SRC_PATH,
            loader: 'jshint-loader'
        }],
        loaders: [
            // {
            //     test: /\.css$/,
            //     loaders: ['style', 'css'],
            //     include: SRC_PATH
            // },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                include: SRC_PATH
            },
            // {
            //     test: /\.scss?$/,
            //     loader: 'style-loader!css-loader!sass-loader',
            //     include: SRC_PATH
            // },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            }, {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file?name=./assets/fonts/[name].[ext]',
            }, {
                test: /\.jsx?$/,
                loader: 'babel',
                include: SRC_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ],
    },
    devtool: 'eval-source-map',
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    }
};