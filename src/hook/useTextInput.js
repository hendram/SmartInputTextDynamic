import { useCallback, useEffect } from "react";

export default function useTextInput(onEmptyText, showButtons, inputRef, divRef) {

  const handleKeyUp = useCallback(
    (val) => {
    const textinput = inputRef.current;
      const textinputdiv = divRef.current;
      if (!textinput || !textinputdiv) return; 
      if (val.length > 0) {
        // shrink to 35vw when typing
        textinputdiv.style.setProperty("--text-input-div-width", "27vw");
        textinput.style.setProperty("--text-input-width", "25vw");
       
        onEmptyText(false);
      } else {
        // expand back to 45vw when empty
        textinputdiv.style.setProperty("--text-input-div-width", "47vw");
        textinput.style.setProperty("--text-input-width", "45vw");
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
      textinputdiv.style.setProperty("--text-input-div-width", "47vw");
      textinput.style.setProperty("--text-input-width", "45vw");
    }
  }, [showButtons, inputRef, divRef]);

  return { handleKeyUp };
}
