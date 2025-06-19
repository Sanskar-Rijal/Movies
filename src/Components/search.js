import React from "react";

export default function Search({ query, setQuery }) {
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
