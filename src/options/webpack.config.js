const path = require('path');

module.exports = {

    entry: [
        './src/options/index.jsx'
    ],

    output: {
        filename: 'options.js',
        path: path.join(__dirname, '../../', 'build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        modules: [path.join(__dirname, '../../', 'node_modules')]
    },
    devtool: 'source-map',
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
