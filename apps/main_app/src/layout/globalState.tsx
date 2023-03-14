import React, { FC, useEffect, useState } from "react";
import { initGlobalState } from "qiankun";
import { Button, Space } from "antd";
import { useAppDispatch, useAppSelector, store } from "global_store";
interface GlobalStateProps {}
const { onGlobalStateChange, setGlobalState, offGlobalStateChange } =
  initGlobalState({
    list: [1, 2, 3, 4],
    name: "liu",
    age: 18,
    store,
  });

const GlobalState: FC<GlobalStateProps> = (props) => {
  const {} = props;
  const value = useAppSelector((a1) => a1.counter.value);

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
    <div style={{ marginTop: 10, border: "1px solid skyblue" }}>
      <div></div>
      <Space wrap>
        <Button type="primary" onClick={hanldeUpdataState}>
          更改全局数据
        </Button>
      </Space>
      <div>
        {value}
        {list.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default GlobalState;
