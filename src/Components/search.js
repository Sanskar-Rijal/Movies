import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null); //in case of dom element it's usually null at the beginning

  useEffect(
    function () {
      //when user presses the Enter key i want it to focus on the search bat
      function handleKeyDown(event) {
        if (document.activeElement === inputEl.current) {
          return; //let's say our code is already focused on the input element, and user is typing , we don't want to delete
          //when user pressses the Enter Key
        }

        if (event.code === "Enter") {
          event.preventDefault();
          inputEl.current.focus();
          setQuery(""); //clear the search input when user presses enter
        }
      }
      document.addEventListener("keydown", handleKeyDown);

      //Clean up function to remove event listener
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search for a movie...."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      ref={inputEl}
    />
  );
}
