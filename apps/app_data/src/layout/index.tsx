import React from "react";
import Page from "@/pages";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import { staticHomeAppRoute } from "../routers/home";

const MainLayout: FC = () => {
  console.log("");
  return (
    <div
      style={{
        border: "1px solid red",
        textAlign: "center",
        padding: 30,
        marginTop: 30,
      }}
    >
      <h3> 子应用 app_data </h3>
      <Space wrap>
        <Link to={"/hello"}>Go Hello</Link>
        <Link to={"/about"}>Go About</Link>
        <Link to={"/count"}>Go count</Link>
      </Space>
      <Page AppRoute={staticHomeAppRoute} />
    </div>
  );
};

export default MainLayout;
