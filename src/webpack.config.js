const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "simpr.css",
    //disable: process.env.NODE_ENV === "development"
});

module.exports = {

    entry: [
        './src/simpr.jsx'
    ],

    output: {
        filename: 'simpr.js',
        path: path.join(__dirname, '../', 'build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        modules: [path.join(__dirname, '../', 'node_modules')],
        alias: {
            'lodash/object/omit': 'lodash/omit',
            'lodash/object/extend': 'lodash/extend',
            'lodash/lang/isObject': 'lodash/isObject',
            'lodash/lang/isEqual': 'lodash/isEqual',
            'lodash/collection/forEach': 'lodash/forEach',
            'lodash/collection/each': 'lodash/each',
            'lodash/collection/pluck': 'lodash/map',
            'lodash/object/keys': 'lodash/keys',
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass
    ]
};
