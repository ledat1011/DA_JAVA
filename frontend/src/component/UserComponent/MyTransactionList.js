import React from "react";
import Header from "../layout/Header";
import { Link, NavLink as Active } from "react-router-dom";
import MenuTrans from "./_menuTransaction";
import HeaderProfile from "../layout/HeaderProfile";

export default class MyTransactionList extends React.Component {
  render() {
    return (
      <div>
        <HeaderProfile />
        <div className="clearfix"></div>
        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            <MenuTrans />
            <div className="col-md-8">
              <h3>Các phòng đã đặt cọc: 1</h3>
              <div
                className="card-body rounded row list-horizonal"
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  marginTop: "20px",
                }}
              >
                <p style={{ position: "absolute" }}>#1</p>
                <div
                  className="col-md-3"
                  style={{ padding: "30px 0 0px 10px" }}
                >
                  <img src="http://via.placeholder.com/150x150" />
                </div>

                <div
                  className="col-md-3"
                  style={{ padding: "45px 0 20px 15px" }}
                >
                  <ul style={{ float: "left" }}>
                    {/* Tên người đăng */}
                    <li>Nguyễn Hoàng Hưng</li>
                    <br />
                    {/* Email */}
                    <li>
                      <div
                        title="hung19997126@gmail.com"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "120px",
                          height: "20px",
                          textOverflow: "ellipsis",
                        }}
                      >
                        hung19997126@gmail.com
                      </div>
                    </li>
                    <br />
                    {/* Số điện thọai */}
                    <li>0375510924</li>
                  </ul>
                </div>
                <div
                  className="col-md-3"
                  style={{ padding: "45px 0 20px 15px" }}
                >
                  <ul style={{ float: "left" }}>
                    {/* Mã đặt chỗ */}
                    <li>
                      <strong>Mã bài đăng: #1234</strong>
                    </li>
                    <br />
                    <li>
                      <div
                        title="Nguyễn Hoàng Hưng"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "120px",
                          height: "20px",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Tiêu đề: Nguyễn Hoàng Hưng
                      </div>
                    </li>
                    <br />
                    {/* Trạng thái duyệt */}
                    <li>Trạng thái: Đang chờ xem phòng</li>
                  </ul>
                </div>
                <div
                  className="col-md-3"
                  style={{ padding: "40px 0 20px 15px" }}
                >
                  <ul style={{ float: "left" }}>
                    {/* Ngày đăng */}
                    <li>Ngày đặt cọc: 21/01/2021</li>
                    <br />
                    {/* Tổng tiền */}
                    <li>Tổng tiền: 100.000</li>
                    <br />
                    <li>
                      <button className="btn btn-success">
                        Quay lại bài đăng
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
