const path = require('path');

module.exports = {

  entry: [
    './src/popup/index.jsx'
  ],

  output: {
    filename: 'event.js',
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
