import ReactDOM from "react-dom";
import React from "react";
import "./global.scss";
import "./localTest";
import {
  addGlobalUncaughtErrorHandler,
  Entry,
  initGlobalState,
  prefetchApps,
  registerMicroApps,
  removeGlobalUncaughtErrorHandler,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from "qiankun";
import App from "./App";
import { store } from "global_store";

registerMicroApps(
  [
    {
      name: "dev_data", // app name registered
      entry: process.env.ENV === "dev" ? "//localhost:8101" : "/child/dev_data",
      container: "#subapp",
      activeRule: "/dev_data",
      props: { store },
    },
    // {
    //   name: "app_data", // app name registered
    //   entry: "//localhost:8102",
    //   container: "#subapp",
    //   activeRule: "/app_data",
    // },
  ],
  false
    ? {
        // qiankun 生命周期钩子 - 微应用加载前
        beforeLoad: (app: any) => {
          console.log("beforeLoad mount", app.name);
          return Promise.resolve();
        },
        // qiankun 生命周期钩子 - 微应用挂载前
        beforeMount: (app: any) => {
          console.log("beforeMount mount", app.name);
          return Promise.resolve();
        },
        // qiankun 生命周期钩子 - 微应用挂载后
        afterMount: (app: any) => {
          console.log("afterMount mount", app.name);
          return Promise.resolve();
        },
        // qiankun 生命周期钩子 - 微应用卸载前
        beforeUnmount: (app: any) => {
          console.log("beforeUnmount mount", app.name);
          return Promise.resolve();
        },
        // qiankun 生命周期钩子 - 微应用卸载后
        afterUnmount: (app: any) => {
          console.log("afterUnmount mount", app.name);
          return Promise.resolve();
        },
      }
    : {}
);

start({
  prefetch: false, // 开启预加载
  // sandbox: true, // 开启沙箱
  // singular: true, // 单例模式，同一时间只会渲染一个微应用
  // fetch: () => window.fetch, // 自定义 fetch 方法
  // getPublicPath: (entry: Entry): string => '', // 参数是微应用的 entry 值,
  // getTemplate: (tql: string): string => tql, // 生成的 子应用的 模板
  // excludeAssetFilter: (assetUrl: string): boolean => true, // 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理
});

// 设置主应用启动后默认进入的微应用
// setDefaultMountApp("/dev_data");

// 首次微应用 mount 后
// runAfterFirstMounted(() => console.log("hello"));

// 手动预加载指定的微应用静态资源。仅手动加载微应用场景需要，基于路由自动激活场景直接配置 prefetch 属性即可。
// prefetchApps([
//   { name: "dev_data", entry: "//localhost:8101" },
//   { name: "app_data", entry: "//localhost:8102" },
// ]);

// const handler = (error) => {
//   console.log("error", error);
// };

// // 添加全局的未捕获异常处理器
// addGlobalUncaughtErrorHandler(handler);

// // 移除全局的未捕获异常处理器。
// removeGlobalUncaughtErrorHandler(handler);

// 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
