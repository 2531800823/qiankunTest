import React from "react";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages";
import { staticAppRoute } from "./routers";
import { store, Provider } from "global_store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Page AppRoute={staticAppRoute} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
