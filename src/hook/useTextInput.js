import { useCallback } from "react";

export default function useTextInput(onEmptyText) {
  const handleKeyUp = useCallback(
    (val) => {
      if (val.length > 0) {
        // shrink to 35vw when typing
        document.documentElement.style.setProperty("--text-input-width", "25vw");
        onEmptyText(false);
      } else {
        // expand back to 45vw when empty
        document.documentElement.style.setProperty("--text-input-width", "45vw");
        onEmptyText(true);
      }
    },
    [onEmptyText]
  );

  return { handleKeyUp };
}
