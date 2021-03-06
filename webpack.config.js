module.exports = {
    entry: {
      bird: "./src/bird.js"
    },
    output: {
      path: __dirname,
      filename: "./dist/[name].js",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
};
