import React from "react";
import Header from "../layout/Header";
import { Link, NavLink as Active } from "react-router-dom";
import HeaderProfile from "../layout/HeaderProfile";
import Item from "antd/lib/list/Item";

class TabsChange extends React.Component {
  constructor(props) {
    super();
    this.state = {
      active: 0,
    };
  }

  select = (i) => {
    this.setState({
      active: i,
    });
  };

  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let _active = this.state.active === i ? "active" : null;
        return (
          <a onClick={(i) => this.select(i)} className={`${_active}`}>
            {item}
          </a>
        );
      }
    });
  };

  renderContents = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return (
          <div>
            <div className="col-md-8">{item}</div>
          </div>
        );
      } else {
        return;
      }
    });
  };

  render() {
    return (
      <div>
        <ul className="list-vertical">
          <li>{this.renderTabs(4)}</li>
        </ul>

        {this.renderContents}
        {/* <ul className="list-vertical" style={{ float: "left" }}>
          <li></li>
        </ul> */}
      </div>
    );
  }
}

export default class Posted extends React.Component {
  render() {
    return (
      <div>
        <HeaderProfile />

        <div className="clearfix"></div>

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="col-md-4">
              <ul className="list-vertical" style={{ float: "left" }}>
                <li>
                  <Active to="/posted">Quản lý bài đăng</Active>
                </li>
                <li>Quản lý lịch sử giao dịch</li>
                <li>Quản lý doanh thu</li>
                <li>Nạp tiền</li>
              </ul>
              {/* <TabsChange>Quản lý bài đăng Quản lý bài đăng</TabsChange> */}
            </div>
            <div className="col-md-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold">Bài viết đã đăng: 0</h6>
                  <i style={{float: "right", marginTop: "-20px"}} className="btn btn-success fa fa-plus" aria-hidden="true" />
                </div>
                <div class="card-body text-center">
                  <div class="table-responsive">
                    <table
                      class="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Số thứ tự</th>
                          <th>Tiêu đề</th>
                          <th>Ảnh</th>
                          <th>Người đăng</th>
                          <th>Địa chỉ</th>
                          <th>Giá</th>
                          <th>Số lượng truy cập</th>
                          <th>Trạng thái đặt cọc</th>
                          <th>Trạng thái duyệt</th>
                          <th>Ngày đăng</th>
                          <th>Ngày cập nhật</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td><button><i className="fa fa-pencil" aria-hidden="true"></i></button></td>
                        </tr>
                      </tbody>
                      {/* <tfoot>
                        <tr>
                          <th>Số thứ tự</th>
                          <th>Tiêu đề</th>
                          <th>Ảnh</th>
                          <th>Người đăng</th>
                          <th>Địa chỉ</th>
                          <th>Giá</th>
                          <th>Số lượng truy cập</th>
                          <th>Trạng thái đặt cọc</th>
                          <th>Trạng thái duyệt</th>
                          <th>Ngày đăng</th>
                          <th>Ngày cập nhật</th>
                        </tr>
                      </tfoot> */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
