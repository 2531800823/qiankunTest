import React, { FC } from "react";
import Page from "@/pages";
import { Link } from "react-router-dom";
import { Space } from "antd";
import { staticHomeAppRoute } from "../routers/home";
import GlobalState from "./globalState";
import ReduxState from "./reduxState";

const MainLayout: FC = () => {
  return (
    <div
      style={{
        border: "1px solid red",
        textAlign: "center",
        padding: 30,
        marginTop: 30,
      }}
    >
      <h3> 子应用 dev_data </h3>
      <Space wrap>
        <Link to={"/hello"}>Go Hello</Link>
        <Link to={"/about"}>Go About</Link>
        <Link to={"/count"}>Go count</Link>
      </Space>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <GlobalState />
        <ReduxState />
      </div>

      <Page AppRoute={staticHomeAppRoute} />
    </div>
  );
};

export default MainLayout;
