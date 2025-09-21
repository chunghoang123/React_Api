import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", width: "300px" }}>
      <h2>Thông tin User</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>UserName:</strong> {user.userName}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>DateBirth:</strong> {user.dateBirth}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
};

export default Profile;
