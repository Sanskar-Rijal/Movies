import { useEffect, useRef } from "react";
import { useKey } from "../custom/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null); //in case of dom element it's usually null at the beginning

  //custom hook
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return; //let's say our code is already focused on the input element, and user is typing , we don't want to delete
    //when user pressses the Enter Key
    inputEl.current.focus();
    setQuery(""); //clear the search input when user presses enter
  });

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
