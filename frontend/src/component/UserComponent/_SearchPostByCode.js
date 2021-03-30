import React from "react";
import Header from "../layout/Header";
import { Link, NavLink as Active } from "react-router-dom";
import MenuTrans from "./_menuTransaction";
import HeaderProfile from "../layout/HeaderProfile";
import queryString from 'query-string'
import { datcocHelper } from "../../_helper/datcoc.helper";
import { PATH } from "../../_type";
export default class SearchByCode extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      post:[],
      errMess: "",
      code:"",
      isLoading:true
    }
  }
  
  componentDidMount() {
    const param = queryString.parse(this.props.location.search);
    if (this.state.post.length === 0) {
      datcocHelper.get(param.code).then(val => {
        console.log(val);
        if (val.status) {
          this.setState({
          post:val.data,
          code:val.code,
          isLoading:false
          })
        } else {
          this.setState({ status: false, errMess: val.messege })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const param = queryString.parse(this.props.location.search);
    const param2 = queryString.parse(nextProps.location.search);
    if(param.code != param2.code){
    
      datcocHelper.get(param.code).then(val => {
        console.log(val);
        if (val.status) {
          this.setState({
          post:val.data,
          code:val.code,
          isLoading:false
          })
        } else {
          this.setState({ status: false, errMess: val.messege })
        }
      })
    }
  }
  
  
  render() {
    return (
      <div>
        <Header />
     {!this.state.isLoading?this.state.post.length !==0 ?<div className="container"
        style={{marginTop: "50px"}}>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold">Bài viết đã cọc: 0</h6>
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
                      <th>Mã đặt cọc</th>
                      <th>Tiêu đề</th>
                      <th>Ảnh</th>
                      <th>Người đăng</th>
                      <th>Số tiền</th>
                      <th>Ngày xem phòng</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.post.length!==0 && this.state.post.map(c=><tr>
                      <td>{c.code}</td>
                      <td>{c.post.title}</td>
                      <td><img src={PATH.image+ c.post.avatar} width={100} height={100}/></td>
                      <td>{c.post.user.First_name} {c.post.user.Last_name}</td>
                      <td>{c.post.price}</td>
                      <td>{c.NgayXemPhong}</td>
                      <td><Link to={"/chitiet/"+c.idPost} className="btn btn-success">Xem bài đăng</Link></td>
                    </tr>)  }
                  
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
        </div>:<h2 className="text-center">Không tìm thấy</h2>:<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  }  
      </div>
    );
  }
}
