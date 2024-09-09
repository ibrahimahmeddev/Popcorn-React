import { useRef } from "react";
import { useKey } from "../../customHooks/useKey";

function NavSearch({ handleSearch, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    setQuery("");
    inputEl.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => handleSearch(e.target.value)}
      ref={inputEl}
    />
  );
}

export default NavSearch;
