import React from "react";
import HeaderTemp from "./_headerAdmin";
import $ from "jquery";

export default class ManageReport extends React.Component {
  componentDidMount = () => {
    //initialize datatable
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });
  };
  render() {
    return (
      <div>
        <HeaderTemp />
        <div className="container-fluid text-center">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Quản lý phản hồi</h1>
          {/* DataTales Example */}
          <div className="card shadow mb-4">
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
                      <th>Hình ảnh</th>
                      <th>Tên phòng trọ</th>
                   
                      <th>Số lượng phản hồi</th>
                      <th>Trạng thái bài đăng</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nguyễn Hoàng Hưng</td>
                      <td>Nguyễn Hoàng Hưng</td>
                      <td>
                        <div className="item">
                          <div className="layer1">10</div>
                          <div className="layer2">
                            <ul>
                              <li>Hoàng Hưng:</li>
                              <li> 20/01/2021</li>
                            </ul>
                            <ul>
                              <li>Hoàng Hưng:</li>
                              <li> 20/01/2021</li>
                            </ul>
                            <ul>
                              <li>Hoàng Hưng:</li>
                              <li> 20/01/2021</li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ul
                          className="text-center w-100"
                          style={{ float: "left" }}
                        >
                          <li>
                            <div className="form-group">
                              <select className="form-control">
                                <option>Hiện</option>
                                <option>Ẩn</option>
                              </select>
                            </div>
                          </li>
                          <li style={{ marginLeft: "20px" }}>
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

                  {/* <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011/04/25</td>
                      <td>$320,800</td>
                    </tr>
                    <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>2011/07/25</td>
                      <td>$170,750</td>
                    </tr>
                  </tbody> */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
