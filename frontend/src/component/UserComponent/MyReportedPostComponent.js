import React from "react";
import Header from "../layout/Header";
import { Link, NavLink as Active } from "react-router-dom";
import HeaderProfile from "../layout/HeaderProfile";
import Item from "antd/lib/list/Item";
import MenuTrans from "./_menuTransaction";
import { connect } from "react-redux"
import { reportHeler } from "../../_helper/report.helper";
import { PATH } from "../../_type";
import { getFormattedDate } from "../../_type/formatdate.helper";
class MyReportPostComponent extends React.Component {
  constructor(prop) {
    super();
    this.state = {
      showReportContent: false,
      row: false,
      post: [],
      currentClickPossition:0,
      reports:[],
      holdCurrentReport:[]
    };
  }

  rptBtn = (id,index) => {
    //check if change different posistion
    var arrReport = this.state.holdCurrentReport.filter(c=>c.id==id)[0].reports;
    if(index != this.state.currentClickPossition){
      this.setState({
        showReportContent:true,
        currentClickPossition:index,
        reports:arrReport
      });

    }else{
      this.setState({
        showReportContent: !this.state.showReportContent,
        currentClickPossition:index,
        reports:arrReport
      });
    }
  
  };
  componentDidMount() {
    this.props.user && reportHeler.get(this.props.user.id).then(result => {
      if (result.status) {
        this.setState({
          post: result.data,
          holdCurrentReport:result.data
        })
      } else {
        console.log(result.error);
      }
    })
  }


  showReport = () => {

   
      return  (
        <div className="container" style={{ marginTop: "20px" }}>
          <div className="card list-vertical">
            {this.state.reports.map((c,index)=>
             <div className="card-body" style={{ width: "100%" }}>
              <p>{index +1}: {c.user.First_name} {c.user.Last_name} - {getFormattedDate(c.create_at)}</p>
              <strong>{c.level}</strong>
              <p style={{ marginLeft: "20px" }}>
              {c.content_report}
              </p>
            </div>
            )}
           
          </div>
        </div>
      );

  };

  render() {
    console.log(this.state.reports);
    return (
      <div>
        <HeaderProfile />

        <div className="clearfix"></div>

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            <MenuTrans />
            <div className="col-md-8">
              <h3>Danh sách bài đăng phản hồi: {this.state.post.length}</h3>
          {this.state.post.length!==0 && this.state.post.map((c,index)=>
                          <div
                          className="card-body rounded row list-horizonal"
                          style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            marginTop: "20px",
                          }}
                        >
                          <p style={{ position: "absolute" }}>#{index +1}</p>
                          <div
                            className="col-md-3"
                            style={{ padding: "30px 0 0px 10px" }}
                          >
                            <img src={PATH.image + c.avatar} width={150} height={150} />
                          </div>
          
                          <div
                            className="col-md-3"
                            style={{ padding: "45px 0 20px 15px" }}
                          >
                            <ul style={{ float: "left" }}>
                              {/* Tên người đăng */}
                              <li>{c.user.First_name} {c.user.Last_name} </li>
                              <br />
                              {/* Email */}
                              <li>
                                <div
                                  title="hung19997126@gmail.com"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "120px",
                                    height: "20px",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                 {c.user.Email}
                                </div>
                              </li>
                              <br />
                              {/* Số điện thọai */}
                              <li>{c.user.PhoneNumber}</li>
                            </ul>
                          </div>
                          <div
                            className="col-md-3"
                            style={{ padding: "45px 0 20px 15px" }}
                          >
                            <ul style={{ float: "left" }}>
                              {/* Mã đặt chỗ */}
                              <li>
                                <strong>Mã bài đăng: #{c.id}</strong>
                              </li>
                              <br />
                              <li>
                                <div
                                  title={c.title}
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "120px",
                                    height: "20px",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  Tiêu đề: {c.title}
                                </div>
                              </li>
                            
                       
                            </ul>
                          </div>
                          <div
                            className="col-md-3"
                            style={{ padding: "40px 0 20px 15px" }}
                          >
                            <ul style={{ float: "left" }}>
                              {/* Ngày đăng */}
          
                              <br />
                              <li>
                                <a
                                  onClick={()=>this.rptBtn(c.id,index)}
                                  className="btn btn-warning font-weight-bold text-white"
                                >
                                  Xem phản hồi
                                </a>
                              </li>
                            </ul>
                          </div>
                          {this.state.showReportContent && this.state.currentClickPossition ==index && this.showReport () }
                       
                        </div>
            )}




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
export default connect(mapStateToProps)(MyReportPostComponent)