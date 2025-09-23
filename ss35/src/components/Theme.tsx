import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { toggle } from "../slices/themeReducer";

export const Theme = () => {
  const value = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const style: React.CSSProperties =
    value === "light"
      ? {
          color: "black",
          backgroundColor: "white",
          padding: "60px",
        }
      : {
          padding: "60px",
          color: "white",
          backgroundColor: "#333333",
        };
  const styleBtn: React.CSSProperties =
    value === "light"
      ? {
          color: "black",
          backgroundColor: "white",
          padding: "6px",
          borderColor: "gray",
        }
      : {
          padding: "6px",
          color: "white",
          backgroundColor: "#333333",
          borderColor: "gray",
        };
  return (
    <div style={style}>
      <button style={styleBtn} onClick={() => dispatch(toggle())}>
        {value}
      </button>
    </div>
  );
};
