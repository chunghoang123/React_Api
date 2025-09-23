import React from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { toggleGrid } from "../slices/gridReducer";
export const ListGrid = () => {
  const { grid } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <div style={{ width: "30%" }}>
      <button onClick={() => dispatch(toggleGrid())}>{grid} mode</button>
      <div
        className="gridContainer"
        style={{ flexDirection: grid === "List" ? "column" : "row" }}>
        <span className="col">1</span>
        <span className="col">2</span>
        <span className="col">3</span>
        <span className="col">4</span>
      </div>
    </div>
  );
};
