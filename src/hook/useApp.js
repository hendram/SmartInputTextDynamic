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
    container.style.setProperty("--width", empty ? "47vw" : "37vw");
    setShowButtons(!empty);

    if (!empty) {
      // reset timer if user types again before 5s ends
      if (timerId) clearTimeout(timerId);

      const id = setTimeout(() => {
        container.style.setProperty("--width", "47vw");
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

  return { inputs, setInputs, handleEmptyText, buttons, showButtons };
}
