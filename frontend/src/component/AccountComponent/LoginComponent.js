import React from "react";

// import { compose,bindActionCreators } from 'redux';
import { connect } from "react-redux";

import Header from "../layout/Header";
import { userAction, alert_clear } from "../../_action/index";
import FacebookLogin from 'react-facebook-login';
class Dangnhap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fEmail: "",
      fPass: "",
      noticate: "",

      showAlert: false,
    };
  }

  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  isSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state, localStorage.getItem("prevPath"));
  };
  componentWillUnmount() {
    setTimeout(() => {
      this.props.clearalert();
    }, 2000);
  }
callbackFacBook = (e)=>{
  if (e.error) {
    this.setState({
      showAlert:true,
      noticate: e
    })
  }else{
    this.props.facebooklogin({Email:e.email, name:e.name, Pass:e.id})
  }
}
  render() {
    const { loggedIn, err, alert, user } = this.props.data;

    // if(user) return <Redirect to='/'/>
    return (
      <div>
        <Header></Header>
        {/* Khung đăng nhập */}
        <div className="bg-signin">
          <div className="container login-position">
            {err ? <div className="alert alert-danger" style={{ position: 'absolute', left: "36%" }} role="alert">{alert}</div> : ''}
            <div className="login-form">

              <h3 className="titleLogin">Đăng nhập</h3>

              {/* Tên đăng nhập */}
              <div className="form-group mt_60">
                <label>Tên đăng nhập:</label>
                <div className="wrap-input">
                  <input
                    type="text"
                    className="input-cus"
                    onChange={this.isChange}
                    name="fEmail"
                    required="required"
                  />
                  <span class="focus-input"></span>
                </div>
              </div>
              {/* Tên đăng nhập */}

              {/* Mật khẩu */}
              <div className="form-group mt_24">
                <div className="clearfix">
                  <label>Mật khẩu:</label>
                  {/* Quên mật khẩu */}
                  <a href="#" className="float-right text-muted">
                    <small>Quên mật khẩu?</small>
                  </a>
                </div>
                {/* Quên mật khẩu */}
                <div className="wrap-input">
                  <input
                    type="password"
                    name="fPass"
                    onChange={this.isChange}
                    className="input-cus"
                    required="required"
                  />
                  <span class="focus-input"></span>
                </div>
              </div>
              {/* Mật khẩu */}

              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-check-label">
                      {/* Ghi nhớ đăng nhập */}
                      <input type="checkbox" /> Ghi nhớ tôi
                  </label>
                    {/* Ghi nhớ đăng nhập */}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="submit"
                      onClick={this.isSubmit}
                      className="btn btn-login-cus"
                      defaultValue="Đăng nhập"
                      value="Đăng nhập"
                    />
                    {loggedIn && (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </div>
                </div>
              </div>
              <div class="or-seperator"><i>Hoặc</i></div>
              <p class="text-center">Đăng nhập với</p>
              <div class="text-center social-btn">
                {/* <a href="http://localhost:4000/api/account/auth/fb" class="btn btn-secondary"><i class="fa fa-facebook"></i>&nbsp; Facebook</a> */}
                <FacebookLogin
                
                  cssClass="btn btn-secondary "
                  appId="458486842184629"
                  key="e0ebcc99bfd83095ac57642617c713aa"
                  autoLoad={false}
                  callback={this.callbackFacBook}
                  fields="gender,email,name"
                 
                />

                {/* <a href="#" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</a> */}
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
    data: state.Account,
    location: state.location,
  };
};
const mapDispatchToProps = {
  login: userAction.login,
  clearalert: alert_clear,
  facebooklogin: userAction.facebooklogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Dangnhap);
