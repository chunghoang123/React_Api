import { Button, Checkbox, Input, Modal, Spin } from "antd";
import axios from "axios";
import React, {
  use,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface TodoListType {
  id?: number;
  name?: string;
  status?: boolean;
}

export const TodoList = () => {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalId, setModalId] = useState<number | undefined>(undefined);
  const [postToDo, setPostToDo] = useState<TodoListType>({
    name: "",
    status: false,
  });
  const [errorPost, setErrorPost] = useState<string>("");
  const [isErrorPost, setIsErrorPost] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modeForm, setModeForm] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [valueEdit, setValueEdit] = useState<string | undefined>("");

  const fectData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/todoList`);
      setTodoLists(response.data);

      setIsLoading(false);

      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fectData();
  }, []);

  const onChangeCheckBox = async (id: number | undefined) => {
    try {
      const todoStatus = todoLists.find((e) => e.id === Number(id));
      if (!todoStatus) return;
      await axios.patch(`http://localhost:3000/todoList/${id}`, {
        status: !todoStatus?.status,
      });

      fectData();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteTodo = async (id: number | undefined) => {
    try {
      await axios.delete(`http://localhost:3000/todoList/${id}`);

      fectData();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteShowModal = (id: number | undefined) => {
    setModeForm("add");
    setModalId(id);
    showModal();
  };

  const showModal = () => {
    setIsModal(true);
  };

  const handleOk = () => {
    setIsModal(false);
    if (modeForm !== "edit") {
      deleteTodo(modalId);
    } else {
      handleSubmitEdit();
    }
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPostToDo({ ...postToDo, [name]: value });
    setValueEdit(value);
    console.log(postToDo);
    if (value.trim() === "") {
      setErrorPost("Tên công việc không được để trống");
      setIsErrorPost(true);
    } else {
      setIsErrorPost(false);
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitEdit();
  };

  const handleSubmitEdit = async () => {
    const name = postToDo.name?.trim() || "";

    if (!name) {
      setErrorPost("Tên công việc không được để trống");
      setIsErrorPost(true);
      return;
    }

    const isDup = todoLists.findIndex(
      (item) => item.name === name && item.id !== editId
    );

    if (isDup !== -1) {
      setErrorPost("Tên công việc không được trùng");
      setIsErrorPost(true);
      return;
    }

    setIsErrorPost(false);

    try {
      if (modeForm === "add") {
        await axios.post("http://localhost:3000/todoList", {
          name,
          status: postToDo.status || false,
        });
      } else if (modeForm === "edit" && editId) {
        await axios.patch(`http://localhost:3000/todoList/${editId}`, {
          name,
          status: postToDo.status,
        });
      }

      await fectData();
      setPostToDo({ name: "", status: false });
      setModeForm("add");
      setEditId(undefined);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEdit = (id: number | undefined) => {
    const todo = todoLists.find((e) => e.id === id);
    if (!todo) return;
    setPostToDo({ ...todo });
    setModeForm("edit");
    setEditId(id);
    setValueEdit(todo.name);
    showModal();
  };

  return (
    <div className="w-150 border border-black p-4 m-10 rounded-md">
      <h1 className="text-center mb-2">Quản lý công việc</h1>
      <form
        className="w-140 shadow-lg p-4 rounded-md"
        onSubmit={handleSubmitForm}
      >
        <Input
          onChange={handleChange}
          name="name"
          placeholder="Nhập tên công việc"
        ></Input>
        {isErrorPost && <p className="text-red-500 mt-1">{errorPost}</p>}
        <Button htmlType="submit" className="mt-3 w-full" type="primary">
          Thêm công việc
        </Button>
      </form>
      <div className="w-140 shadow-lg p-4 flex justify-evenly rounded-md">
        <Button className="" type="primary">
          Tất cả
        </Button>
        <Button className="">Hoàn thành</Button>
        <Button className="">Đang thực thi</Button>
      </div>
      <div>
        {isLoading ? (
          <div className="text-center mt-5 mb-5">
            <Spin />
          </div>
        ) : (
          todoLists.map((e) => (
            <div className="w-140 shadow-lg p-4 mt-4 mb-4 flex justify-between rounded-md">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={e.status}
                  onChange={() => onChangeCheckBox(e.id)}
                />
                <span className={e.status ? "line-through text-gray-500" : ""}>
                  {e.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span onClick={() => handleEdit(e.id)}>🖋️</span>
                <span onClick={() => deleteShowModal(e.id)}>🗑️</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className=" mb-4 flex gap-2 rounded-md">
        <Button className="w-[calc(50%-0.5rem)]" type="primary" danger>
          Xoá công việc hoàn thành
        </Button>
        <Button className="w-[calc(50%-0.5rem)]" type="primary" danger>
          Xoá tất cả các công việc
        </Button>
      </div>
      <Modal
        title={modeForm !== "edit" ? "Xác Nhận" : "Sửa công việc"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác Nhận"
        cancelText="Huỷ"
        okButtonProps={modeForm !== "edit" ? { danger: true } : undefined}
      >
        {modeForm !== "edit" ? (
          <p>
            Bạn có chắc chắn muốn xoá công việc {""}
            {todoLists.find((e) => e.id === modalId)?.name} không?
          </p>
        ) : (
          <div>
            <Input
              onChange={handleChange}
              name="name"
              placeholder="Nhập tên công việc"
              value={valueEdit}
            ></Input>
          </div>
        )}
      </Modal>
    </div>
  );
};
