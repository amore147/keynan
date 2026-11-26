import { useEffect } from "react";

export function useEscape(callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") callback();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}
