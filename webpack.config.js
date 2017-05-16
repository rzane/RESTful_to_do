// In webpack.config.js

module.exports = {
  entry: [
    './frontend/app.js'
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: __dirname + '/frontend', loader: "babel-loader"}
    ]
  },
  output: {
    filename: "index.js",
    path: __dirname + '/python_todo/static/js'
  }
};
