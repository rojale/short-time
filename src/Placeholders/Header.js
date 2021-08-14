import React from "react";

const Header = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 50,
      paddingBottom: 50,
    }}
  >
    <div style={{ position: "relative", height: 150, width: 200 }}>
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 30,
          backgroundColor: "#ecf0f1",
          bottom: -15,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 20,
          height: 150,
          width: 160,
          border: "1px solid black",
          backgroundColor: "white",
        }}
      ></div>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        margin: "0 30px",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 30, marginBottom: 15 }}>
        NAME GOES HERE
      </span>
      <span style={{ color: "grey", marginBottom: 15 }}>@jimmy</span>
      <span style={{ marginBottom: 15 }}>
        randomhashgoeshereohwowaskdjaskldjkflajhskldfjhadklf
      </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Profile settings</span>
      <span>My Wallet</span>
    </div>
  </div>
);

export default Header;
