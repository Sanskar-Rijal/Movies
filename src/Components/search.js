import React from "react";

export default function Search() {
  const [query, setQuery] = React.useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search for a movie...."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}
