const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlFiles = require('./webpack.var');

const createPage = (fileName) => {
    return new HtmlWebpackPlugin({
        template: './src/' + `${fileName}.html`,
        filename: `${fileName}.html`,
        chunks: [fileName],
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
        }
    });
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[folder]/[name].[ext]',
                    outputPath: (url, resourcePath, context) => {
                        // `resourcePath` is original absolute path to asset
                        // `context` is directory where stored asset (`rootContext`) or `context` option

                        // To get relative path you can use
                        // const relativePath = path.relative(context, resourcePath);

                        if (/img\/img/.test(url)) {
                            return url.replace(/img\/img/g, 'img');
                        } else {
                            return url;
                        }
                    },
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `style/${name.replace('/js/', '/css/')}.css`,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: `index.html`,
            chunks: ['index'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            }
        }),
        ...htmlFiles.map(file => createPage(file))
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
});