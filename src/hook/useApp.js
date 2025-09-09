import { useState, useEffect } from "react";
import useButton from "./useButton.js";

export default function useApp(config = {}) {
  const [inputs, setInputs] = useState([""]);
  const [showButtons, setShowButtons] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [retypeAfterHide, setRetypeAfterHide] = useState(false);

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
     
    container.style.setProperty("--container-width", empty ? "20vw" : "20vw");
    inputcontainer.style.setProperty("--inputscontainer-width", empty ? "20vw" : "13vw");
    inputcontainer.style.setProperty("--inputscontainer-height", "6vh")
    setShowButtons(!empty);

    if (!empty) {
      // reset timer if user types again before 5s ends
      if (timerId) clearTimeout(timerId);

      const id = setTimeout(() => {
        container.style.setProperty("--container-width", "20vw");
        inputcontainer.style.setProperty("--inputscontainer-width", "20vw");
        setShowButtons(false);
      }, 5000);
        setRetypeAfterHide(true);
      setTimerId(id);
    } else {
      // if input is cleared manually, stop timer
      if (timerId) clearTimeout(timerId);
           setTimerId(null);
    setRetypeAfterHide(false);    
}
  };

  // give buttons access to inputs state
  const { buttons } = useButton(inputs, setInputs);

  return { inputs, setInputs, handleEmptyText, buttons, showButtons, retypeAfterHide };
}
