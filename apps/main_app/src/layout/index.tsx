import React, { FC, useEffect, useRef } from "react";
import Page from "@/pages";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import { staticHomeAppRoute } from "../routers/home";
import { loadMicroApp } from "qiankun";
import GlobalState from "./globalState";
import ReduxState from "./reduxState";

const MainLayout: FC = () => {
  const appLoad = useRef(null);
  const subAppContainer = useRef(null);

  useEffect(() => {
    return () => {
      if (appLoad.current) {
        appLoad.current.unmount();
      }
    };
  }, []);

  const hanldeAddSubApp = () => {
    appLoad.current = loadMicroApp({
      name: "app_data",
      entry: process.env.ENV === "dev" ? "//localhost:8102" : "/child/app_data",
      container: subAppContainer.current,
      props: { brand: "qiankun" },
    });
  };

  const hanldeDelSubApp = () => {
    if (appLoad.current) {
      appLoad.current.unmount();
    }
  };

  return (
    <div
      style={{
        border: "1px solid red",
        textAlign: "center",
        padding: 30,
      }}
    >
      <h1>主应用</h1>
      <Space wrap>
        <Link to={"/hello"}>Go Hello</Link>
        <Link to={"/about"}>Go About</Link>
        <Link to={"/count"}>Go count</Link>
        <Link to={"/dev_data"}>Go dev_data</Link>
      </Space>
      <div style={{ height: 10 }}></div>
      <Space wrap>
        <Button type="primary" onClick={hanldeAddSubApp}>
          手动安装 子应用
        </Button>
        <Button type="primary" onClick={hanldeDelSubApp}>
          手动卸载 子应用
        </Button>
      </Space>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GlobalState />
        <ReduxState />
      </div>

      <div ref={subAppContainer}></div>
      <Page AppRoute={staticHomeAppRoute} />
    </div>
  );
};

export default MainLayout;
