import React from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import { Card } from "antd";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card
        title="📋 Task Manager"
        bordered
        style={{ width: 600 }}
        className="shadow-lg"
      >
        <div className="space-y-4">
          <TaskForm />
          <TaskFilters />
          <TaskList />
        </div>
      </Card>
    </div>
  );
}
