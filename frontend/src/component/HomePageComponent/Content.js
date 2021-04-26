import React from "react";
import {Link} from 'react-router-dom';
import ThanhTimKiem from "../layout/SearchBar";
import "font-awesome/css/font-awesome.min.css";
import CardGoiY from "./CardGoiYKhamPha";
import CardDiadDiemNoiBat from "./CardDiaDiemNoiBat";
import { connect } from 'react-redux'
import {postHelper} from "../../_helper/post"
import banner1 from '../../_img/bannerCity5.jpg'
import banner2 from '../../_img/bannerCity2.jpg'
import banner3 from '../../_img/bannerCity4.jpg'

import {provinceData} from '../../_helper/index'
import Map from "../Map";
import PhongTro from "../DanhSachPhongtroComponent/PhongTro";


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      province:[],
      suggesstPost:[]
    }
    if(this.state.province.length ===0){
      provinceData().then(val => this.setState({province:val}))
     
    }
  }
  componentDidMount() {
    var localtion = navigator.geolocation;
    if(localtion){
        navigator.geolocation.getCurrentPosition((position)=>{
            // console.log("lat", position.coords.latitude);
            // console.log("lng",position.coords.longitude)
            postHelper.suggesst({lng:position.coords.longitude,lat: position.coords.latitude}).then(data=>{
             this.setState({
               suggesstPost:data
             })
            })
        })
    }
  }
  
  
  render(){
    
    return (
     
      <section>
        <div id="header-1" className="container header">
          {/* Welcome */}
          <h3 className="font-weight-bold">Chào mừng bạn đến với chúng tôi!</h3>
          { this.props.data.user? "":  <p>
            <Link to='/dangnhap'>
              Đăng nhập
            </Link>{" "}
            hoặc{" "}
            <Link to="/dangky">
              Đăng ký
            </Link>{" "}
            để trải nghiệm
          </p>}
         
          {/* <Dangnhap />
          <Dangky /> */}
          {/* Promotion Carousel */}
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* Dấu trang */}
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to={0} className="active" />
              <li data-target="#demo" data-slide-to={1} />
              <li data-target="#demo" data-slide-to={2} />
            </ul>
            {/* Slide */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={banner1}
                  alt="promotion1"
                  width={920}
                  height={500}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={banner2}
                  alt="promotion2"
                  width={920}
                  height={500}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={banner3}
                  alt="promotion3"
                  width={920}
                  height={500}
                />
              </div>
            </div>
            {/* Mũi tên trái phải */}
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon" />
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon" />
            </a>
          </div>
          <ThanhTimKiem />
          {/* Khu vực nổi bật */}
          <div className="areas">
            <h3 className="font-weight-bold text-center">Địa điểm nổi bật</h3>
            <div id="demo2" className="carousel slide" data-interval="false">
              {/*Slides*/}
              <div className="carousel-inner" role="listbox">
                {/*Slide thứ nhất*/}
                <div className="carousel-item active">
                {this.state.province.map(val => val._hot && <CardDiadDiemNoiBat id={val.id}  province={val._name} image={val._image} places={val.postCounts +" nơi ở"}/>)}
                </div>
                {/*/.Slide thứ nhất*/}
                {/*Slide thứ 2*/}
                {/* <div className="carousel-item"> */}
{/*                
                <CardDiadDiemNoiBat districts="Quận Bình Thạnh" places="100 nơi ở"/>

              
                <CardDiadDiemNoiBat districts="Quận Gò Vấp" places="100 nơi ở"/>

            
                <CardDiadDiemNoiBat districts="Quận Thủ Đức" places="100 nơi ở"/>

              
                <CardDiadDiemNoiBat districts="Quận Tân Bình" places="100 nơi ở"/> */}

                {/* </div> */}
                {/*/.Slide thứ 2*/}
              </div>
              {/*/.Slides*/}
              <a
                className="carousel-control-prev"
                href="#demo2"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon arrow-custom" />
              </a>
              <a
                className="carousel-control-next"
                href="#demo2"
                data-slide="next"
              >
                <span className="carousel-control-next-icon arrow-custom-next" />
              </a>
            </div>
          </div>
          {/* Khu vực nổi bật */}

          {/* Gợi ý khám phá */}
          {/* {this.state.suggesstPost.map((val,index) => <CardGoiY keyss = {index} data={val} />)} */}
          <div className="areas">
            <h3 className="font-weight-bold text-center">Gợi ý khám phá</h3>
            <div id="demo3" className="carousel slide" data-interval="false">
              {/*Slides*/}
              <div className="carousel-inner" role="listbox">
                {/*Slide thứ nhất*/}
                <div className="carousel-item active">
                  <div className="row">
                  {this.state.suggesstPost.map((data,index)=>
                  <PhongTro key={index} data={data} index={index} />
                )}
                  </div>
                  {/* <CardGoiY img="https://cdn.luxstay.com/admins/12/bNywAjfNDrqL1dwhmTsFjs-c.png"/>

              
                  <CardGoiY img="https://cdn.luxstay.com/users/344129/ctw0NjterCd6KqVybj5kLY41.jpg"/>

                  <CardGoiY img ="https://cdn.luxstay.com/users/345884/lBvMkAV0sXnCCa2O8iorNgVC.png"/>

                  
                  <CardGoiY img="https://cdn.luxstay.com/admins/12/AJJerHhii02d9YVbDanCvcFv.png"/> */}
               
                </div>
                {/*/.Slide thứ nhất*/}

                {/*Slide thứ 2*/}
                <div className="carousel-item">
                  {/* Thẻ 1 */}
                  <CardGoiY/>

                  {/* Thẻ 2 */}
                  <CardGoiY/>

                  {/* Thẻ 3 */}
                  <CardGoiY/>

                  {/* Thẻ 4 */}
                  <CardGoiY/>

                </div>
                {/*/.Slide thứ 2*/}
              </div>
              {/*/.Slides*/}
              <a
                className="carousel-control-prev"
                href="#demo3"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon arrow-custom" />
              </a>
              <a
                className="carousel-control-next"
                href="#demo3"
                data-slide="next"
              >
                <span className="carousel-control-next-icon arrow-custom-next" />
              </a>
            </div>
          </div>
          {/* Gợi ý khám phá */}
          <Map className="mapHomePage"></Map>
        </div>
      
      </section>
    );
  }
   
  }
  const mapStateToProps = (state) => {
    return {
        data: state.Account
    }
}
export default  connect(mapStateToProps)(Content)

