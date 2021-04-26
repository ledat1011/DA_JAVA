import React, { Component } from 'react'
import { postHelper } from '../_helper';
import PageNumber from './DanhSachPhongtroComponent/PageNumber';
import PhongTro from './DanhSachPhongtroComponent/PhongTro';
import Footer from './layout/Footer';
import Header from './layout/Header';
import queryString from 'query-string'
import ThanhTimKiem from './layout/SearchBar';

export default class ResultSearchComponent extends Component {
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
      const param = queryString.parse(this.props.location.search);
      postHelper.search(param).then(value => {
        if (value.status) {
          var data = value.data
          this.setState({
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
              .concat(...data),
            isLoading: false,
            totalRecords: data.length
          })
        } else {
          console.log(value.err);
        }

      })
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
