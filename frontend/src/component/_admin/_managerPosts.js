import React, { createRef } from "react";
import HeaderTemp from "./_headerAdmin";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { managePostHelper } from "../../ADMIN/_helper_admin/post.admin.helper";
import { PATH } from "../../_type";
import { getFormattedDate } from "../../_type/formatdate.helper";

export default class ManagePosts extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showInlineComment: false,

      data: [
        { name: "Mon", value: 20 },
        { name: "Tue", value: 40 },
        { name: "Wed", value: 35 },
        { name: "Thu", value: 50 },
        { name: "Fri", value: 55 },
        { name: "Sat", value: 40 },
        { name: "Sun", value: 30 },
      ],
      defaultPost: [],
      left: 0,
      top: 0,
      idPost: "",
      textEditor: "",
      post: [],
      error: "",

      isLoading: false,
      isConfirm: false,
      isPending: false,
      showAlert: false,

      isClickConfirm: false


    };
    this.wrapperRef = React.createRef();

    // this.toggleRow = this.toggleRow.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

  }

  componentDidMount = () => {
    //initialize datatable
    // $(document).ready(function () {
    //   $("#dataTable").DataTable();
    // });
    if (this.state.post.length === 0) {
      managePostHelper.getall().then(data => {
        if (data.status) {
          this.setState({
            post: data.data,
            defaultPost: data.data,
          })
        } else {
          this.setState({
            error: data.error
          })
        }

      })
    }

  };


  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node?.contains(this.wrapperRef.current)) {
      if (this.wrapperRef.current.contains(e.target)) {
        return
      }
      if (this.state.textEditor.length !== 0) {
        return
      } this.setState({ showInlineComment: !this.state.showInlineComment })

    }



  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  toggleRow = (e, idPost) => {

    if (!this.state.showInlineComment) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, true);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      showInlineComment: !this.state.showInlineComment,
      left: e.screenX - 690 + 'px',
      top: e.clientY + 'px',
      idPost: idPost
    });
  };
  isChangeEditor = (text) => {

    this.setState({
      textEditor: text
    })
  }
  popUp = () => {
    return (
      <div className="popup">
        <div className="popup_inner text-center">

          {this.state.isPending == true ?

            <div className="status -pending">Pending</div>
            : <div className={"status " + (this.state.showAlert ? "-failure" : "-success")}>{this.state.showAlert ? "Failure" : "Success"}</div>

          }
          {!this.state.isPending && <div style={{ top: "25px" }} className={"alert alert-" + (this.state.showAlert ? "danger" : "success")}>{this.state.showAlert ? this.state.error : "Báo cáo thành công"}</div>}
          <button
            className="btn btn-success w-50 btn-positionDetailPayment"
            onClick={this.closePopup}
          >
            Đóng
</button>
        </div>
      </div>
    )
  }
  closePopup = () => {
    this.setState({
      isClickConfirm: false
    })
  }
  inlineComment = () => {
    return (

      <div onClick={() => this.setState({ showInlineComment: true })} ref={this.wrapperRef} style={{ position: "absolute", left: this.state.left, top: this.state.top, zIndex: 99999 }}>
        <div className="card">

          <div className="card-body">
            <CKEditor editor={ClassicEditor} placeholder="Nhập bình luận"
              onChange={(event, editor) => {
                const data = editor.getData();
                this.isChangeEditor()
              }}
            />
            <button
              className="btn btn-success"
              style={{ marginTop: "10px", float: "right", width: "200px" }}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    );
  };

  BarGroup = (props) => {
    let barPadding = 2;
    let barColour = "#34BAA7";
    let widthScale = (d) => d * 10;

    let width = widthScale(props.d.value);
    let yMid = props.barHeight * 0.5;

    return (
      <div>
        <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle">{props.d.name}</text>
        <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
        <text className="value-label" x={width - 8} y={yMid} alignmentBaseline="middle">{props.d.value}</text>
      </div>
    );
  };
  isChangeFilter = (e) => {
    var value = e.target.value;
    console.log(value);
    // console.log(this.state.defaultPost);
    if (value == 0) {
      let newArr = this.state.defaultPost.filter(c => c.status == false);
      this.setState({
        post: newArr
      })
    } else if (value == 1) {

      let newArr = this.state.defaultPost.filter(c => c.status == true);

      this.setState({
        post: newArr
      })
    } else {
      this.setState({
        post: this.state.defaultPost
      })

    }

  }

  isCkickConfirmPost = (idPost) => {
    this.setState({
      isClickConfirm: true,
      isPending: true
    })

    managePostHelper.confirm(idPost).then(data => {
      if (data.status) {
        var arr = this.state.post;
        var indext = this.state.post.findIndex(c => c.id == idPost);
        arr[indext].status = true;
        this.setState({
          post: arr,
          isPending: false
        })
      }else{
        this.setState({
          err:data.error,
          showAlert:true
        })
      }
    })



  }
  render() {

    return (
      <div  >

        {this.state.showInlineComment && <this.inlineComment />}
        <HeaderTemp />
        {this.state.isClickConfirm && <this.popUp />}
        <div ref={node => { this.node = node; }} className="container-fluid text-center">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Quản lý bài đăng</h1>
          {/* DataTales Example */}
          <div className="row">
            <div className="col-md-2 pt-4">
              <div className="form-group">
                <select onChange={this.isChangeFilter} id="inputState" className="form-control w-100">
                  <option value={99}>Lọc</option>
                  <option value={0}>Chưa duyệt</option>
                  <option value={1}>Đã duyệt</option>
                  {/* <option>Tìm người ở ghép</option>
              <option>Cho thuê căn hộ</option> */}
                </select>
              </div>
            </div>
          </div>
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
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.post.map((c, index) => <tr>
                      <td>{index}</td>
                      <td>
                        {c.title}
                      </td>
                      <td><img src={PATH.image + c.avatar} width={50} height={50} /></td>
                      <td>{c.user.First_name} {c.user.Last_name}</td>
                      <td>{c.DiaChi}</td>
                      <td>{c.price}</td>
                      <td>1.500</td>
                      <td>
                      <i class={"fa " + (c.TrangThaiDatCoc?  "fa-check text-success": "fa-times text-danger")} aria-hidden="true"></i> 
                      </td>
                      <td>
                        <ul
                          className="trangThaiDuyet"
                          style={{ float: "left", marginLeft: "20px" }}
                        >
                          <li>
                            {c.status && <i
                              style={{ fontSize: "24px" }}
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            />}
                          </li>

                          {!c.status && <li>

                            <i onClick={() => this.isCkickConfirmPost(c.id)} class="fa fa-check text-success" style={{ fontSize: "24px", marginLeft: "-15px" }} aria-hidden="true"></i>
                            <i

                              onClick={(e) => this.toggleRow(e, c.Id)}

                              style={{ fontSize: "24px" }}
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            />
                          </li>}
                        </ul>
                      </td>

                      <td>{getFormattedDate(c.Created_at)}</td>
                      <td>{getFormattedDate(c.Update_at)}</td>
                      <td><i className="btn btn-danger fa fa-lock" aria-hidden="true"></i></td>
                    </tr>
                    )}



                    {/* <tr>
                      <td>2</td>
                      <td>
                        Tiger Nixon Tiger Nixon Tiger Nixon Tiger Nixon Tiger
                        Nixon Tiger Nixon
                      </td>
                      <td>Nguyễn Hoàng Hưng</td>
                      <td>123 đường 46, phường NTb, quận 1</td>
                      <td>1.500.000đ</td>
                      <td>1.500</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <ul
                          className="trangThaiDuyet"
                          style={{ float: "left", marginLeft: "20px" }}
                        >
                          <li>
                            <i
                              style={{ fontSize: "24px" }}
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            />
                          </li>
                          <li>
                            <i   onClick={(e)=>this.toggleRow(e,11)}
                              style={{ fontSize: "24px" }}
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            />
                          </li>
                        </ul>
                      </td>
                      <td>2011/04/25</td>
                      <td>2011/04/25</td>
                      <td>Ảnh</td>

                    </tr> */}
                    {/* <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>2011/07/25</td>
                      <td>$170,750</td>
                    </tr> */}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
