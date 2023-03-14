# 微前端



### 安装

```shell
 pnpm i qiankun -S
```



### 主应用

```tsx
import { registerMicroApps, start } from 'qiankun';

// 第二个参数来 配置生命周期
registerMicroApps([
  {
    name: 'dev_data', // app name 必须确保唯一
    entry: '//localhost:8001', // 微应用的入口
    container: '#subapp', // 容器节点 , 需要提供一个容器
    activeRule: '/dev_data', // 微应用的激活规则, 可以数组 ['/1','/2'], 可以函数
    loader:null, // loading 状态发生变化时会调用的方法
    props:null, // 给子应用传递数据
  },
]);

start();
```



### 子应用

```tsx
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped', '开始');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('react app bootstraped', '渲染');
  ReactDOM.render(
    <h1>11</h1>,
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
```

#### 路由

```tsx
<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/dev_data' : '/'}>
   <Page AppRoute={staticAppRoute} />
   <h1>1</h1>
</BrowserRouter>
// 配置 webpack 打包的 publicPath
//  --- publicPath: '/vue-history/',
// library: `dev_data-[name]`,
// libraryTarget: "umd",
```

#### webpack

```js
{
    devServer:{
        headers: { "Access-Control-Allow-Origin": "*" }, // 配置跨域
    }
}
```



### 生命周期

#### bootstrap

这个生命周期函数会在应用**第一次**挂载前**执行一次**。

#### mount

应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法

#### unmount

应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例

#### update

可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效



## API

### registerMicroApps(apps, lifeCycles?)

注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 `activeRule` 规则，符合规则的应用将会被自动激活。

- 参数
  - apps  微应用的一些注册信息
  - lifeCycles  全局的微应用生命周期钩子
    - beforeLoad - `Lifecycle | Array<Lifecycle>` - 子应用加载前
    - beforeMount - `Lifecycle | Array<Lifecycle>` - 微应用挂载前
    - afterMount - `Lifecycle | Array<Lifecycle>` - 子应用挂载后
    - beforeUnmount - `Lifecycle | Array<Lifecycle>` - 微应用卸载前
    - afterUnmount - `Lifecycle | Array<Lifecycle>` - 微应用卸载后
- 实例

```tsx
// 第二个参数来 配置生命周期
registerMicroApps([
  {
    name: 'dev_data', // app name 必须确保唯一
    entry: '//localhost:8001', // 子应用的入口
    container: '#subapp', // 容器节点 , 需要提供一个容器
    activeRule: '/dev_data', // 子应用的激活规则, 可以数组 ['/1','/2'], 可以函数
    loader:null, // loading 状态发生变化时会调用的方法
    props:null, // 给子应用传递数据
  },
],{
    // qiankun 生命周期钩子 - 子应用加载前
    beforeLoad: (app: any) => {
      console.log("before load", app.name);
      return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 子应用挂载后
    afterMount: (app: any) => {
      console.log("after mount", app.name);
      return Promise.resolve();
    },
});
```



### `start(opts?)`-- 开始

```ts
{
  prefetch: true, // 开启预加载 , 默认 true
  sandbox: true, // 开启沙箱 , 默认 true
  singular: true, // 单例模式，同一时间只会渲染一个微应用 , 默认 true
  fetch: Function, // 自定义 fetch 方法
  getPublicPath: (entry: Entry) => string, // 参数是微应用的 entry 值,
  getTemplate: (tql: string) => string, // 生成的 子应用的 模板
  excludeAssetFilter: (assetUrl: string) => boolean, // 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理
}
```

### setDefaultMountApp(appLink)

设置主应用启动后默认进入的微应用

- 参数 appLink `string ` 
- 实例

```tsx
import { setDefaultMountApp } from 'qiankun';

setDefaultMountApp('/homeApp');
```

### `runAfterFirstMounted(effect)`  

首次微应用 mount 后需要调用的方法，可以开启一些监控或者埋点脚本。

- 参数 effect `() => void` 

- 实例

```tsx
import { runAfterFirstMounted } from 'qiankun';

runAfterFirstMounted(() => console.log('hello'));
```

### `loadMicroApp(app, configuration?)` 

手动加载微应用

```tsx
appLoad.current = loadMicroApp({
      name: "app_data",  
      entry: "//localhost:8002",
      container: subAppContainerRef.current, // 要加载的容器
      props: { brand: "qiankun" },
    },{
     // ... start 一样
     // 
     singular:false // 默认不是单例模式
 });


```



### `prefetchApps(apps, importEntryOpts?)` 

手动预加载指定的微应用静态资源。仅手动加载微应用场景需要，基于路由自动激活场景直接配置 `prefetch` 属性即可。

- 参数

  - apps 预加载的应用列表

  - importEntryOpts 加载配置，上面有介绍

- 实例

```ts
prefetchApps([
  { name: "dev_data", entry: "//localhost:8101" },
  { name: "app_data", entry: "//localhost:8102" },
],{
    // ...
    getTemplate: (tql: string) => string
});
```

### 错误捕获

```ts
const handler = (error) => {
  console.log("error", error);
};

// 添加全局的未捕获异常处理器
addGlobalUncaughtErrorHandler(handler);

// 移除全局的未捕获异常处理器。
removeGlobalUncaughtErrorHandler(handler);
```

### `initGlobalState(state)`

定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。

- 参数 state 传递的数据

- 返回值

  - MicroAppStateActions
    - onGlobalStateChange:`(callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void`， 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
    - setGlobalState: `(state: Record<string, any>) => boolean`， 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
    - offGlobalStateChange: `() => boolean`，移除当前应用的状态监听，微应用 umount 时会默认调用

- 实例

  主应用

  ```tsx
  import React, { FC, useEffect, useRef, useState } from "react";
  import { Button, Space } from "antd";
  import { initGlobalState, loadMicroApp } from "qiankun";
  
  const { onGlobalStateChange, setGlobalState, offGlobalStateChange } =
    initGlobalState({
      list: [1, 2, 3, 4],
      name: "liu",
      age: 18,
    });
  
  const MainLayout: FC = () => {
    const [list, setList] = useState([]);
  
    useEffect(() => {
      onGlobalStateChange((state, prev) => {
        console.log(state, prev, "main,state");
        setList(state.list);
      }, true);
    }, []);
  
    const hanldeUpdataState = () => {
      setGlobalState({
        name: "aa",
        age: 10,
        list: ["a", "b", "c", "d"],
      });
    };
  
    return (
      <div>
        <Button type="primary" onClick={hanldeUpdataState}>
            更改全局数据
        </Button>
        <div>
          {list.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    );
  };
  export default MainLayout;
  
  ```

  子应用

  ```tsx
  // index.tsx
  export const QiankunContext = createContext({});
  
  export async function mount(props?: any) {
    console.log("react app bootstraped", "渲染", props);
    ReactDOM.render(
      <QiankunContext.Provider value={props}>
        <App></App>
      </QiankunContext.Provider>,
      props?.container
        ? props.container.querySelector("#root")
        : document.getElementById("root")
    );
  }
  
  // app.tsx
  import React, { FC, useContext, useEffect, useState } from "react";
  import { Button, Space } from "antd";
  import { QiankunContext } from "..";
  
  const MainLayout: FC = () => {
    const content = useContext(QiankunContext);
    const [list, setList] = useState([]);
  
    useEffect(() => {
      if (window.__POWERED_BY_QIANKUN__ && content) {
        console.log(content);
        content?.onGlobalStateChange((state, prev) => {
          console.log(state, prev, "data");
          setList(state.list);
        }, true);
      }
    }, [content]);
  
    const hanldeUpdateState = () => {
      if (window.__POWERED_BY_QIANKUN__) {
        content?.setGlobalState({ list: ["A", "B", "C", "D"] });
        return;
      }
      console.log("dev_dat: ", "独立运行");
    };
  
    return (
      <div>
   	  <Button type="primary" onClick={hanldeUpdateState}>
     	     更改全局数据
        </Button>         
  
        <div>
          {list.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MainLayout;
  
  ```






### 部署

主应用

```tsx
registerMicroApps([
 {
      name: "dev_data", // app name registered
     // 保证 activeRule 和 entry 不同
      entry: process.env.ENV === "dev" ? "//localhost:8101" : "/child/dev_data", 
      container: "#subapp",
      activeRule: "/dev_data",
      props: { store },
  },
],
```

子应用

- 必须配置 `webpack` 构建时的 `publicPath` 为**目录名称**

```js
output: {
    publicPath: IS_DEV ? "/" : "/child/dev_data/",
}
```

nginx

```properties
server {
        listen       8200;
        server_name  localhost;

        location / {
            root   html/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location /child/dev_data {
            root   html/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /child/dev_data/index.html;
        }

         location /child/app_data {
            root   html/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /child/app_data/index.html;
        }

    }
```





## 注意

- 不推荐使用 GlobalState 通讯方式，因为它是不合理的通讯方式，会加剧应用之间的耦合，在qiankun3.0移除 


![image-20230314110408297](C:\Users\25318\AppData\Roaming\Typora\typora-user-images\image-20230314110408297.png)

- 刷新后 子应用页面丢失 [Future State](https://ui-router.github.io/guide/lazyloading#future-states)

  - 在主应用下 查看  publicPath ，应该是 `/` ，而不是 `./`

- 子应用关闭 hmr

- 配置跨域
  - Access-Control-Allow-Origin: "*" 

​	
