import React from "react";
import "./textinput.css";
import useTextInput from "../hook/useTextInput.js";

function TextInput({ value, onChange, onEmptyText }) {
  const { handleKeyUp } = useTextInput(onEmptyText);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        handleKeyUp(e.target.value); // delegate to hook
      }}
      className="text-input"
    />
  );
}

export default TextInput;
