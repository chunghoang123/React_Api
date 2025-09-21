import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { increment, decrement } from "../redux/counterReducer";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment(1))}>Tăng</button>
      <button onClick={() => dispatch(decrement(1))}>Giảm</button>
    </div>
  );
};

export default Counter;
