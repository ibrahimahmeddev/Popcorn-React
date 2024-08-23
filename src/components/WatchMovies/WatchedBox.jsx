import { useState } from "react";
import WatchSummary from "./WatchSummary";

const [isOpen2, setIsOpen2] = useState(true);
function WatchedBox() {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchSummary watched={watched} />
          <ListWatch watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchedBox;
