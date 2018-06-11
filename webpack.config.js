const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//遍历指定文件目录，使用多入口文件
const fs = require('fs');
var files = fs.readdirSync(__dirname + '/src');
var jsx_files = files.filter((f) => {
    return f.endsWith('.jsx');
});
let entries = {};
jsx_files.map((item, index) => {
    entries[item.split(".")[0]] = __dirname + '/src/' + item;
});

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: entries,////指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, './static/js'), // 输出的路径
        filename: '[name].js'  // 打包后文件
    },
    plugins: [
        new CleanWebpackPlugin([__dirname + './static/js'])
    ],
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-react'],
                        // presets: ['babel-preset-es2015'],
                        // plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015'],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    }
}