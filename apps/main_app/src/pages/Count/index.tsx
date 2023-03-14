import type { FC } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface CountProps {}

const Count: FC<CountProps> = () => (
  <>
    <Link to={"/"}>后退</Link>
    <div>Count</div>
  </>
);

export default Count;
