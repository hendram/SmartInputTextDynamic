import { useCallback, useEffect } from "react";

export default function useTextInput(onEmptyText, showButtons, inputRef, divRef) {

  const handleKeyUp = useCallback(
    (val) => {
    const textinput = inputRef.current;
      const textinputdiv = divRef.current;
      if (!textinput || !textinputdiv) return; 
      if (val.length > 0) {
        // shrink to 35vw when typing
        textinputdiv.style.setProperty("--textinputdiv-width", "13vw");
        textinput.style.setProperty("--textinput-width", "12vw");
        textinputdiv.style.setProperty("--textinputdiv-height", "6vh");
        textinput.style.setProperty("--textinput-height", "5vh");
       
        onEmptyText(false);
      } else {
        // expand back to 45vw when empty
        textinputdiv.style.setProperty("--textinputdiv-width", "25vw");
        textinput.style.setProperty("--textinput-width", "24vw");
        textinputdiv.style.setProperty("--textinputdiv-height", "7vh");
        textinput.style.setProperty("--textinput-height", "5vh");
        onEmptyText(true);
      }
    },
    [onEmptyText, inputRef, divRef]
  );

  useEffect(() => {
       const textinput = inputRef.current;
    const textinputdiv = divRef.current;
    if (!textinput || !textinputdiv) return;

    if (!showButtons) {
      textinputdiv.style.setProperty("--textinputdiv-width", "25vw");
      textinput.style.setProperty("--textinput-width", "24vw");
    }
  }, [showButtons, inputRef, divRef]);

  return { handleKeyUp };
}
