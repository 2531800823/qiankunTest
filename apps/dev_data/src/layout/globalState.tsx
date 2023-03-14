import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Space } from "antd";
import { QiankunContext } from "..";

const GlobalState: FC = () => {
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
    <div
      style={{
        marginTop: 10,
      }}
    >
      <Space wrap>
        <Button type="primary" onClick={hanldeUpdateState}>
          更改全局数据
        </Button>
      </Space>

      <div>
        {list.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default GlobalState;
