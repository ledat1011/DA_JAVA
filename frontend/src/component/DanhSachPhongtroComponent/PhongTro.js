import React from "react";
import { Link, Redirect } from "react-router-dom";
import { PATH } from "../../_type/index";
import {connect} from "react-redux"
import { savePostAction } from "../../_action/savepost.action";

class PhongTro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect:false
    }
    
  }

  isClickAddWishList = (IdPost,e)=>{
    if(!this.props.user){
      this.setState({
        isRedirect:true
      })
    }else{
      const idUser = this.props.user.id;
     const check =e.target.className;
     if(check =="fa fa-heart"){
     this.props.removeSavePost(idUser,IdPost);
     }else{

      this.props.addSavePost(idUser,IdPost)
     }
   
    }

  }
  render() {
    const { title, typepost, formpost, id } = this.props.data;
    return (
      <div
        title={title}
        className="card col-md-3"
        style={{ width: "18rem", border: "none", position: "relative" , height: "400px"}}
      >
        {this.state.isRedirect && <Redirect to="/dangnhap"/>}
        <div className="iconHeart" style={{position: "absolute"}}>
          {" "}
          <i onClick={(e)=>this.isClickAddWishList(id,e)} style={{cursor:"pointer"}} class={this.props.saveList.includes(id)?"fa fa-heart" :"fa fa-heart-o"} aria-hidden="true"></i>
        </div>
        {/* <i className="far fa-heart iconHeart"/> */}

        <Link
          to={"/chitiet/" + id}
          style={{ textDecoration: "none", color: "#555", position: "absolute" }}
        >
          <img
            height="250"
            className="card-img-top"
            height="200"
            src={PATH.image + this.props.data.avatar}
            alt="Card image cap"
          />

          <div className="card-body">
            <h5
              className="card-title"
              style={{ color: "rbg(118,118,118)", fontSize: "14px" }}
            >
              {typepost.name}- {formpost.name}
            </h5>
            {/* <h5 className="card-title"></h5> */}
            <p
              className="card-text"
              style={{
                overflow: "hidden",
                width: "100%",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </p>
            <p style={{ fontWeight: "500" }}>
              {this.props.data.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              /tháng
            </p>
          </div>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user:state.Account.user,
    saveList:state.savepost
  }
}
const mapDispatchToProps =  {
 addSavePost: savePostAction.create,
 removeSavePost:savePostAction.remove
}

export default connect(mapStateToProps,mapDispatchToProps)(PhongTro)