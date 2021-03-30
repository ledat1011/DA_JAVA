import React from "react";
import { savepost } from "../../_helper";

import PhongTro from "../DanhSachPhongtroComponent/PhongTro";
import HeaderProfile from "../layout/HeaderProfile";
import {connect} from "react-redux"
import Footer from "../layout/Footer";
import PageNumber from "../DanhSachPhongtroComponent/PageNumber";

 class LikePost extends React.Component {
   constructor(props) {
     super(props);
     this.state ={
       my_wish_list :[],
       isLoading: true,
       totalRecords: "",
       totalPages: "",
       pageLimit: "",
       currentPage: "",
       startIndex: "",
       endIndex: ""
     }
   }
   
   showPost = post => {
    var result = null;
    if (post.length > 0) {
      result = post.map((post, index) => {
        return <PhongTro key={index} data={post} index={index} />;
      });
    }
    return result;
  };

  onChangePage = data => {

    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  componentDidMount() {
    savepost.getV2(this.props.data.user.id).then(res=>{
      if (res.status) {
        this.setState({
          my_wish_list: res.data.map(c=> c.post),
          isLoading:false
        })
      }else{
        console.log(res.error);
      }
    })
  }
  
  render() {

    var {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex,
      my_wish_list
    } = this.state;
    var rowsPerPage = [];
    rowsPerPage = my_wish_list.slice(startIndex, endIndex + 1);
    return (
      <div>
        <HeaderProfile />
        <div className="clearfix"></div>
        <div className="tabContents" id="postLiked">
          <div className="container tabBgFull">
            <h3>Bài viết đã lưu: {this.state.my_wish_list.length}</h3>
            {this.state.isLoading === false ? <div className="row" style={{ marginTop: "10px" }}>
         
         {this.showPost(rowsPerPage)}
       
     
       </div>
         : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
          </div>
        </div>
        <PageNumber
            totalRecords={this.state.my_wish_list.length}
            pageLimit={pageLimit || 12}
            initialPage={1}
            pagesToShow={5}
            onChangePage={this.onChangePage}

          />
        {/* <Footer/> */}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}
export default connect(mapStateToProps)(LikePost)