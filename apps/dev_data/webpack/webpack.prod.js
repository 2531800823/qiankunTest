const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const TerserJSPlugin = require("terser-webpack-plugin");
const config = {
  mode: "production",
  cache: { type: "filesystem", buildDependencies: { config: [__filename] } },
  output: {
    pathinfo: false, //优化
  },
  devtool: "nosources-source-map",
  optimization: {
    moduleIds: "deterministic",
    chunkIds: "deterministic",
    minimizer: [new TerserJSPlugin()],
    runtimeChunk: {
      // 分离 runtime
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      maxAsyncRequests: 30, // 可根据实际项目情况调整
      maxInitialRequests: 30, // 可根据实际项目情况调整
      automaticNameDelimiter: "~",
      cacheGroups: {
        // 得益于HTTP2多路复用，不用太担心资源请求太多的问题
        initialPkg: {
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )?.[1];
            return `initial~pkg.${packageName?.replace("@", "")}`; // 部分服务器不允许URL带@
          },
          minSize: 40000, // 40KB 以下的依赖不做拆分, 可根据实际项目情况调整
          test: /[\\/]node_modules[\\/]/,
          priority: 5,
          chunks: "initial",
        },
        asyncPkg: {
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )?.[1];
            return `async~pkg.${packageName?.replace("@", "")}`; // 部分服务器不允许URL带@
          },
          minSize: 40000, // 40KB 以下的依赖不做拆分, 可根据实际项目情况调整
          test: /[\\/]node_modules[\\/]/,
          priority: 4,
          chunks: "async",
        },
        // 剩余第三方包兜底配置
        initialVendors: {
          // 同步其他第三方包
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          name: "initialVendors",
          minSize: 0,
          chunks: "initial",
          priority: 3,
        },
        asyncVendors: {
          // 异步其他第三方包
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          name: "asyncVendors",
          minSize: 0,
          chunks: "async",
          priority: 2,
        },
        resource: {
          // 业务公共代码重复打包4次以上的抽取出来
          chunks: "all",
          minChunks: 4, // 可根据实际项目情况调整
          name: "resource",
          minSize: 20000, // 可根据实际项目情况调整
          priority: 1,
        },
      },
    },
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;
