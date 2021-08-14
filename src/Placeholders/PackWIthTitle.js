import React, { useContext, useRef } from "react";
import { SetActivePackContext } from "../App";
import ClosedPack from "./ClosedPack";

const PackWithTitle = () => {
  const setActivePack = useContext(SetActivePackContext);

  const packElRef = useRef();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        const { x, y } = packElRef.current.getBoundingClientRect();
        setActivePack({ packData: {}, animationArgs: { x, y } });
      }}
    >
      <div style={{ marginBottom: 15 }}>
        <span style={{ fontSize: 30, textTransform: "uppercase" }}>
          This is a Title
        </span>
      </div>
      <div ref={packElRef}>
        <ClosedPack />
      </div>
    </div>
  );
};

export default PackWithTitle;
