import React from "react";
import PhongTroCard from "./PhongTroCard";
import SoTrang from "./PageNumber";
import PhongTro from "./PhongTro";

export default class ContentDanhSach extends React.Component {
  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <div className="container">
          <h3 className="font-weight-bold">có 100 chỗ ở</h3>
          {/* <div className="row" style={{ marginTop: "10px" }}>
          <PhongTroCard />
        </div> */}
        </div>
        <div className="container-fluid">
          <div className="row">
            <PhongTro />
            <PhongTro />
            <PhongTro />
            <PhongTro />
            <PhongTro />
          </div>
        </div>
        {/* <SoTrang /> */}
      </div>
    );
  }
}
