import React from "react";
import PhongTroCard from "./DanhSachPhongtroComponent/PhongTroCard";
import Header from "./layout/Header";
import PageNumber from "./DanhSachPhongtroComponent/PageNumber"
import { GET_POST_BY_PROVINCE } from '../_helper'
import Footer from "./layout/Footer";
import PhongTro from "./DanhSachPhongtroComponent/PhongTro";
class DanhSachPhongtro extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem("prevPath", this.props.location.pathname)
    this.state = {
      post: [],
      isLoading: true,
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    }
    if (this.state.post.length === 0) {

      GET_POST_BY_PROVINCE(this.props.match.params.id).then(data => this.setState({
        post: [...data]
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          .concat(...data)
          ,
        isLoading: false,
        totalRecords: data.length
      }))
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
  render() {
    var {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex,
      post
    } = this.state;

    var rowsPerPage = [];
    rowsPerPage = post.slice(startIndex, endIndex + 1);
    return (
      <div>
        <Header />
        <section className="container">
          <h3 className="font-weight-bold">
            có {this.state.post.length} nơi ở
        </h3>
          {this.state.isLoading === false ? <div className="row" style={{ marginTop: "10px" }}>
         
            {this.showPost(rowsPerPage)}
          
        
          </div>
            : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
          {/* <SoTrang /> */}
          <PageNumber
            totalRecords={this.state.post.length}
            pageLimit={pageLimit || 12}
            initialPage={1}
            pagesToShow={5}
            onChangePage={this.onChangePage}

          />
        </section>
        <Footer />
      </div>
    );
  }
}
export default DanhSachPhongtro;
