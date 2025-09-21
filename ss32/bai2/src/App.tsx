import React from "react";
import Counter from "./components/Counter";
import ListUser from "./components/ListUser";

const App: React.FC = () => {
  return (
    <div>
      <h1>Quản lý ứng dụng với Redux</h1>
      <Counter />
      <hr />
      <ListUser />
    </div>
  );
};

export default App;
