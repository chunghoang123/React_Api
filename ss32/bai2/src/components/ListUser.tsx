import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../types/user";

const ListUser: React.FC = () => {
  const users: User[] = useSelector((state: RootState) => state.user.users);

  return (
    <div>
      <h2>Danh sách User</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.userName}</td>
              <td>{u.gender}</td>
              <td>{u.dateBirth}</td>
              <td>{u.address}</td>
              <td>
                <button style={{ marginRight: "8px" }}>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
