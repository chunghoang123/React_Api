import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slices/taskSlice";
import { Input, Select, Button, Space } from "antd";
import type { AppDispatch } from "../stores/store";

const { Option } = Select;

export default function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");

  const handleAdd = () => {
    if (!taskName.trim()) return;
    dispatch(addTask({ taskName, priority, completed: false }));
    setTaskName("");
    setPriority("High");
  };

  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        placeholder="Công việc mới"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Select value={priority} onChange={setPriority} style={{ width: 120 }}>
        <Option value="High">Cao</Option>
        <Option value="Medium">Trung bình</Option>
        <Option value="Low">Thấp</Option>
      </Select>
      <Button type="primary" onClick={handleAdd}>Thêm</Button>
    </Space.Compact>
  );
}
