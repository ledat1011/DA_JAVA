import React from "react";
import { connect } from "react-redux";
import { register, alert_clear } from "../../_action/index";
import Header from "../layout/Header";

// const resignter = (data)=>
//   axios.post('/api/resign',data).then((data)=> data.data)

function checkProperties(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === "") return false;
  }
  return true;
}
function comparePass(pass, confirm_pass) {
  return pass === confirm_pass ? true : false;
}
class Dangky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fEmail: "",
        fPass: "",
        confirm_pass: "",
        fFirst_name: "",
        fLast_name: "",
        fPhoneNumber: "",
      },

      checkPass: false,
      showAlert: false,
    };
  }

  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;

    // if(name === "fPass"){
    //   this.setState({
    //     checkPass:""
    //   })
    // }
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };
  isSubmit = (event) => {
    event.preventDefault();
    this.setState({
      showAlert: true,
    });

    if (checkProperties(this.state.user)) {
      if (comparePass(this.state.user.fPass, this.state.user.confirm_pass)) {
        this.props.register(this.state.user, localStorage.getItem("prevPath"));
      }
    }
  };

  componentWillUnmount() {
    setTimeout(() => {
      this.props.clearalert();
    }, 2000);
  }

  render() {
    const { showAlert } = this.state;
    return (
      <div>
        <Header></Header>
        {/* Khung đăng nhập */}
        <div className="bg-register">
          <div className=" login-position">
            <div className="login-form">
              <h3 className="titleLogin">Đăng ký</h3>
              {/* Họ và tên */}
              <div
                className={
                  "form-group mt_60" +
                  (showAlert && !this.state.user.fFirst_name
                    ? " has-error"
                    : "")
                }
              >
                <label htmlFor="firstName">Họ:</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="fFirst_name"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.fFirst_name && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Họ
                  </div>
                )}
                </div>
              </div>
              {/* tên */}
              <div
                className={
                  "form-group" +
                  (showAlert && !this.state.user.fLast_name ? " has-error" : "")
                }
              >
                <label htmlFor="firstName">Tên:</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="fLast_name"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.fLast_name && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Tên
                  </div>
                )}
                </div>
              </div>

              {/* Số điện thoại */}
              <div
                className={
                  "form-group" +
                  (showAlert && !this.state.user.fPhoneNumber
                    ? " has-error"
                    : "")
                }
              >
                <label htmlFor="firstName">Số điện thoại:</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="fPhoneNumber"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.fPhoneNumber && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Số điện thoại
                  </div>
                )}
                </div>
              </div>
              {/* Email */}
              <div
                className={
                  "form-group" +
                  (showAlert && !this.state.user.fEmail ? " has-error" : "")
                }
              >
                <label htmlFor="firstName">Email:</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="fEmail"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.fEmail && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Email
                  </div>
                )}
                </div>
              </div>

              {/* Mật khẩu */}
              <div
                className={
                  "form-group" +
                  (showAlert && !this.state.user.fPass ? " has-error" : "")
                }
              >
                <label htmlFor="firstName">Mật khẩu</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="fPass"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.fPass && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Mật khẩu
                  </div>
                )}
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div
                className={
                  "form-group" +
                  (showAlert && !this.state.user.confirm_pass
                    ? " has-error"
                    : "")
                }
              >
                <label htmlFor="firstName">Xác nhận mật khẩu</label>
                <div className="wrap-input">
                <input
                  type="text"
                  className="input-cus"
                  name="confirm_pass"
                  onChange={this.isChange}
                />
                <span class="focus-input"></span>
                {showAlert && !this.state.user.confirm_pass && (
                  <div style={{ position: "absolute" }} className="help-block">
                    Xác nhận mật khẩu
                  </div>
                )}
                {this.state.showAlert &&
                  this.state.user.fPass !== this.state.user.confirm_pass && (
                    <div
                      style={{ position: "absolute" }}
                      className="help-block"
                    >
                      Xác nhận mật khẩu không đúng
                    </div>
                  )}
                  </div>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-signup-cus"
                  defaultValue="Đăng ký"
                  value="Đăng ký"
                  onClick={this.isSubmit}
                />
                {this.props.data.registered && (
                  <img
                    alt="request"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Khung đăng nhập */}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.registration,
    // location: state.location
  };
};
const mapDispatchToProps = {
  register: register,
  clearalert: alert_clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dangky);
