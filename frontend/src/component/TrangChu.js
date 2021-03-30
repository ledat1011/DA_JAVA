import React from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Content from "./HomePageComponent/Content";
import queryString from 'query-string'
import { paymentHelper } from "../_helper/payment.helper";
export default class TrangChu extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem("prevPath","/");
  }
  componentDidMount() {
   if(this.props.location.search.length!==0){
     var query = queryString.parse(this.props.location.search);
     paymentHelper.excute({PayerID:query.PayerID}).then(data=>{
     console.log(data);
     })
   }
 

  }
  render(){  

  return (
        <div>
          <Header />
          <Content />
          <Footer />
        </div>
    );
  }
}

