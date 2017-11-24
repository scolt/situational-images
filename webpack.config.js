const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './app/src/app.js'],
    output: {
      filename: './public/bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("./public/styles.css"),
    ]
  };