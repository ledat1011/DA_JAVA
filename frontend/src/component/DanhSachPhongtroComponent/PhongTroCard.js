import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../_type/index";
export default class PhongTroCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    const {title,typepost,formpost,id} =this.props.data;
    return (
      // <div style={{ float: "left", margin: "20px auto" }}>
      //   <div className="card" style={{ width: "250px" }}>
      //     <img
      //       className="card-img-top"
      //       src={PATH.image + this.props.data.avatar}
      //       width={250}
      //       height={150}
      //       alt="Card image cap"
      //     />
      //     <div className="card-body">
      //       <h5 className="card-title">Card title {this.props.keyss}</h5>
      //       <p className="card-text">
      //         {this.props.data.price.toLocaleString("it-IT", {
      //           style: "currency",
      //           currency: "VND",
      //         })}
      //       </p>
      //       <Link
      //         to={"/chitiet/" + this.props.data.id}
      //         className="btn btn-warning font-weight-bold"
      //         style={{ color: "#fff" }}
      //       >
      //         Xem thêm
      //       </Link>
      //     </div>
      //   </div>
      // </div>
      <div title=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae repudiandae recusandae quae repellat velit consequuntur blanditiis iste, doloremque nesciunt soluta vel in mollitia quos dicta provident impedit dolorum inventore officia!" className="card col-md" style={{ width: "18rem", border: "none" }}>
        <Link to={"/chitiet/"+id} style={{ textDecoration: "none", color: "#555" }}>
          <img
            className="card-img-top"
            src={PATH.image + this.props.data.avatar}
            alt="Card image cap"
          />
          <div className="card-img-overlay">
            <button className="iconHeart">
              {" "}
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </button>
            {/* <i className="far fa-heart iconHeart"/> */}
          </div>
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
              style={

                {
                  overflow: "hidden",
                  width: "100%",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }

              }
            >
              {title}
            </p>
            <p style={{ fontWeight: "500" }}>350.000đ/tháng</p>
          </div>
        </Link>
      </div>
    );
  }
}
