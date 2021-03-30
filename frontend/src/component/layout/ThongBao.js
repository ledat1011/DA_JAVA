import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {socket} from "../../_socket/socket.main"
import {thongbaoHelper} from "../../_helper/thongbao.helper"
function prettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

class ThongBao extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notification:[]
    }
  }
  componentDidMount() {
    thongbaoHelper.GET(this.props.data.user.id).then(data=>{
     this.setState({notification:data})
    })
    socket.on('addcomment', (res) => {
      thongbaoHelper.GET(this.props.data.user.id).then(data=>{
        this.setState({notification:data})
       })
    });
  }

  isClickNotificate =(id)=>{
    thongbaoHelper.UPDATE(id).then(data=>{
      if(data.status){
       var coppy= [...this.state.notification]
      .map(c=>{
         if(c.id == id){
           c.status=true;
         }
         return c;
       });
       this.setState({notification:coppy})
      }else{

      }
    })
  }

  render() {
    const {notification} = this.state;
    // console.log(thongbaos);
 
    return (
      <div className="dropdown">
        <a
          id="dLabel"
          role="button"
          data-toggle="dropdown"
          data-target="#"
          href="/page.html"
        >
          {/* <icons className="glyphicon glyphicon-bell" /> */}
          <i className="fa fa-bell" />
          <span class="badge badge-pill badge-danger notify">{this.state.notification.filter(c=> c.status ===false).length}</span>
        </a>
        <ul
          className="dropdown-menu notifications"
          role="menu"
          aria-labelledby="dLabel"
        >
          <div className="notification-heading">
            <h4 className="menu-title">Thông báo</h4>
          </div>
          <li className="divider" />
          <div className="notifications-wrapper">
            {[...notification].sort((a,b)=> b.id - a.id).map(value=> <Link onClick={()=>this.isClickNotificate(value.id)} className="content" to={value.thongbao.link}>
              <div className="notification-item" style={value.status?{backgroundColor:"#fff1f1"}:null}>
                <h4 className="item-title"> { prettyDate(value.thongbao.NgayThongBao)} </h4>
                <p className="item-info"><strong>{value.thongbao.MoTa}</strong> {value.thongbao.NoiDung}</p>
              </div>
            </Link>)}

           

          </div>
          <li className="divider" />
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}
export default connect(mapStateToProps)(ThongBao)