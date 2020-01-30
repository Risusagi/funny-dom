const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlFiles = require('./webpack.var');
const createPage = (fileName) => {
    return new HtmlWebpackPlugin({
        template: 'src/' + `${fileName}.html`,
        filename: `${fileName}.html`,
        chunks: [fileName]
    });
};

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '../[path][name].[ext]'
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: `index.html`,
            chunks: ['index'],
            inject: true
        }),
        ...htmlFiles.map(file => createPage(file))
    ]
});