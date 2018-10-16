const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const partnerName = 'partner Name';

module.exports = {
    entry: './app/widget.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.json$/,
                loader: "json",
                include: "/resources/"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: 'integration/' + partnerName,
        libraryTarget: 'window'
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./node_modules/@talentsoft-opensource/integration-dll/dist/integration-manifest.json')
        })
    ]
};