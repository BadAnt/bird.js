module.exports = {
    entry: {
      debug: "./debug/debug.js"
    },
    output: {
      path: __dirname,
      filename: "./dist/[name].js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    devServer: {
      contentBase: "./",
      hot: true,
      inline: true,
      port: 9210
    }
};
