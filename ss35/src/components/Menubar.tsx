import React from "react";

import "../App.css";
import {
  DashboardOutlined,
  DollarOutlined,
  FileOutlined,
  LeftOutlined,
  LineChartOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { toggleMenubar } from "../slices/menubarReducer";
export const Menubar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.menubar);
  return (
    <div className="menuContainer">
      <div>
        <DashboardOutlined />{" "}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Bảng điều khiển
        </span>
      </div>
      <div>
        <UserOutlined />{" "}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Tài khoản
        </span>
      </div>
      <div>
        <DollarOutlined />{" "}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Tài sản
        </span>
      </div>
      <div>
        <LineChartOutlined />{" "}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Thống kê
        </span>
      </div>
      <div>
        <FileOutlined />{" "}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Tài liệu
        </span>
      </div>
      <div onClick={() => dispatch(toggleMenubar())}>
        {mode === "shrunk" ? <RightOutlined /> : <LeftOutlined />}
        <span
          style={{
            visibility: mode === "expanded" ? "visible" : "hidden",
            width: mode === "expanded" ? "auto" : "0",
            marginLeft: mode === "expanded" ? "5px" : "0",
          }}>
          Thu gọn
        </span>
      </div>
    </div>
  );
};
