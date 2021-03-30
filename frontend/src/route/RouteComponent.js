import React from 'react'
// import { connect } from 'react-redux'
import {
    Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import { connect } from "react-redux"
import DanhSachPhongtro from '../component/DanhSachPhongtro'
import TrangChu from '../component/TrangChu'
import ChiTietPhongTro from '../component/ChiTietPhongTroComponent/ChiTietPhongTro'
import Dangnhap from '../component/AccountComponent/LoginComponent';
import Dangky from '../component/AccountComponent/RegisterComponent';
import TrangDangTin from '../component/DangTinComponent/TrangDangTin';
import ThanhToan from '../component/_ThanhToan'
import { history } from '../_helper/index'
import Test from '../component/test';
import FeedBack from '../component/FeedBackForm';
import { socket } from "../_socket/socket.main"
import { userAction } from "../_action/index"
import { createNotificate, clearNotificate } from "../_action/notification.action"
import PreviewPage from '../component/PreviewPage';
import EditComponent from '../component/EditPostComponent/EditComponent';
import ResultSearchComponent from '../component/ResultSearchComponent';
import Profile from '../component/UserComponent/_Profile'
import LoginAdmin from '../component/_admin/_loginAdmin';

import adminTemp from '../component/_admin/_adminTemp';
import DetailPayment from '../component/_ChiTietSauThanhToan';



import Statistics from '../component/_admin/Statistics';
import LikePost from '../component/UserComponent/_LikePost';
import ManageUser from '../component/_admin/_manageUser';
import ManagePosts from '../component/_admin/_managerPosts';
import ManageBanner from '../component/_admin/_manageBanner';
import ManageReport from '../component/_admin/_manageReport';
import MyListPostComponent from '../component/UserComponent/MyListPostComponent';

import ManageEarning from '../component/UserComponent/_ManageEarningUser'
import SearchByCode from '../component/UserComponent/_SearchPostByCode';


import { savePostAction } from '../_action/savepost.action';
import MyReportPostComponent from '../component/UserComponent/MyReportedPostComponent';
import MyTransactionList from '../component/UserComponent/MyTransactionList';



class RouteComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        // history.listen((location, action) => {

        //     // clear alert on location change
        //     // this.props.clearAlerts();
        // });
        //check have token
        if(localStorage.getItem('token')){
            this.props.getUser();
        }
 
        //check have exist user
        
        
       
    }
    static getDerivedStateFromProps(props, state) {
        if (props.data.user) {
         
            return{
                user:props.data.user
            }
            
        }
    }
    PrivateRoute = ({ component: Component, ...rest }) => {
       
        return (
            <Route {...rest} render={props => 
                {
               
                    return (/*localStorage.getItem('user')*/ this.state.user 
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/dangnhap', state: { from: props.location } }} />)
                }
               
        } />
        )
    }
    loginRoute = ({ component: Component, ...rest }) => {
        // console.log(this.state.user);
        return (
            <Route {...rest} render={props => (
                this.state.user 
                    ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    : <Component {...props} />
            )} />
        )
    }
    componentDidMount() {
        socket.on('connect', () => { console.log('client connected'); })
        // for notificate
        socket.on("pushnofiticate", (data) => {
            this.props.createNotification(data);
            setTimeout(() => {
                this.props.clearNotificate();
            }, 2000);
        })
 
       
    }
    render() {
        const alertStyle = {
            display: "none",
            position: "fixed",
            animation: "mymove 2s infinite",
        }
        
       
        return (
           
            <div>
                {/* alert  style in "./Styles/Styles.css"*/}
                <div style={{ ...alertStyle, width: 'fit-content', zIndex: '9999', right: "50px" }} className={this.props.alert.message ? "alert alert-success d-block " : ""} id="ss">
                    <strong>Success!</strong> {this.props.alert.message}</div>

                <Router history={history} >
                    <Link to={"/chitiet/" + this.props.notification.message?.idPost}>
                        {/* nofiticate */}
                        <div style={{ ...alertStyle, width: 'fit-content', zIndex: '9999', left: "50px", padding: "30px" }} className={this.props.notification.message ? "alert alert-success d-block " : ""} id="ss">
                            <strong>{this.props.notification.message?.user}</strong> {this.props.notification.message?.message}</div></Link>
                    <Switch>
                        {/*======================= Home ===================================== */}
                      
                        <Route exact path="/" component={TrangChu} />

                        {/* ===================for account=====================================*/}

                        <this.loginRoute exact path="/dangnhap" component={Dangnhap} />

                        <this.loginRoute exact path="/dangky" component={Dangky} />
                        
                        <this.PrivateRoute exact path="/profile" component={Profile} />

                        <this.PrivateRoute exact path="/my-wish-list" component={LikePost} />

                        <Route exact path="/feedback" component={FeedBack} />

                        {/* ==================post controller CRUD=============================*/}

                        <this.PrivateRoute path="/dangtin" component={TrangDangTin} />

                        <Route exact path="/preview/:id" component={PreviewPage} />

                        <Route exact path="/edit/:id" component={EditComponent} />

                        <Route path="/chitiet/:id" component={ChiTietPhongTro} />

                        <Route exact path="/danhsach/:slug.:id" component={DanhSachPhongtro} />

                        <Route exact path="/result" component={ResultSearchComponent} />
                        {/* ===================================================================== */}

                        
                        {/*================================= for payment =========================*/}
                        
                        <Route exact path="/paymentdetail" component={DetailPayment}/>

                        <Route exact path="/thanhtoan" component={ThanhToan} />


                        {/*================================= for admin site ======================== */}
                       
                        <Route exact path="/admin/login" component={LoginAdmin}/>
                        {/* <Route exact path="/registerAdmin" component={RegisterAdmin}/> ??? */}
                        <Route exact path="/admin/dashboard" component={adminTemp}/>
                        <Route exact path="/admin/thongke" component={Statistics}/>

                        <Route exact path="/test" component={Test}/>

               

                        <Route exact path="/manageuser" component={ManageUser} />
                        <Route exact path="/managepost" component={ManagePosts} />
                        <Route exact path="/managebanner" component={ManageBanner} />
                        <Route exact path="/managereport" component={ManageReport} />
                        <Route exact path="/my-list-post" component={MyListPostComponent} />
                        <Route exact path="/my-reported-post" component={MyReportPostComponent} />
                        <Route exact path="/manageearning" component={ManageEarning}/>
                        <Route exact path="/my-list-transaction" component={MyTransactionList}/>
                        <Route exact path="/searchbycode" component={SearchByCode}/>


                     
                        <Redirect from="/admin/" to="/admin/dashboard" />

                        <Redirect from="*" to="/" />
                       
                    </Switch>
                </Router>

            </div>

        )
    }


}
const mapStateToProps = (state, ownProps) => {
    return {
        data: state.Account,
        alert: state.alert,
        notification: state.notification,
        all: state,
        savepost:state.savepost
    }
}
const mapDispatchToProps = {
    createNotification: createNotificate,
    clearNotificate: clearNotificate,
    getUser: userAction.getUser,
 
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteComponent)
