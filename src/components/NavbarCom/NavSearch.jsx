import { useState } from "react";

function NavSearch({ handleSearch, query }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      // value={query}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

export default NavSearch;
