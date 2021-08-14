import React from "react";

const TabsBar = () => (
  <div
    style={{
      display: "flex",
      position: "sticky",
      top: 0,
      backgroundColor: "white",
      paddingTop: 10,
      textTransform: "uppercase",
      height: 30,
    }}
  >
    <div style={{ marginRight: 40 }}>
      <span style={{ color: "grey" }}>moments</span>
    </div>
    <div
      style={{
        marginRight: 40,
        paddingBottom: 30,
        borderBottom: "5px solid black",
      }}
    >
      <span>packs</span>
    </div>
    <div style={{ marginRight: 40 }}>
      <span style={{ color: "grey" }}>showcases</span>
    </div>
    <div>
      <span style={{ color: "grey" }}>creator rewards</span>
    </div>
  </div>
);

export default TabsBar;
