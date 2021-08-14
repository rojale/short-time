import React from "react";

const ClosedPack = ({ onClick }) => {
  return (
    <div
      style={{
        height: "80vh",
        width: 400,
        border: "1px solid black",
        cursor: onClick ? "pointer" : null,
        backgroundColor: "white",
      }}
    ></div>
  );
};

export default ClosedPack;
