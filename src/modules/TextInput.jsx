import React, {useRef} from "react";
import "./textinput.css";
import useTextInput from "../hook/useTextInput.js";

function TextInput({ value, onChange, onEmptyText, showButtons }) {
    const inputRef = useRef(null);
  const divRef = useRef(null);

  const { handleKeyUp } = useTextInput(onEmptyText, showButtons, inputRef, divRef);

  return (
   <div className="textinputdiv" ref={divRef}>
    <input
      type="text"
      value={value}
        ref={inputRef}
      onChange={(e) => {
        onChange(e.target.value);
        handleKeyUp(e.target.value); // delegate to hook
      }}
      className="textinput"
    />
   </div>
  );
}

export default TextInput;
