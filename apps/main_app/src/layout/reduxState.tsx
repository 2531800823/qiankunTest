import React, { FC } from "react";
import { Button, Space } from "antd";
import {
  useAppSelector,
  useAppDispatch,
  increment,
  decrement,
} from "global_store";

interface ReduxStateProps {}

const ReduxState: FC<ReduxStateProps> = (props) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const store = useAppSelector((v) => v.counter);

  const hanldeIncrement = () => {
    dispatch(increment());
  };
  const hanldeDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div style={{ marginTop: 10, border: "1px solid black", marginLeft: 10 }}>
      <div></div>
      <Space wrap>
        <Button type="primary" onClick={hanldeIncrement}>
          +
        </Button>
        <Button type="primary" onClick={hanldeDecrement}>
          -
        </Button>
      </Space>
      <h1>{store.value}</h1>
      <h1>{store.list}</h1>

      <div></div>
    </div>
  );
};

export default ReduxState;
