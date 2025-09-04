import React, { forwardRef, useImperativeHandle }  from "react";
import useApp from "./hook/useApp.js";
import TextInput from "./modules/TextInput.jsx";
import Button from "./modules/Button.jsx";
import "./App.css";


const SmartInputTextDynamic = forwardRef((props, ref) => {
  const { inputs, setInputs, handleEmptyText, buttons, showButtons } = useApp();

  const handleChange = (i, newVal) => {
    const newInputs = [...inputs];
    newInputs[i] = newVal;
    setInputs(newInputs);
  };

useImperativeHandle(ref, () => ({
    getValues: () => inputs,
  }));

  return (
    <div className="container">
      {/* Left side: inputs stacked */}
      <div className="inputscontainer">
        {inputs.map((val, i) => (
          <TextInput
            key={i}
            value={val}
            onChange={(newVal) => handleChange(i, newVal)} // update state
            onEmptyText={(isEmpty) => handleEmptyText(isEmpty)} // toggle buttons
            showButtons={showButtons}
          />
        ))}
      </div>

      {/* Right side: buttons row */}
      {showButtons && (
        <div className="buttoncontainer">
          {buttons.map((btn, i) => (
            <Button key={i} label={btn.symbol} onClick={btn.onClick} />
          ))}
        </div>
      )}
    </div>
  );
});

export default SmartInputTextDynamic;
