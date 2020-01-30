const CopyPlugin = require('copy-webpack-plugin');
const htmlFiles = require('./webpack.var.js');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: 'html-loader'
            }
        ]
    },
    plugins: [
        new CopyPlugin([{
            from: './src/img',
            to: 'img/'
        }])
    ]
};

const createEntrys = () => {
    htmlFiles.map(file => {
        module.exports.entry[file] = `./src/js/${file}.js`
    })

};
createEntrys();