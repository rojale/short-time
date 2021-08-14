import React from "react";

const ClosedPack = ({ onClick }) => {
  return (
    <div
      style={{
        height: "80vh",
        width: 300,
        border: "1px solid black",
        cursor: onClick ? "pointer" : null,
      }}
    ></div>
  );
};

export default ClosedPack;
