import React from "react";
import Header from "../layout/Header";
import { Link, NavLink as Active } from "react-router-dom";
import HeaderProfile from "../layout/HeaderProfile";
import Item from "antd/lib/list/Item";

import MenuTrans from "./_menuTransaction";

import { getPostByIdV1 } from "../../_helper";
import { connect } from "react-redux"
import { format } from "highcharts";
import { PATH } from "../../_type";
import { getFormattedDate } from "../../_type/formatdate.helper";


// class TabsChange extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       active: 0,
//     };
//   }

//   select = (i) => {
//     this.setState({
//       active: i,
//     });
//   };

//   renderTabs = () => {
//     return React.Children.map(this.props.children, (item, i) => {
//       if (i % 2 === 0) {
//         let _active = this.state.active === i ? "active" : null;
//         return (
//           <a onClick={(i) => this.select(i)} className={`${_active}`}>
//             {item}
//           </a>
//         );
//       }
//     });
//   };

//   renderContents = () => {
//     return React.Children.map(this.props.children, (item, i) => {
//       if (i - 1 === this.state.active) {
//         return (
//           <div>
//             <div className="col-md-8">{item}</div>
//           </div>
//         );
//       } else {
//         return;
//       }
//     });
//   };

//   render() {
//     return (
//       <div>
//         <ul className="list-vertical">
//           <li>{this.renderTabs(4)}</li>
//         </ul>

//         {this.renderContents}
//         {/* <ul className="list-vertical" style={{ float: "left" }}>
//           <li></li>
//         </ul> */}
//       </div>
//     );
//   }
// }

class MyListPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      post: [],
      error: "",
      showAlert: false
    }
  }
  componentDidMount() {
    if (this.state.post.length === 0) {
      this.state.user &&
        getPostByIdV1(this.state.user.id).then(data => {
          data.status 
          ? this.setState({ post: data.data })
          : this.setState({ showAlert: true, error: data.error })
        });
    }

  }
  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      return {user: props.user} }
  }

  render() {
    return (
      <div>
        <HeaderProfile />
        {this.state.showAlert && <div class="alert alert-danger" role="alert">
          {this.state.error}
        </div>}

        <div className="clearfix"></div>

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            
            <MenuTrans/>
            <div className="col-md-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold">Bài viết đã đăng: 0</h6>

                  <i
                    style={{ float: "right", marginTop: "-20px" }}
                    className="btn btn-success fa fa-plus"
                    aria-hidden="true"
                  />

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
                          <th>Mã </th>
                          <th>Ảnh</th>
                          <th>Tiêu đề</th>

                         
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
                        {this.state.post.length !== 0 && this.state.post.map(c => <tr>
                          <td>{c.id}</td>
                          <td><img src={PATH.image + c.avatar} width={50} height={50} /></td>
                          <td>{c.title}</td>
                          <td>{c.DiaChi}</td>
                          <td>{c.price}</td>
                          <td>{c.soLuongTruyCap}</td>
                         

                          <td> <i class={"fa " + (c.TrangThaiDatCoc?  "fa-check text-success": "fa-times text-danger")} aria-hidden="true"></i> </td>
                          <td><i class={"fa " + (c.status?  "fa-check text-success": "fa-times text-danger")} aria-hidden="true"></i></td>
                          <td>{getFormattedDate(c.Created_at)}</td>
                          <td>{getFormattedDate(c.Update_at)}</td>
                        </tr>)}


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
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.Account.user
  }
}
export default connect(mapStateToProps)(MyListPostComponent)