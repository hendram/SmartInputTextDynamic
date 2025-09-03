import { useState, useEffect } from "react";
import useButton from "./useButton.js";

export default function useApp(config = {}) {
  const [inputs, setInputs] = useState([""]);
  const [showButtons, setShowButtons] = useState(false);
  const [timerId, setTimerId] = useState(null);

  // default config
  const defaults = {
    count: 1,
    buttons: 2,
    direction: "row",
    width: "47vw",
    height: "7vh",
    justify: "center",
    align: "center",
  };

  const settings = { ...defaults, ...config };

  // setup css vars on load/config change
  useEffect(() => {
    const cssVars = {
      "--display": "flex",
      "--flex-direction": settings.direction,
      "--width": settings.width,
      "--height": settings.height,
      "--justify-content": settings.justify,
      "--align-items": settings.align,
    };
    for (const [key, value] of Object.entries(cssVars)) {
      document.documentElement.style.setProperty(key, value);
    }

   
  }, [settings]);

  const handleEmptyText = (empty) => {
    const container = document.querySelector(".container");
    const inputcontainer = document.querySelector(".inputs-container");
      
     
    container.style.setProperty("--width", empty ? "49vw" : "39vw");
    inputcontainer.style.setProperty("--width-input-con", empty ? "47vw" : "27vw");
    inputcontainer.style.setProperty("--height-input-con", "8vh")
    setShowButtons(!empty);

    if (!empty) {
      // reset timer if user types again before 5s ends
      if (timerId) clearTimeout(timerId);

      const id = setTimeout(() => {
        container.style.setProperty("--width", "49vw");
        inputcontainer.style.setProperty("--width-input-con", "47vw");
        setShowButtons(false);
      }, 5000);

      setTimerId(id);
    } else {
      // if input is cleared manually, stop timer
      if (timerId) clearTimeout(timerId);
      setTimerId(null);
    }
  };

  // give buttons access to inputs state
  const { buttons } = useButton(inputs, setInputs);

useEffect(() => {
  const container = document.querySelector(".container");
  const inputcontainer = document.querySelector(".inputs-container");
  
  if (container) {
    // adjust height of container based on input count
    const newHeight = `${inputs.length * 8}vh`; 
    container.style.setProperty("--height", newHeight);
    inputcontainer.style.setProperty("--height-input-con", newHeight);
  }
}, [inputs.length]);


  return { inputs, setInputs, handleEmptyText, buttons, showButtons };
}
