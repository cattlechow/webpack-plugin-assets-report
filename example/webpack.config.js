const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const resolve = (...args) => path.resolve(process.cwd(), ...args);

const { AssetsReportPlugin } = require("../src/index");

module.exports = {
  mode: "production",
  entry: resolve("example/index.js"),
  output: {
    path: resolve("example/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        // {
        //   from: resolve("example/index.*"),
        // },
        {
          from: resolve("example/assets"),
        },
      ],
    }),
    new AssetsReportPlugin({
      path: resolve("example/dist/report"),
      filename: "file.md",
    }),
  ],
};
