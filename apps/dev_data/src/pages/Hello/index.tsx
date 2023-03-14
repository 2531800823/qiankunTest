import React from "react";
import type { FC } from 'react';

interface HelloProps {}

const Hello: FC<HelloProps> = (props) => {
  const {} = props;
  return <div>Hello</div>;
};

export default Hello;
