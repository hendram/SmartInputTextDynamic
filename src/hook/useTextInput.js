import { useCallback, useEffect } from "react";

export default function useTextInput(onEmptyText, showButtons, inputRef, divRef, index, 
  retypeAfterHide) {

  const handleKeyUp = useCallback(
    (val) => {
    const textinput = inputRef.current;
      const textinputdiv = divRef.current;
      if (!textinput || !textinputdiv) return; 
      if (val.length > 0) {
        // shrink to 35vw when typing
        textinputdiv.style.setProperty("--textinputdiv-width", "13vw");
        textinput.style.setProperty("--textinput-width", "12vw");
       
        onEmptyText(false);
      } else {
        // expand back to 45vw when empty
        textinputdiv.style.setProperty("--textinputdiv-width", "19vw");
        textinput.style.setProperty("--textinput-width", "18vw");
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
      textinputdiv.style.setProperty("--textinputdiv-width", "19vw");
      textinput.style.setProperty("--textinput-width", "18vw");
    }
    else {
     if(index===0 && retypeAfterHide){
textinputdiv.style.setProperty("--textinputdiv-width", "13vw");
        textinput.style.setProperty("--textinput-width", "12vw");
}
  }
}, [showButtons, inputRef, divRef, index, retypeAfterHide]);

  return { handleKeyUp };
}
