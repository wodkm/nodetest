const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.jsx'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, './static/js'), // 输出的路径
        filename: 'bundle.js'  // 打包后文件
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