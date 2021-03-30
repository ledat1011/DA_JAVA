import React from 'react';
import { connect } from "react-redux"



import Convenient from "./ChiTietPhongTroComponent/Convenient";
import AroundConvenient from "./ChiTietPhongTroComponent/AroundConvenient";
import { Link, Redirect } from "react-router-dom"
import ChonNgay from "./ChiTietPhongTroComponent/ChonNgayDatCoc";

import { getPostById, postHelper, savepost } from "../_helper/index"
import { PATH } from "../_type/filepath.type"


import Header from './layout/Header';
import Footer from './layout/Footer';
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem("prevPath", this.props.location.pathname)
    this.state = {
      data: {},
      readMore: false,
      commnet: localStorage.getItem("comment") || "",
      isRedirect: false,
      linkRedirect: "",
      dateReceiveRoom: new Date(),
      isLoading: false,
      isConfirm: false,
      isPending: false,
      showAlert: false,
      error: "",
      isClickPost: false
    }

  }
  stateRead = () => {
    this.setState({ readMore: !this.state.readMore })
  }
  /** display convenion */
  renderTienIch = () => {
    const { tieniches } = this.state.data;
    const unique = [...new Set(tieniches.map(item => item.loaitienich.TenLoaiTienIch))]; // [ 'A', 'B']
    return unique.map(name => <Convenient ConvenientNames={name} data={tieniches} />)
  }



  componentDidMount() {
    if (Object.keys(this.state.data).length === 0) {
      getPostById(this.props.match.params.id).then(val => {
        console.log(val);
        this.setState({ data: val, isConfirm: val.confirm })
      })
    }
    // this.props.checkSavePost();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      getPostById(nextProps.match.params.id).then(val => this.setState({ data: val }));
    }
  }
  isClickPost = (state) => {

    if (state === 1) {
      this.setState({
        isPending: true,
        isClickPost: true
      })
      postHelper.confirm(this.props.match.params.id).then(data => {
        if (data.status) {
          this.setState({
            isPending: false,
            isConfirm: true
          })
        } else {
          this.setState({
            showAlert: true,
            error: data.error
          })
        }
      })
    } else {
      this.setState({
        isRedirect: true,
        linkRedirect: "/edit/" + this.props.match.params.id
      })
    }
  }
  popUp = () => {
    return (
      <div className="popup">
        <div className="popup_inner text-center">

          {this.state.isPending == true ?

            <div className="status -pending">Pending</div>
            : <div className={"status " + (this.state.showAlert ? "-failure" : "-success")}>{this.state.showAlert ? "Failure" : "Success"}</div>

          }
          <div style={{ top: "25px" }} className={"alert alert-" + (this.state.showAlert ? "danger" : "success")}>{this.state.showAlert ? this.state.error : "Đăng bài thành công"}</div>
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
      isRedirect: true,
      linkRedirect: "/"
    })
  }
  render() {

    const { Created_at, DiaChi, Dientich, TrangThaiDatCoc, Update_at, addRule,
      bathroomNuber, id, introduction, kitchenNumber, maxPrice, minPrice,
      price, roomNumber, selectedRuleParty, selectedRulePet, selectedRuleSmoke,
      soLuongTruyCap, status, tienDatCoc, tieniches, title, typepost, formpost, binhluans, saveposts } = this.state.data;
    return (

      <div>
        <Header />
        {!this.state.isLoading ? this.state.isRedirect ? <Redirect to={this.state.linkRedirect} /> : Object.keys(this.state.data).length !== 0 ? (
          <div>
            <div id="demo" className="carousel slide" data-ride="carousel">
              {/* Dấu trang */}
              <ul className="carousel-indicators">
                {this.state.data.images.map((val, index) => <li data-target="#demo" data-slide-to={index} className={index === 0 ? "active" : ""} />)}
              </ul>
              {/* Slide */}
              <div className="carousel-inner carousel-inner-chitiet">
                {this.state.data.images.map((val, index) =>
                  <div className={"carousel-item" + (index === 0 ? " active" : "")}>
                    <img
                      src={PATH.image + val.img}
                      alt="promotion2"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>)}
              </div>
              {/* Mũi tên trái phải */}
              <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon" />
              </a>
              <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon" />
              </a>
            </div>

            {/* Noi dung chi tiet */}
            <div className="container">
              <div className="row">
                {/* Cột trái */}
                <div className="col-md-8">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-white breadcrumb-custom">
                      <li className="breadcrumb-item">
                        <a className="black-text" href="#">
                          Trang chủ
                    </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a className="black-text" href="#">
                          Danh sách phòng trọ theo khu vực
                    </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a className="black-text" href="#">
                          Phòng trọ
                    </a>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="font-weight-bold">{title}</h1>
                  <p className="subTitle">{DiaChi}</p>
                  <p className="subTitle">{typepost.name}</p>
                  <p>{formpost.name} · {bathroomNuber} Phòng tắm · 1 giường · 1 phòng ngủ</p>

                  {/* Đoạn văn mô tả chi tiết */}
                  <div style={!this.state.readMore ?
                    {
                      overflow: "hidden",
                      width: "100%",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical"
                    }
                    : null}
                    dangerouslySetInnerHTML={{ __html: introduction }} />
                  <p onClick={this.stateRead}
                    className="font-weight-bold"
                    style={{ color: " rgb(247, 153, 12)", hover: "#000" }} >
                    {this.state.readMore ? "Thu gọn" : "Xem thêm"}</p>

                  {/* Đoạn văn mô tả chi tiết */}

                  {/* Tiện ích chỗ ở */}
                  <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>
                    Tiện ích chỗ ở
              </h3>
                  <p>Giới thiệu tiện nghi và dịch vụ tại nơi cư trú</p>


                  <this.renderTienIch></this.renderTienIch>

                  {/* Tiện ích xung quanh */}
                  <AroundConvenient />

                  {/* Ở đây để thêm cái bản đồ nếu được */}

                  {/* Bình luận */}

                  {/* Bình luận */}
                </div>
                {/* Cột trái */}

                {/* Cột phải */}
                <div className="col-md-4" style={{ marginTop: "10px" }}>
                  <div>
                    <ul className="shareAndSave">
                      <li>
                        <a href="#">
                          Chia sẻ <i className="fa fa-share-alt-square" />
                        </a>
                      </li>

                      <li>
                        <Link to="/feedback" >Phản hồi</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="room_sidebar">
                    <div className="room_sidebar_content">
                      <div className="room_sidebar_pricing_content">
                        <p>
                          <span className="extra-bold">{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                          <span className="p_small">/tháng</span>
                        </p>
                        <ChonNgay onChange={(this.isChangeDate)} />

                        <button onClick={() => this.isClickPost(2)} className="btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_full bold rounded btn_shadow_pri"><span className="btn_text">Chỉnh sửa</span></button>
                        {!this.state.isConfirm && <button onClick={() => this.isClickPost(1)} className="btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_full bold rounded btn_shadow_pri"><span className="btn_text">Đăng ngay</span></button>}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Cột phải */}
              </div>

            </div>
            {this.state.isClickPost && <this.popUp />}
            <Footer />
          </div>

        ) : (<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>) : <div>Loading</div>}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}


export default connect(mapStateToProps)(PreviewPage)