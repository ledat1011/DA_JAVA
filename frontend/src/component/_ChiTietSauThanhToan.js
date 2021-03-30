import React from "react";
import Header from "./layout/Header";
import checkGif from '../gif/check-circle.gif'
import queryString from 'query-string'
import { paymentHelper } from "../_helper/payment.helper";

import { PATH } from "../_type";

const convertDateTime =(dateTime)=>{

const parts = dateTime.split(/[- :]/);
const wanted = `${parts[2]}/${parts[1]}/${parts[0]} `;
return wanted;
}

class Popup extends React.Component {

  render() {
    return (
      <div className="popup">
        <div className="popup_inner text-center">
          <h1 className="font-weight-bold">Thành công</h1>
          <img width="80px" src={checkGif}></img>
          <p>Thông tin chi tiết sẽ được gửi vào mail: hung19997126@gmail.com</p>
          <button
            className="btn btn-success w-50 btn-positionDetailPayment"
            onClick={this.props.closePopup}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }
}

export default class DetailPayment extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showAlert: false,
      err: "",
      post: {},
      infor:{}
    };
  }
  togglePopup(e) {
    console.log(e);
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  componentDidMount() {
    if (this.props.location.search.length !== 0) {
      var query = queryString.parse(this.props.location.search);
      paymentHelper.excute({ PayerID: query.PayerID }).then(data => {
        if (data.status) {
          this.setState({
            infor:data.infor,
            post:data.post
          })
        } else {
          this.setState({
            showAlert: true,
            err: data.err
          })
        }
      })
    }
  }

  render() {
    const {DiaChi,price,avatar,title} = this.state.post;
    const {First_name,Last_name,PhoneNumber,checkout,Email} = this.state.infor;
    return (
      <div>
        <Header />
        {Object.keys(this.state.post).length !== 0 ? <div className="detailPaymentForm">
          <div className="container">
            <div className="detailPaymentTable">
              <h3 className="text-center mb_24 font-weight-bold">
                Cảm ơn quý khách
              </h3>

              <img height="170px" src={PATH.image+ avatar} />
              <div className="row mt_24">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Tên người đặt phòng:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{First_name +" " + Last_name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Số điện thoại:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{PhoneNumber}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Email:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{Email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Tên phòng trọ:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{title}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Địa chỉ phòng trọ:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{DiaChi}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 detailPaymentTitleInfo">
                  <p>Ngày nhận phòng:</p>
                </div>
                <div className="col-md-6 detailPaymentInfo">
                  <p>{convertDateTime(checkout)}</p>
                </div>
              </div>

              <h5 className="text-center mt_24">Số tiền đã thanh toán</h5>
              <div className="row text-center mt_12">
                <div className="col-md-7">
                  <p>Tiền cọc đã thanh toán:</p>
                </div>
                <div className="col-md-5">
                  <p>{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-md-7">
                  <p>Tiền phí đã thanh toán:</p>
                </div>
                <div className="col-md-5">
                  <p>20.000đ</p>
                </div>
              </div>

              <button
                onClick={this.togglePopup.bind(this)}
                className="btn btn_grad_pri px_6 pb_6 mt_24 btn_sm btn_full bold rounded btn_shadow_pri"
              >
                <span className="btn_text">Xác nhận</span>
              </button>
              {this.state.showPopup ? (
                <Popup
                  text="Close Me"
                  closePopup={this.togglePopup.bind(this)}
                />
              ) : null}
            </div>
          </div>
        </div> : (<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)}
      </div>
    );
  }
}
