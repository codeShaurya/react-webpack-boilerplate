const { resolve } = require("path");

const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "development";
console.log(`Hey this is ${process.env.NODE_ENV}`);

module.exports = () => ({
  mode: "development",
  stats: {
    colors: true
  },
  devtool: "inline-source-map",

  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./index.js"
  ],

  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/"
  },

  context: resolve(__dirname, "src"),

  devServer: {
    hot: true,
    compress: true,
    publicPath: "/",
    contentBase: resolve(__dirname, "templates"),
    historyApiFallback: true,
    allowedHosts: ["chaze.in"]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },
  node: {
    __filename: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/png",
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/svg+xml",
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerHost: "localhost",
      analyzerPort: "8081"
    })
  ]
});
