import React from "react";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages";
import { staticAppRoute } from "./routers";

function App() {
  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? "/app_data" : "/"}>
      <Page AppRoute={staticAppRoute} />
    </BrowserRouter>
  );
}

export default App;
