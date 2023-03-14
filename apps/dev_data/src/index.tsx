import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import "./localTest";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "global_store";

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped", "开始");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export const QiankunContext = createContext({});

export async function mount(props?: any) {
  console.log("react app bootstraped", "渲染", props);

  ReactDOM.render(
    <QiankunContext.Provider value={props}>
      <Provider store={props.store}>
        <App></App>
      </Provider>
    </QiankunContext.Provider>,
    props?.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  console.log(props);
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  mount({ store });
}
