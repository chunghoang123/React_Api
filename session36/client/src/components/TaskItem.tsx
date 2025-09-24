import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask, type Task } from "../slices/taskSlice";
import { List, Checkbox, Tag, Button, Space, Modal, Input, Select } from "antd";
import type { AppDispatch } from "../stores/store";

const { Option } = Select;

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(task.taskName);
  const [editPriority, setEditPriority] = useState<Task["priority"]>(task.priority);

  const getPriorityTag = (priority: Task["priority"]) => {
    switch (priority) {
      case "High": return <Tag color="red">HIGH</Tag>;
      case "Medium": return <Tag color="orange">MEDIUM</Tag>;
      default: return <Tag color="green">LOW</Tag>;
    }
  };

  return (
    <>
      <List.Item
        actions={[
          <Button key="edit" type="link" onClick={() => setEditing(true)}>✏️</Button>,
          <Button key="delete" type="link" danger onClick={() => dispatch(deleteTask(task.id))}>🗑️</Button>,
        ]}
      >
        <Space>
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(updateTask({ ...task, completed: !task.completed }))}
          />
          <span className={task.completed ? "line-through text-gray-500" : ""}>
            {task.taskName}
          </span>
          {getPriorityTag(task.priority)}
        </Space>
      </List.Item>

      <Modal
        title="Sửa công việc"
        open={editing}
        onOk={() => {
          dispatch(updateTask({ ...task, taskName: editName, priority: editPriority }));
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      >
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <Select
          value={editPriority}
          onChange={(value: Task["priority"]) => setEditPriority(value)}
          style={{ width: "100%", marginTop: 8 }}
        >
          <Option value="High">Cao</Option>
          <Option value="Medium">Trung bình</Option>
          <Option value="Low">Thấp</Option>
        </Select>
      </Modal>
    </>
  );
}
