import React from "react";
import HeaderTemp from "./_headerAdmin";
import $ from "jquery";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default class ManageBanner extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showInlineComment: false,
      image: [],
    };
  }

  componentDidMount = () => {
    //initialize datatable
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });
  };

  toggleRow = (e) => {
    console.log("toggleRow");

    this.setState({ showInlineComment: !this.state.showInlineComment });
  };

  inlineCreateBanner = () => {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="w-50" style={{ margin: "10px auto", maxWidth: "500px" }}>
        <div className="card">
          <div className="card-body">
            <h3>Tạo banner</h3>

            <div className="form-group">
              <label>
                Mô tả: <input className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <Upload>
                {this.state.image.length >= 1 ? null : uploadButton}
              </Upload>
            </div>

            <button className="btn btn-success">Tải lên</button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <HeaderTemp />
        <div className="container-fluid text-center">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Quản lý banner</h1>
          {/* DataTales Example */}
          <div className="card shadow mb-4" style={{ marginLeft: "100px" }}>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Mô tả</th>
                      <th>Ảnh</th>
                      <th>Ngày đăng</th>
                      <th>Ngày cập nhật</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nguyễn Hoàng Hưng</td>
                      <td>Ảnh</td>
                      <td>20/01/2021</td>
                      <td>20/01/2021</td>
                      <td>
                        <ul className="text-center w-100" style={{float: "left"}}>
                          <li>
                            <div className="form-group">
                              <select className="form-control">
                                <option>Hiện</option>
                                <option>Ẩn</option>
                              </select>
                            </div>
                          </li>
                          <li style={{marginLeft:"20px"}}>
                            <i
                              style={{ fontSize: "24px" }}
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            />
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                  {/* <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot> */}
                </table>
                <a onClick={this.toggleRow}>Tạo banner mới</a>
                {this.state.showInlineComment && <this.inlineCreateBanner />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
