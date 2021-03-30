import React from "react";
import Header from "./Header";
import { NavLink as Active } from "react-router-dom";

export default class HeaderProfile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div class="tab-wrap tab-container">
          <ul class="tab-list">
            <li>
              <Active activeClassName="in" to="/profile">
                Thông tin người dùng
              </Active>
            </li>
            <li>
              <Active activeClassName="in" to="/my-wish-list">
                Bài viết yêu thích
              </Active>
            </li>
            <li>
              <Active activeClassName="in" to="/my-list-post">
                Quản lý
              </Active>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
