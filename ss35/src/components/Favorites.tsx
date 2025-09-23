import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { toggleFavorite } from "../slices/favoriteSlice";
export const Favorites = () => {
  const dispatch = useAppDispatch();
  const { fav } = useAppSelector((state) => state);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "250px",
        fontFamily: "Arial, sans-serif",
        marginTop:"30px"
      }}>
      <h4>List Favorites User</h4>
      {fav.map((u) => (
        <div key={u.id} style={{ marginBottom: "10px" }}>
          <div>
            <b>UserName:</b> {u.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>Favorites:</span>
            {u.favorited ? (
              <HeartFilled style={{ color: "red" }} onClick={()=>dispatch(toggleFavorite(u.id))} />
            ) : (
              <HeartOutlined  onClick={()=>dispatch(toggleFavorite(u.id))}/>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
