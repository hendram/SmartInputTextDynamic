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
    width: "25vw",
    height: "8vh",
    justify: "flex-start",
    align: "flex-start",
  };

  const settings = { ...defaults, ...config };

  // setup css vars on load/config change
useEffect(() => {
const cssVars = {
  "--container-display": "flex",
  "--container-flex-direction": settings.direction,
  "--container-width": settings.width,
  "--container-height": settings.height,
  "--container-justify": settings.justify,
  "--container-align-items": settings.align,
};
    for (const [key, value] of Object.entries(cssVars)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [settings]);

  const handleEmptyText = (empty) => {
    const container = document.querySelector(".container");
    const inputcontainer = document.querySelector(".inputscontainer");
     
    container.style.setProperty("--container-width", empty ? "25vw" : "25vw");
    inputcontainer.style.setProperty("--inputscontainer-width", empty ? "25vw" : "13vw");
    inputcontainer.style.setProperty("--inputscontainer-height", "8vh")
    setShowButtons(!empty);

    if (!empty) {
      // reset timer if user types again before 5s ends
      if (timerId) clearTimeout(timerId);

      const id = setTimeout(() => {
        container.style.setProperty("--container-width", "25vw");
        inputcontainer.style.setProperty("--inputscontainer-width", "25vw");
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
  const inputcontainer = document.querySelector(".inputscontainer");
  
  if (container) {
    // adjust height of container based on input count
    const newHeight = `${inputs.length * 8}vh`; 
    container.style.setProperty("--container-height", newHeight);
    inputcontainer.style.setProperty("--inputscontainer-height", newHeight);
  }
}, [inputs.length]);


  return { inputs, setInputs, handleEmptyText, buttons, showButtons };
}
