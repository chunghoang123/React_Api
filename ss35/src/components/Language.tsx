import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { changeLanguage } from "../slices/languageSlice";

export const Language = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  return (
    <div>
      <select
        name=""
        id=""
        onChange={(e) => dispatch(changeLanguage(e.target.value))}>
        <option value="viet" selected>
          Vietnamese
        </option>
        <option value="eng">English</option>
      </select>
      <h3>{language.mode === "viet" ? language.viet : language.eng}</h3>
    </div>
  );
};
