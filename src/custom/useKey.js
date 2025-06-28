import { useEffect } from "react";

export function useKey(key, callback) {
  //useEffect to go back by pressing escape key
  useEffect(
    function () {
      function handleEscape(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          //  onCloseMovie();
          callback?.();
          // console.log("Escape key pressed, closing movie details");
        }
      }

      //adding a event listner for escape key
      document.addEventListener("keydown", handleEscape);

      //clean up function to remove event listener
      return function () {
        document.removeEventListener("keydown", handleEscape);
        // console.log("Clean up function called, removing event listener");
      };
    },
    [callback, key]
  );
}
