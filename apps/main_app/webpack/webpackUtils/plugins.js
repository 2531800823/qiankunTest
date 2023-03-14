// const cleanWebpackPlugin = require("clean-webpack-plugin") ;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const variable = require("./variable");
const DotenvPlugin = require("dotenv-webpack");
const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// const {CleanWebpackPlugin}=cleanWebpackPlugin;
const { PUBLIC_PATH, DIST_PATH, ENV_CONFIG_PATH, IS_DEV, IS_PRO, ROOT_PATH } =
  variable;

function getPlugins() {
  // clean
  // const cleanPlugin = new CleanWebpackPlugin({
  //     cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*.*']
  // });

  const miniCssPlugin = new MiniCssExtractPlugin({
    filename: IS_DEV ? "css/[name].css" : "css/[name].[contenthash:8].css",
    chunkFilename: IS_DEV
      ? "css/[name].chunk.css"
      : "css/[name].[contenthash:8].chunk.css",
    // 常遇到如下警告，Conflicting order. Following module has been added:…。
    // 此警告意思为在不同的js中引用相同的css时，先后顺序不一致。也就是说，在1.js中先后引入a.css和b.css，而在2.js中引入的却是b.css和a.css，此时会有这个warning。
    ignoreOrder: true,
  });

  const dotenvPlugin = new DotenvPlugin({
    path: ENV_CONFIG_PATH,
  });

  const copyPlugin = new CopyPlugin({
    patterns: [
      {
        from: path.resolve(PUBLIC_PATH),
        to: path.resolve(DIST_PATH),
      },
    ],
  });

  const indexHtmlPlugin = new HtmlWebpackPlugin({
    template: path.join(ROOT_PATH, "index.html"),
    filename: "index.html",
    inject: true, //true 插入body底部，head:插入head标签，false:不生成js文件
    // hash: true, // 会在打包好的bundle.js后面加上hash串
    // title: "title", // 使用了 模板咯！
    minify: {
      removeComments: IS_PRO, //  删除注释
      removeRedundantAttributes: IS_PRO, //删除空属性
      collapseWhitespace: IS_PRO, // TODO 删除空格
      minifyCSS: IS_PRO, // 压缩 HTML 中出现的 CSS 代码
      minifyJS: IS_PRO, // 压缩 HTML 中出现的 JS 代码
    },
  });

  return [
    // cleanPlugin,
    copyPlugin,
    indexHtmlPlugin,
    dotenvPlugin,
    miniCssPlugin,
    new ReactRefreshWebpackPlugin(),
  ];
}

module.exports = {
  getPlugins,
};
