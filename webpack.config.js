const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const widgetName = require('./widget.conf.json').widgetName;

config = {
        entry: {
            [widgetName]: './app/widget.tsx',
            hostmock: './mock/host-mock.ts'
        },
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
            library: 'integration/[name]',
            libraryTarget: 'window'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('./node_modules/@talentsoft-opensource/integration-dll/dist/integration-manifest.json')
            })
        ],
    };

module.exports = (env, argv) => {
    return {
        ...config,
        devtool: argv.mode === "development" ? "eval-source-map" : "none",
    }
}