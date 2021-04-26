import React from 'react';
import { connect } from "react-redux"



import Convenient from "./Convenient";
import AroundConvenient from "./AroundConvenient";
import { Link, Redirect } from "react-router-dom"
import ChonNgay from "./ChonNgayDatCoc";
import CommentBox from './CommentBox'
import { getPostById, savepost } from "../../_helper/index"
import { PATH } from "../../_type/filepath.type"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Map from '../Map';
import { savePostAction } from '../../_action/savepost.action';
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

class ChiTietPhongTro extends React.Component {
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
  isChangeDate = (data) => {

    this.setState({ dateReceiveRoom: data })
  }
  isChangeComment = (data) => {
    this.setState({
      commnet: data
    })
  }
  isClickSavePost = async (e) => {
    /**check user login */
    if (!this.props.data.user) {
      this.setState({ isRedirect: true, linkRedirect: "/dangnhap" })
    } else {
       if(e.target.className =="fa fa-heart"){
        this.props.removeSavePost(this.props.data.user.id,this.props.match.params.id);
       }else{
        this.props.addSavePost(this.props.data.user.id,parseInt (this.props.match.params.id))
       }
       
    }
  }

  componentDidMount() {
    if (Object.keys(this.state.data).length === 0) {
      getPostById(this.props.match.params.id).then(val => {
        this.setState({
          data: val,
        })
      })
    }
    // this.props.checkSavePost();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      getPostById(nextProps.match.params.id).then(val => this.setState({ data: val }));
    }
  }
  isClickPayment = () => {
    if (!this.props.data.user) {
      this.setState({ isRedirect: true, linkRedirect: "/dangnhap" })
    } else {

      this.setState({ isRedirect: true, linkRedirect: "/thanhtoan?checkout=" + formatDate(this.state.dateReceiveRoom) + "&idPost=" + this.state.data.id })
    }

  }
  render() {
    console.log(this.props.saveList);
    const { Created_at, DiaChi, Dientich, TrangThaiDatCoc, Update_at, addRule,
      bathroomNuber, id, introduction, kitchenNumber, maxPrice, minPrice,
      price, roomNumber, selectedRuleParty, selectedRulePet, selectedRuleSmoke,
      soLuongTruyCap, status, tienDatCoc, tieniches, title, typepost, formpost, binhluans, saveposts } = this.state.data;
    return (

      <div>
        <Header />
        {this.state.isRedirect ? <Redirect to={this.state.linkRedirect} /> : Object.keys(this.state.data).length !== 0 ? (
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
                  <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>
                    Bình luận
              </h3>
                  <p>Để lại bình luận của bạn tại đây</p>
                  <CommentBox pathName={this.props.location.pathname} commnent={binhluans} id={this.props.match.params.id} onChange={this.isChangeDate} />
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
                      <li style={{
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}>{this.props.saveList.includes(parseInt(this.props.match.params.id)) ? "Bỏ lưu" : "Lưu lại"} <i
                        onClick ={this.isClickSavePost}
                        style={{
                          cursor: "pointer",
                        }} className={this.props.saveList.includes(parseInt(this.props.match.params.id)) ? "fa fa-heart" : "fa fa-heart-o"}></i>

                      </li>
                      <li>
                        <Link to={this.props.data.user ? "/feedback?idPost="+this.props.match.params.id:"/dangnhap"} >Phản hồi</Link>
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
                        <button onClick={this.isClickPayment} className="btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_full bold rounded btn_shadow_pri"><span className="btn_text">Đặt ngay</span></button>
                      </div>
                    </div>
                  </div>

                  <Map center={{ lat: this.state.data.lat, lng: this.state.data.lng }} idPost={this.props.match.params.id}></Map>
                </div>
                {/* Cột phải */}
              </div>
              <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>Chỗ ở tương tự</h3>
              <ul className="similarLocation">
                {/* <li>
              <PhongTroCard  />
            </li>
            <li>
              <PhongTroCard />
            </li>
            <li>
              <PhongTroCard />
            </li>
            <li>
              <PhongTroCard />
            </li> */}
              </ul>
            </div>
            <Footer />
          </div>

        ) : (<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account,
    saveList: state.savepost
  }
}



const mapDispatchToProps = {
  addSavePost: savePostAction.create,
  removeSavePost: savePostAction.remove
}


export default connect(mapStateToProps, mapDispatchToProps)(ChiTietPhongTro)