import React from "react";
import Convenient from "./Convenient";
import AroundConvenient from "./AroundConvenient";
import { Link, Redirect } from "react-router-dom"
import ChonNgay from "./ChonNgayDatCoc";
import CommentBox from './CommentBox'
import { getPostById, savepost } from "../../_helper/index"
import { PATH } from "../../_type/filepath.type"
import { connect } from "react-redux"

class ContentChiTietPhongTro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      readMore: false,
      commnet: localStorage.getItem("comment") || "",
      isRedirect: false,
      isSavePost:  false,
    }
  }
  stateRead = () => {
    this.setState({ readMore: !this.state.readMore })
  }
  /** display convenion */
  renderTienIch = () => {
    const { tieniches } = this.state.data;
    const unique = [...new Set(tieniches.map(item => item.loaitienich.TenLoaiTienIch))]; // [ 'A', 'B']
    return unique.map(name => <Convenient ConvenientNames={name} data={tieniches} />)
  }
  isChangeDate = (data) => {
    // console.log(data);
  }
  isChangeComment = (data) => {
    this.setState({
      commnet: data
    })
  }
  isClickSavePost = async () => {
    /**check user login */
    if (!this.props.data.user) {
      this.setState({ isRedirect: true })
    } else {
      var req = await savepost.create(this.props.ID, this.props.data.user.id);

      if (req.status) {
        this.setState({ isSavePost: true })
      }
    }
  }
  isClickDeleteSavePost =async()=>{
    if (!this.props.data.user) {
      this.setState({ isRedirect: true })
    } else {
    
      var req = await savepost.delete(this.props.ID, this.props.data.user.id);
      if (req.status) {
        this.setState({ isSavePost: false })
      }
    }
  }
  componentWillMount() {
    if (Object.keys(this.state.data).length === 0) {
      getPostById(this.props.ID).then((val) => this.setState({ data: val }));
    }
    // this.props.checkSavePost();
  }
  render() {
   
    const { Created_at, DiaChi, Dientich, TrangThaiDatCoc, Update_at, addRule,
      bathroomNuber, id, introduction, kitchenNumber, maxPrice, minPrice,
      price, roomNumber, selectedRuleParty, selectedRulePet, selectedRuleSmoke,
      soLuongTruyCap, status, tienDatCoc, tieniches, title, typepost, formpost, binhluans, saveposts } = this.state.data;

    return this.state.isRedirect ? <Redirect to="/dangnhap" /> : Object.keys(this.state.data).length !== 0 ? (
      <div>
        <div id="demo" className="carousel slide" data-ride="carousel">
          {/* D???u trang */}
          <ul className="carousel-indicators">
            {this.state.data.images.map((val, index) => <li data-target="#demo" data-slide-to={index} className={index === 0 ? "active" : ""} />)}
          </ul>
          {/* Slide */}
          <div className="carousel-inner carousel-inner-chitiet">
            {this.state.data.images.map((val, index) =>
              <div className={"carousel-item" + (index === 0 ? " active" : "")}>
                <img
                  src={PATH.image + val.img}
                  alt="promotion2"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>)}
          </div>

        {/* Noi dung chi tiet */}
        <div className="container">
          <div className="row">
            {/* C???t tr??i */}
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white breadcrumb-custom">
                  <li className="breadcrumb-item">
                    <a className="black-text" href="#">
                      Trang ch???
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="black-text" href="#">
                      Danh s??ch ph??ng tr??? theo khu v???c
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="black-text" href="#">
                      Ph??ng tr???
                    </a>
                  </li>
                </ol>
              </nav>
              <h1 className="font-weight-bold">{title}</h1>
              <p className="subTitle">{DiaChi}</p>
              <p className="subTitle">{typepost.name}</p>
              <p>{formpost.name} ?? {bathroomNuber} Ph??ng t???m ?? 1 gi?????ng ?? 1 ph??ng ng???</p>

              {/* ??o???n v??n m?? t??? chi ti???t */}
              <div style={!this.state.readMore ?
                {
                  overflow: "hidden",
                  width: "100%",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical"
                }
                : null}
                dangerouslySetInnerHTML={{ __html: introduction }} />
              <p onClick={this.stateRead}
                className="font-weight-bold"
                style={{ color: " rgb(247, 153, 12)", hover: "#000" }} >
                {this.state.readMore ? "Thu g???n" : "Xem th??m"}</p>

              {/* ??o???n v??n m?? t??? chi ti???t */}

              {/* Ti???n ??ch ch??? ??? */}
              <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>
                Ti???n ??ch ch??? ???
              </h3>
              <p>Gi???i thi???u ti???n nghi v?? d???ch v??? t???i n??i c?? tr??</p>


              <this.renderTienIch></this.renderTienIch>

              {/* Ti???n ??ch xung quanh */}
              <AroundConvenient />

              {/* ??? ????y ????? th??m c??i b???n ????? n???u ???????c */}

              {/* B??nh lu???n */}
              <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>
                B??nh lu???n
              </h3>
              <p>????? l???i b??nh lu???n c???a b???n t???i ????y</p>

              <CommentBox commnent={binhluans} id={this.props.ID} onChange={this.isChangeDate} />
              {/* B??nh lu???n */}
            </div>
            {/* C???t tr??i */}

            {/* C???t ph???i */}
            <div className="col-md-4" style={{ marginTop: "10px" }}>
              <div>
                <ul className="shareAndSave">
                  <li>
                    <a href="#">
                      Chia s??? <i className="fa fa-share-alt-square" />
                    </a>
                  </li>
                  <li style={{
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}>{( saveposts && saveposts.some(c => c.IdUser == this.props.data.user?.id && c.IdPost == this.props.ID) || this.state.isSavePost) ===true ? "B??? l??u" : "L??u l???i"} <i
                    onClick={() => ( saveposts && saveposts.some(c => c.IdUser == this.props.data.user?.id && c.IdPost == this.props.ID) || this.state.isSavePost) ===true  ? this.isClickDeleteSavePost(): this.isClickSavePost()}
                    style={{
                      cursor: "pointer",
                    }} className={( saveposts && saveposts.some(c => c.IdUser == this.props.data.user?.id && c.IdPost == this.props.ID) || this.state.isSavePost) ===true   ? "fa fa-heart" : "fa fa-heart-o"}></i>

                  </li>
                  <li>
                    <Link to="/feedback" >Ph???n h???i</Link>
                  </li>
                </ul>
              </div>
              {/* C???t tr??i */}

              {/* C???t ph???i */}
              <div className="col-md-4 rightSidePosition">
                <div>
                  <ul className="shareAndSave">
                    <li>
                      <a href="#">
                        Chia s??? <i className="fa fa-share-alt-square" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        L??u l???i <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">Ph???n h???i</a>
                    </li>
                  </ul>
                </div>

                <div className="room_sidebar rightSidePosition">
                  <div className="room_sidebar_content">
                    <div className="room_sidebar_pricing_content">
                      <p>
                        <span className="extra-bold">
                          {price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className="p_small">/th??ng</span>
                      </p>
                      <ChonNgay onChange={this.isChangeDate} />
                      <button className="btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_full bold rounded btn_shadow_pri">
                        <span className="btn_text">?????t ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* C???t ph???i */}
            </div>
            <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>
              Ch??? ??? t????ng t???
            </h3>
            <ul className="similarLocation">
              {/* <li>
              <PhongTroCard  />
            </li>
            <li>
              <PhongTroCard />
            </li>
            <li>
              <PhongTroCard />
            </li>
            <li>
              <PhongTroCard />
            </li> */}
            </ul>
          </div>
        </div>
      </div></div>
    ):(<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>);
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}
const mapDispatchToProps = {
  checkSavePost:""
}
export default connect(mapStateToProps)(ContentChiTietPhongTro)