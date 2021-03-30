import React from "react";
import { Link } from "react-router-dom";
import {to_slug} from '../../_helper'
export default class CardDiadDiemNoiBat extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="col-md-3" style={{ float: "left",height:"300px" }}>
        <div className="mb-2 card-bubble" style={{ height:"100%" }}>
          <Link to={"/danhsach/"+to_slug(this.props.province)+"."+this.props.id}>
            <div className="card text-white" style={{ height:"100%" }}>
              <img
                className="card-img areas-img"
                src={this.props.image}
                alt="Card"
                // style={{width: "100%", height: "100%"}}
                
              />
              <div className="card-img-overlay">
                <h5 className="card-title">{this.props.province}</h5>
                <p className="card-text">{this.props.places}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
