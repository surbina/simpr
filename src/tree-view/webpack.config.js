const path = require('path');

module.exports = {

    entry: [
        './src/tree-view/index.jsx'
    ],

    output: {
        filename: 'simpr.js',
        path: path.join(__dirname, '../../', 'build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        modules: [path.join(__dirname, '../../', 'node_modules')]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    }
};
