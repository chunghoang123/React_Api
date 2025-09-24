import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, type Task } from "../slices/taskSlice";
import { List, Spin } from "antd";
import TaskItem from "./TaskItem";
import type { AppDispatch, RootState } from "../stores/store";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, search, filterPriority, filterStatus, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filtered: Task[] = list.filter((t) => {
    const matchSearch = t.taskName.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && t.completed) ||
      (filterStatus === "incomplete" && !t.completed);
    const matchPriority = filterPriority === "all" || filterPriority === t.priority;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <Spin spinning={loading} tip="Đang tải...">
      <List
        className="mt-4 bg-white rounded-lg shadow"
        dataSource={filtered}
        renderItem={(task: Task) => <TaskItem task={task} />}
      />
    </Spin>
  );
}
