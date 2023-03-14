const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const variable = require("./webpackUtils/variable");

const { DIST_PATH } = variable;
//引入
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const config = {
  mode: "development",
  cache: false,
  devtool: "eval-cheap-module-source-map",
  // plugins: [new ReactRefreshWebpackPlugin()],
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // },
  devServer: {
    hot: true, // 开启 hrm
    open: true,
    compress: true, // 开启 gzip
    historyApiFallback: true, // 使用 history 模式
    headers: { "Access-Control-Allow-Origin": "*" },
    port: 8100,
    host: "localhost",
    proxy: {
      "api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^api": "" },
      },
    },
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);

mergedConfig.plugins = mergedConfig.plugins.filter(Boolean);
module.exports = mergedConfig;
