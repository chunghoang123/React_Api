import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ListUser from "./components/ListUser";
import Counter from "./components/Counter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ListUser />
      <Counter/>
    </Provider>
  </React.StrictMode>
);
