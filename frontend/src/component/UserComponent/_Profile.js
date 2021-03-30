import Header from "../layout/Header";
import React from "react";
import { connect } from "react-redux";
import { accountHelper } from "../../_helper";
import { userAction } from "../../_action/authentication.action"
import HeaderProfile from "../layout/HeaderProfile";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: {
        First_name: true,
        Last_name: true,
        PhoneNumber: true
      },

      femail: true,

      fAddress: true,
      fBirthday: true,
      pChangePassword: false,
      pAccInfo: false,
      user: {},
      Password: "",
      First_name: "",
      Last_name: "",
      PhoneNumber: "",
      showAlert: false,
      isUpdate: false,
      err: '',
      edit: {
        First_name: false,
        Last_name: false,
        PhoneNumber: false
      }

    };
  }
  isClickEdit = (nameOfInput) => {
    this.setState({
      showAlert: this.state[nameOfInput].length == 0,
      show: {
        ...this.state.show,
        [nameOfInput]: this.state[nameOfInput].length == 0 ? false : !this.state.show[nameOfInput]
      },

    });
    //check if invali
    if (this.state.show[nameOfInput] == false && this.state[nameOfInput].length !== 0) {
      this.setState({
        edit: {
          ...this.state.edit,
          [nameOfInput]: true
        }
      })
      accountHelper.update({ [nameOfInput]: this.state[nameOfInput], id: this.state.user.id }).then(data => {
 
        if (data.status) {
          localStorage.setItem("token", data.data);
          this.setState({edit: {...this.state.edit,[nameOfInput]: false}})
          this.props.getUser();
        } else {
          this.setState({ showAlert: true, err: data.error })
        }

      }).catch(err => {
        this.setState({ showAlert: true, err: err })
      })
    }
  };

  isChangePage = (nameOfPage) => {
    this.setState({
      [nameOfPage]: true,
    });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.data.user && !state.isUpdate) {
      return {
        user: props.data.user,
        First_name: props.data.user.First_name ||"",
        Last_name: props.data.user.Last_name ||"",
        PhoneNumber: props.data.user.PhoneNumber ||"",
        isUpdate: true
      }
    }
  }
  isChangeInput = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name]: value
    })

  }
  render() {
    const { First_name, Last_name, Email, PhoneNumber } = this.state.user
    return (
      <div>
        <HeaderProfile />
        <div className="clearfix"></div>
        <div className="container titleUser">
          <div><h5>
            <span>{this.props.data.user?.First_name || "" } { this.props.data.user?.Last_name || ""} </span> - Thông tin tài khoản
          </h5>
          <p>Cá nhân hóa tài khoản bằng việc cập nhật thông tin của bạn</p></div>
          
          <div className="row">
            <div className="col-md-4">
              <ul class="list-vertical">
                <li class="active">
                  <button
                    className="btnLink"
                    onClick={() => this.isChangePage("pAccInfo")}
                  >
                    Thông tin tài khoản
                  </button>
                </li>
                <li>
                  <button
                    className="btnLink"
                    onClick={() => this.isChangePage("pChangePassword")}
                  >
                    Thay đổi mật khẩu
                  </button>
                </li>
                <li>
                  <a href="#">Thanh toán</a>
                </li>
              </ul>
            </div>

            <div className="col-md-8" hidden={this.state.pChangePassword}>
              <div className="input-group">
                <p className="labelProfile mb_6">Tên</p>
                {/* Name */}
                <input
                  type="text"
                  name="First_name"
                  data-vv-as="Tên"

                  className={" account-input" + (this.state.showAlert && !this.state.First_name ? ' has-error' : '')}
                  placeholder="Name"
                  defaultValue={this.state.First_name || ""}
                  disabled={this.state.show.First_name}
                  onChange={this.isChangeInput}
                />

                <div className="input-group-append">
                  <button
                    className="btn btn-outline"
                    onClick={() => this.isClickEdit("First_name")}
                  >
                    {this.state.edit.First_name && this.state.show.First_name ?
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> : <i className={"fa " + (!this.state.show.First_name ? "fa-check" : "fa-pencil")} aria-hidden="true" />
                    }
                  </button>
                </div>

              </div>

              {/* FullName */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Họ và tên đệm</p>
                <input
                  type="text"
                  name="Last_name"
                  data-vv-as="Họ và tên đệm"
                  className="account-input"
                  value={this.state.Last_name}
                  onChange={this.isChangeInput}
                  disabled={this.state.show.Last_name}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline"
                    onClick={() => this.isClickEdit("Last_name")}
                  >
                    {this.state.edit.Last_name && this.state.show.Last_name ?
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> : <i className={"fa " + (!this.state.show.Last_name ? "fa-check" : "fa-pencil")} aria-hidden="true" />
                    }
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Email</p>
                <input
                  type="text"
                  name="Email"
                  data-vv-as="Email"
                  className="account-input"
                  placeholder="Email"
                  defaultValue={Email}
                  disabled={this.state.femail}
                />
                <div className="input-group-append">

                </div>
              </div>

              {/* Phone number */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Số điện thoại</p>
                <input
                  type="text"
                  name="PhoneNumber"
                  data-vv-as="Số điện thoại"
                  className="account-input"
                  placeholder="0123456789"
                  defaultValue={PhoneNumber ||""}
                  onChange={this.isChangeInput}
                  disabled={this.state.show.PhoneNumber}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline"
                    onClick={() => this.isClickEdit("PhoneNumber")}
                  >
                    {this.state.edit.PhoneNumber && this.state.show.PhoneNumber ?
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> : <i className={"fa " + (!this.state.show.PhoneNumber ? "fa-check" : "fa-pencil")} aria-hidden="true" />
                    }
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Địa chỉ</p>
                <input
                  type="text"
                  name="address"
                  data-vv-as="Địa chỉ"
                  className="account-input"
                  disabled={this.state.fAddress}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline"
                    onClick={() => this.isClickEdit("fAddress")}
                  >
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </button>
                </div>
                <input
                  type="text"
                  name="address"
                  data-vv-as="Địa chỉ"
                  className="account-input"
                  hidden
                />
              </div>

              {/* Birthday */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Ngày sinh</p>
                <input
                  type="text"
                  name="birthDay"
                  data-vv-as="Ngày sinh"
                  className="account-input"
                  disabled={this.state.fBirthday}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline"
                    onClick={() => this.isClickEdit("fBirthday")}
                  >
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt_24">
                <p className="labelProfile mb_6">Giới tính</p>
                <div className="row">
                  <label className="radio--box col-md-4">
                    <input
                      type="radio"
                      name="gioiTinh"
                      defaultChecked="checked"
                    />
                    <span className="radiomark" />
                    <p>Nam</p>
                  </label>
                  <label className="radio--box col-md-4">
                    <input type="radio" name="gioiTinh" />
                    <span className="radiomark" />
                    <p>Nữ</p>
                  </label>
                  <label className="radio--box col-md-4">
                    <input type="radio" name="gioiTinh" />
                    <span className="radiomark" />
                    <p>Khác</p>
                  </label>
                </div>
              </div>
              <div className="btnPosition">
                <button type="submit" className="btn-update">
                  Cập nhật
                </button>
              </div>
            </div>

            <div
              className="col-md-8 changePassword"
              hidden={!this.state.pChangePassword}
              hidden={this.state.pAccInfo}
            >
              <div className="input-group">
                <p className="labelProfile mb_6">Mật khẩu cũ</p>
                {/* Name */}
                <input
                  type="text"
                  name="first_name"
                  data-vv-as="Tên"
                  className="account-input"
                />
              </div>

              {/* FullName */}
              <div className="mt_24 input-group">
                <p className="labelProfile mb_6">Mật khẩu mới</p>
                <input
                  type="text"
                  name="last_name"
                  data-vv-as="Họ và tên đệm"
                  className="account-input"
                />
              </div>

              <div className="btnPosition">
                <button
                  type="submit"
                  className="btn-update"
                  style={{ marginTop: "20px" }}
                >
                  Cập nhật
                </button>
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
    data: state.Account
  }
}
const mapDispatchToProps = {
  getUser: userAction.getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)