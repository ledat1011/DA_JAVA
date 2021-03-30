import React from "react";
import { Link, NavLink as Active } from "react-router-dom";

export default class MenuTrans extends React.Component {
  render() {
    return (
      
        <div className="col-md-4">
          <ul className="list-vertical" style={{ float: "left" }}>
            <li>
              <Active activeStyle={{ color: "#f5a623" }} to="/my-list-post">
                Quản lý bài đăng
              </Active>
            </li>
            <li>
              <Active activeStyle={{ color: "#f5a623" }} to="/my-reported-post">
                Quản lý phản hồi
              </Active>
            </li>
            <li>
              <Active activeStyle={{ color: "#f5a623" }} to="/my-list-transaction">
                Quản lý lịch sử giao dịch
              </Active>
            </li>
            <li>Quản lý doanh thu</li>
            <li>Nạp tiền</li>
          </ul>
          {/* <TabsChange>Quản lý bài đăng Quản lý bài đăng</TabsChange> */}
        </div>
      
    );
  }
}
