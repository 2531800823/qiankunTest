import { store,Provider } from "global_store";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages";
import { staticAppRoute } from "./routers";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? "/dev_data" : "/"}>
      <Page AppRoute={staticAppRoute} />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
