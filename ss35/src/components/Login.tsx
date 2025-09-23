import React, { useState } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { save } from "../slices/loginSlice";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginForm } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount = {
      email: email,
      password: password,
    };
    dispatch(save(newAccount));
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN FORM</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="nva@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      {loginForm.isloggedIn ? (
        <div className="user-container">
          <p>
            <b>Email:</b> {loginForm.email}
          </p>
          <p>
            <b>Password:</b> {loginForm.password}
          </p>
          <button>Đăng xuất</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
