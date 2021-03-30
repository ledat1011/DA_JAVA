import React from "react";
import { NavLink as Active, Redirect } from "react-router-dom";
import { getPostById, getPostByIdV3 } from "../_helper";
import queryString from 'query-string'
import { PATH } from "../_type";
import { connect } from "react-redux"
import { Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
import Header from "./layout/Header";
import {paymentHelper} from "../_helper/payment.helper"

class ThanhToan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNextPage: false,
      data: {},
      status: true,
      errMess: "",
      selectTab: 1,
      nextTab: 1,
      showAlert: false,
      First_name: "",
      Last_name: "",
      Email: "",
      PhoneNumber: "",
     
      userId: "",
      isRedirect:false,
      linkRedirect:"",
      totalPayment:0
    };

  }
  static getDerivedStateFromProps(props, state) {
 
  if(props.data.user ){
   const Last_name = props.data.user.Last_name,
    First_name = props.data.user.First_name,
    PhoneNumber = props.data.user.PhoneNumber,
    UserId = props.data.user.id,
    Email = props.data.user.Email;
    return{
      Email:Email,
      userId:UserId,
      PhoneNumber:PhoneNumber,
      Last_name:Last_name,
      First_name:First_name
    }
  }

  }

  componentDidMount() {
    const param = queryString.parse(this.props.location.search);
    if (Object.keys(this.state.data).length === 0) {
      getPostByIdV3(param.idPost).then(val => {
        if (val.status) {
          this.setState({
            data: val.data,
            totalPayment: val.data.price + 20000
          })
        } else {
          this.setState({ status: false, errMess: val.messege })
        }
      })
    }
  }
  

  onChangeTab = (number) => {
    this.setState({
      selectTab: parseFloat(number)
    })
  }
  isClickTab = () => {
    this.setState({
      nextTab: this.state.nextTab + 1,
      selectTab: this.state.selectTab + 1
    })
  }
  isClickPayment = () => {
    this.setState({isRedirect:true})
     const param = queryString.parse(this.props.location.search);
      paymentHelper.create({First_name:this.state.First_name,
      Last_name:this.state.Last_name,
      PhoneNumber:this.state.PhoneNumber,
      Email:this.state.Email,
      price: this.state.data.price,
      description: this.state.data.title,
      checkout:param.checkout ,
      idUser:this.props.data.user.id,
      idPost:param.idPost
      
      }).then(data=>{
        if(data.status){
          window.location.assign(data.data.links[1].href);
        }else{
          console.log(data.err);
        }
      
      }).catch(e=>{
        console.log(e);
      })
  }
  contentRight = () => {
    const { DiaChi, price, avatar, title } = this.state.data;
    return (<div className="col-md-4">
      <h3 className="font-weight-bold">Chi tiết thanh toán</h3>
      <div className="room_sidebar--thanhtoan">
        <div className="checkup">
          <div className="container">
            <div className="checkup_header">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="checkup_title">
                    {title}
                  </h4>
                  <div className="checkup_add">
                    <i
                      className="fa fa-map-marker"
                      aria-hidden="true"
                    />
                    <span className="address-thanhtoan">
                      {this.state.data.DiaChi?.replaceAll("-", ",")}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <img width={150}
                    height={150}
                    src={PATH.image + avatar}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          {/*container*/}
          <div className="checkup_body">
            <div className="checkup_price">
              <div className="row">
                <div className="col-md-6">
                  <span className="font-italic">Tiền cọc:</span>
                </div>
                <div className="col-md-6">
                  <span
                    className="font-italic"
                    style={{ float: "right", padding: "0px 30px" }}
                  >
                    {price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <span className="font-italic">Tiền phí:</span>
                </div>
                <div className="col-md-6">
                  <span
                    className="font-italic"
                    style={{ float: "right", padding: "0px 30px" }}
                  >
                    20.000đ
              </span>
                </div>
              </div>
            </div>{" "}
            {/* checkup_price */}
          </div>{" "}
          {/*Checkup_body*/}
        </div>{" "}
        {/*Checkup*/}
        <div className="checkup_totalPrice">
          <div className="row">
            <div className="col-md-6">
              <span className="font-italic font-weight-bold">
                Tổng cộng:
          </span>
            </div>
            <div className="col-md-6">
              <span
                className="font-italic font-weight-bold"
                style={{ float: "right", padding: "0px 30px" }}
              >
                {this.state.totalPayment.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </span>
            </div>
          </div>
        </div>{" "}
        {/* checkup_totalPrice */}
      </div>{" "}
      {/*Checkup_body*/}
    </div>)
  }


  render() {

    // if(this.props.data.user &&!this.state.isUpdate){
    //   const First_name= this.props.data.user?.First_name
    //   const Last_name= this.props.data.user.Last_name
    //   const PhoneNumber = this.props.data.user.PhoneNumber;
    //   const Email = this.props.data.user.Email;
    //     this.setState({
    //       First_name: First_name,
    //       Last_name: Last_name,
    //       PhoneNumber:PhoneNumber,
    //       Email:Email,
    //       isUpdate: true
    //     })
    // }

    return (
      <div>
        <Header />
         <TabProvider
          defaultTab={this.state.selectTab.toString()}
          onChange={(tabId) => { this.onChangeTab(tabId) }}
        >
          <TabList>
            <div className="container">
              <Tab disabled={this.state.nextTab >= 1 ? false : true} tabFor="1" className="tabList-item">Thông tin cơ bản</Tab>
              <Tab disabled={this.state.nextTab >= 2 ? false : true} tabFor="2">Địa điểm</Tab>
            </div>
          </TabList>
          <div className="bg-thanhtoan content-thanhtoan">
            <div className="container">
              <TabPanel tabId="1">
                <div className="row">

                  <div className="col-md-8">
                    <h3 className="font-weight-bold">Thông tin thanh toán</h3>
                    <div className="container">
                      {/* Thông tin khách hàng */}
                      <div className="row">
                        <div className="col-md-10">
                          <h6 className="font-weight-bold mt_24">Tên khách hàng</h6>
                          <label>Họ tên trên CMND/thẻ căn cước:</label>
                          <br />
                          <input value={this.state.First_name + " " + this.state.Last_name} className="pay-input w-100" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-10">
                          <h6 className="font-weight-bold mt_24">
                            Số lượng người ở
                      </h6>
                          <input className="pay-input w-100" />
                        </div>
                      </div>

                      <div className="row mt_12">
                        <div className="col-md-5">
                          <h6 className="font-weight-bold mt_24">Số điện thoại</h6>
                          <label>Số điện thoại:</label>
                          <br />
                          <input value={this.state.PhoneNumber} className="pay-input w-100" />
                        </div>

                        <div className="col-md-5">
                          <h6 className="font-weight-bold mt_24">Email</h6>
                          <label>VD: email@example.com</label>
                          <br />
                          <input value={this.state.Email} className="pay-input w-100" />
                        </div>
                      </div>

                    </div>{" "}
                  </div>
                  {this.contentRight()}
                </div>
              </TabPanel>
              <TabPanel tabId="2">
                <div className="row">
                  <div className="col-md-8">
                    <h3 className="font-weight-bold">Phương thức thanh toán</h3>
                    <div className="container">
                      <ul className="payingMethod w-75">
                        <li>
                          <input type="radio" id="method1" name="payMethod" />
                          <label for="method1">
                            VNEPAY - thẻ ghi nợ nội địa ATM
                      </label>
                        </li>
                        <li>
                          <input type="radio" id="method2" name="payMethod" />
                          <label for="method2">
                            Thanh toán bằng thẻ quốc tế Visa, Mastercard, JCB
                      </label>
                        </li>
                        <li>
                          <input type="radio" id="method3" name="payMethod" />
                          <label for="method3">Chuyển khoản ngân hàng</label>
                        </li>
                        <li>
                          <input type="radio" id="method4" name="payMethod" />
                          <label for="method4">Zalo</label>
                        </li>
                        <li>
                          <input type="radio" id="method5" name="payMethod" />
                          <label for="method5">Momo</label>
                        </li>
                      </ul>
                    </div>{" "}
                  </div>
                  {this.contentRight()}
                </div>
              </TabPanel>
              <div className="row" >
                <div className="container">
                  <div className="col-md-4 w-100" style={{ float: "right" }}>
                    <div>  <button onClick={() => { this.state.nextTab > 1 ? this.isClickPayment() : this.isClickTab() }}
                      className="btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_full bold rounded btn_shadow_pri"
                    >
                      <span className="btn_text">{this.state.selectTab == 1 ? "Tiếp" : "Thanh toán"}</span>
                    </button></div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </TabProvider>
        <div style={this.state.isRedirect ?{display:"flex"}:null} class="wait">
    <div class="loader"></div>
</div>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}
export default connect(mapStateToProps)(ThanhToan)