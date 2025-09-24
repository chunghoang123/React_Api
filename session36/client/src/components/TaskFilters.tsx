import React from "react";
import { useDispatch } from "react-redux";
import { setSearch, setFilterStatus, setFilterPriority } from "../slices/taskSlice";
import { Input, Select, Space } from "antd";
import type { AppDispatch } from "../stores/store";

const { Option } = Select;

export default function TaskFilters() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Space style={{ width: "100%", marginTop: 12 }}>
      <Select defaultValue="all" onChange={(v) => dispatch(setFilterStatus(v as "all" | "completed" | "incomplete"))} style={{ flex: 1 }}>
        <Option value="all">Tất cả</Option>
        <Option value="completed">Hoàn thành</Option>
        <Option value="incomplete">Chưa xong</Option>
      </Select>
      <Select defaultValue="all" onChange={(v) => dispatch(setFilterPriority(v as "all" | "High" | "Medium" | "Low"))} style={{ flex: 1 }}>
        <Option value="all">Tất cả</Option>
        <Option value="High">Cao</Option>
        <Option value="Medium">Trung bình</Option>
        <Option value="Low">Thấp</Option>
      </Select>
      <Input.Search
        placeholder="Tìm kiếm"
        allowClear
        onChange={(e) => dispatch(setSearch(e.target.value))}
        style={{ flex: 2 }}
      />
    </Space>
  );
}
