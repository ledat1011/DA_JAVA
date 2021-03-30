import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/SignInSignUp.css";

// import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

// import TrangChu from "./component/TrangChu";
// import TrangChuSauDangNhap from "./component/TrangChuSauDangNhap";
// import DanhSachPhongtro from "./component/DanhSachPhongtro";
import RouteComponent from "./route/RouteComponent";
import { Provider } from "react-redux";
import store1 from './_store'
//my style
import "./Styles/Styles.css";


ReactDOM.render(
<Provider store =  {store1}>
<RouteComponent  />
</Provider>, document.getElementById("root"));
