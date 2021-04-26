import React from "react";
import HeaderTemp from "./_headerAdmin";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { manageUserHelper } from "../../ADMIN/_helper_admin/user.admin.helper";
import { getFormattedDate } from "../../_type/formatdate.helper";

export default class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      showAlert: false,
      errorMess: "",
    };
  }

  componentDidMount = () => {
    //initialize datatable
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });
    manageUserHelper.getall().then((data) => {
      console.log(data);
      if (data.status) {
        this.setState({
          user: data.data,
        });
      } else {
        this.setState({
          showAlert: true,
          errorMess: data.err,
        });
      }
    });
  };
  render() {
    return (
      <div>
        <HeaderTemp />
        <div className="container">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Quản lý người dùng</h1>
          {/* DataTales Example */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                DataTables Example
              </h6>
            </div>
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
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Type</th>
                      <th>Số lượng bài đăng</th>
                      <th>Create at</th>
                      <th>Salary</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {!this.state.user.length !== 0 ? (
                      this.state.user.map((c) => (
                        <tr>
                          <td>
                            {c.First_name} {c.Last_name}
                          </td>
                          <td>{ c.user_roles.role? c.user_roles.role.name :"Customner"}</td>
                          <td>Tokyo</td>
                          <td>{c.loaidangnhap.ten}</td>
                          <td>10</td>
                          <td>{getFormattedDate(c.Created_at)}</td>
                          <td>$170,750</td>
                          <td>
                            <i
                              className="btn btn-danger fa fa-lock"
                              aria-hidden="true"
                            ></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div class="loader2">
                        <div class="loader_ajax_small"></div>
                      </div>
                    )}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
