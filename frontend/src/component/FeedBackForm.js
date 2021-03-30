import React from "react";
import { Link, Redirect } from "react-router-dom";
import { getPostByIdV3, postHelper } from "../_helper";
import queryString from 'query-string'
import { connect } from "react-redux"
import Headers from "./layout/Header"
import { PATH } from "../_type";
import { reportHeler } from "../_helper/report.helper";
class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: false,
      isSubmit: false,
      isPending: false,
      showAlert: false,
      error: "",
      isClickPost: false,
      post: {},
      level: "",
      content_report: "",
      isRedirect:false,
      linkRedirect:"/",
      idPost:""
    }

  }
  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      return {
        user: props.user
      }
    }
  }
  componentDidMount() {
    const { idPost } = queryString.parse(this.props.location.search);
    this.setState({
      idPost:idPost
    })
    getPostByIdV3(idPost).then(data => {
      if (data.status) {
        this.setState({
          post: data.data
        })
      } else {
        this.setState({
          showAlert: true,
          error: data.error
        })
      }
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
      isRedirect: true,
      linkRedirect: "/chitiet/"+this.state.idPost
    })
  }
  isClickrRadioBtn = (e) => {

    this.setState({
      level: e.target.value
    })
  }
  onChangeContentReport = (e) => {
    this.setState({
      content_report: e.target.value
    })
  }
  isSubmit = (e) => {
    const { idPost } = queryString.parse(this.props.location.search);
    this.setState({
      isSubmit: true,
      isPending: true
    })
    reportHeler.create({
      idPost: idPost,
      idUser: this.state.user.id,
      content_report: this.state.content_report,
      level: this.state.level
    }).then(data => {
      if (data.status) {
        this.setState({
          isPending: false
        })
      } else {
        this.setState({
          isPending: false,
          showAlert: true,
          error: data.error
        })
      }

    })
  }


  render() {
    const { avatar, title } = this.state.post
    const { First_name, Last_name, Email } = this.state.user
    console.log(this.state.linkRedirect);
    return (
      <div className="bg-feedback">
        {this.state.isRedirect && <Redirect to={this.state.linkRedirect}/>}
        <Headers></Headers>
        {this.state.isSubmit && <this.popUp />}
        <div className="login-position">
          <div className="login-form">
            <h3 className="titleLogin mb_24">Phản hồi</h3>
            {/* Tên đăng nhập */}
            <div className="form-group">
              <label>Tên người dùng:</label>
              <input
                type="text"
                className="feedback-input w-100"
                disabled
                name="fUserName"
                required="required"
                value={First_name + " " + Last_name}

              />
            </div>
            {/* Tên đăng nhập */}

            {/* Email */}
            <div className="form-group mb_24">
              <label>Email</label>
              <input
                type="text"
                className="feedback-input w-100"

                name="fEmail"
                required="required"
                disabled
                defaultValue={Email}
                placeholder="hung19997126@gmail.com"
              />
            </div>
            {/* Email */}

            {/* Mật khẩu */}
            <div className="form-group mb_24">
              <label>Tên phòng trọ:</label>
              <input
                type="text"
                className="feedback-input w-100"
                onChange={this.isChange}
                name="fEmail"
                required="required"
                disabled
                value={title}
                placeholder="Tên phòng trọ"
              />
            </div>
            {/* Mật khẩu */}

            <div className="mb_24">
              <img src={PATH.image + avatar} height={200} className="w-100" />
            </div>

            <div className="form-group mb_24">
              <label>Mức độ cảnh báo</label>
              <br />

              <ul className="radioLevel">
                <p>
                  <input onClick={this.isClickrRadioBtn} value="Có dấu hiệu lừa đảo" type="radio" id="test2" name="radio-group" />
                  <label htmlFor="test2">Có dấu hiệu lừa đảo</label>
                </p>
                <p>
                  <input onClick={this.isClickrRadioBtn} type="radio" value="Nguy hiểm" id="test3" name="radio-group" />
                  <label htmlFor="test3">Nguy hiểm</label>
                </p>
              </ul>
            </div>

            {/* Mật khẩu */}
            <div className="form-group" style={{ float: "left" }}>
              <label>Chi tiết phản hồi:</label>
              <textarea onChange={this.onChangeContentReport} className="textDetail" rows="5" cols="50">

              </textarea>
            </div>
            {/* Mật khẩu */}

            <div className="form-group">
              <div className="clearfix"></div>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="submit"
                    onClick={this.isSubmit}
                    className="btn btn-login-cus w-100"
                    defaultValue="Đăng nhập"
                    value="Gửi phản hồi"
                  />
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
export default connect(mapStateToProps)(FeedBack)