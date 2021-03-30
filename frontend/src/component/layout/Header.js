import React from "react";
import { userAction } from "../../_action/index";
import { connect } from "react-redux";
// import Dangnhap from "./DangNhap";
// import Dangky from "./DangKy"
import { NavLink as Active, Redirect } from "react-router-dom";
import ThongBao from "./ThongBao";
import logo from "../../_img/logo2.png";
class Header extends React.Component {
  logout = () => {
    this.props.logout();
  };
constructor(props) {
  super(props);
  this.state ={
    isRedirect:false,
    linkRedirect:"/",
    code:0
  }
}

  bar = () => {
    const { user } = this.props.data;
    if (user) {
      return (
        <div style={{ display: "inline" }}>
          {/* <li className="nav-item">
            <Active activeStyle={{ color: "rgb(204,204,0)", textDecorationLine: "underline" }} to='/dangnhap' className="nav-link"   >
              {user.First_name} {user.Last_name}
            </Active>
          </li> */}
          <li className="nav-item ">
            <div className="btn-group">
              <button
                type="button"
                className="btn dropdown-toggle font-weight-bold btn-username-cus btn_grad_pri rounded"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                {user.First_name} {user.Last_name}
              </button>
              <div className="dropdown-menu">
              <a href="/#" className="dropdown-item">
                  <strong>Số dư:</strong> 10.000đ
                </a>
              <div className="dropdown-divider"></div>
                <Active
                  activeStyle={{ color: "#f68a39" }}
                  to="/profile"
                  className="nav-link"
                  className="dropdown-item"
                >
                  Thông tin tài khoản
                </Active>
                <a href="/#" className="dropdown-item">
                  Bài viết đã đăng
                </a>
                <a href="/#" className="dropdown-item">
                  Tin nhắn
                </a>
                <a href="/#" className="dropdown-item">
                  Bài viết đã đặt cọc
                </a>
                <a href="/#" className="dropdown-item">
                  Yêu thích
                </a>
                <div className="dropdown-divider"></div>
                <a href="/#" onClick={this.logout} className="dropdown-item">
                  Đăng xuất
                </a>
              </div>
            </div>
          </li>

          <li>
            <ThongBao />
          </li>
          {/* <li>
            <a href="#" onClick={this.logout} className="nav-link" >
              Đăng xuất
                      </a>
          </li> */}
        </div>
      );
    }
    return (
      <div style={{ display: "inline" }}>
        <li className="nav-item">
          <Active
            activeStyle={{ color: "#f68a39" }}
            to="/dangnhap"
            className="nav-link"
          >
            Đăng nhập
          </Active>
        </li>
        <li className="nav-item">
          {/* Nút đăng ký */}
          <Active
            activeStyle={{ color: "#f68a39" }}
            to="/dangky"
            className="nav-link"
          >
            Đăng ký
          </Active>
        </li>
      </div>
    );
  };
isClickSearchByCode = ()=>{
  this.setState({
    isRedirect:true
  })
}
isChangeSearchByCode =(e)=>{
  this.setState({
    code:e.target.value,
    // isRedirect:false
  })

}
  render() {
    // const { data } = this.props.data.currentUser;
    return (
      <header id="header-1" className="header" style={{ width: "100%" }}>
        {this.state.isRedirect && <Redirect to={"/searchbycode?code="+this.state.code}/> }
        {/* Thanh điều hướng */}
        <nav className="navbar navbar-expand-lg nav-custom header-nav">
          {/* Logo */}

          <div className="container">
            <div className="navbar-nav">
              <Active to="/" className="navbar-brand h1 nav-logo">
                <img width={75} height={75} src={logo} />
              </Active>
            </div>

            <div className="input-group inputPosition">
              <input onChange={this.isChangeSearchByCode} placeholder="Tìm kiếm dặt cọc..." className="form-control" />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa fa-search" onClick={this.isClickSearchByCode} aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* Đăng nhập đăng ký */}
            <ul>
              <li className="nav-item">
                <Active
                  activeStyle={{ color: "#f68a39" }}
                  to="/dangtin"
                  className="nav-link"
                >
                  Đăng tin
                </Active>
              </li>
              {/* Đăng nhập */}
              {/* Nút đăng nhập */}
              {this.bar()}
            </ul>
            {/* Đăng nhập đăng ký */}
          </div>
        </nav>
        {/* Thanh điều hướng */}

        {/* <div class="search-box">
          
        </div> */}
      </header>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account,
  };
};
const mapDispatchToProps = {
  getall: userAction.getUser,
  logout: userAction.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
