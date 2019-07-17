const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
//遍历指定文件目录，使用多入口文件
const glob = require('glob');
var files = glob.sync(__dirname + '/src/modules/*.jsx');
let entries = {};
files.map((item, index) => {
    console.log(path.basename(item, '.jsx'));//获取文件名
    entries[path.basename(item, '.jsx')] = item;
});
// const fs = require('fs');
// var files = fs.readdirSync(__dirname + '/src');
// var jsx_files = files.filter((f) => {
//     return f.endsWith('.jsx');
// });
// let entries = {};
// jsx_files.map((item, index) => {
//     entries[item.split(".")[0]] = __dirname + '/src/' + item;
// });

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: entries,////指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, 'static'), // 输出的路径
        publicPath: '',//资源引用路径
        filename: 'js/[name].js'  // 打包后文件
    },
    plugins: [
        new CleanWebpackPlugin([__dirname + '/static/js']),
        new CleanWebpackPlugin([__dirname + '/static/resources']),
        new CompressionPlugin({
            // asset: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            // algorithm: 'gzip',//算法
            filename: '[path].gz',
            test: /\.js(\?.*)?$/i,
            // threshold: 1024,//只处理比这个值大的资源。按字节计算
            // minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
        })
    ],
    resolve: {
        alias: {
            '@static': path.resolve(__dirname, 'static'),
            '@stylesheets': path.resolve(__dirname, 'static/stylesheets'),
            '@images': path.resolve(__dirname, 'static/images'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@templates': path.resolve(__dirname, 'src/templates'),
        }
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015', 'babel-preset-react'],
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015'],
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'resources/',
                            limit: '1024',//超过1M的文件使用file-loader
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    }
}