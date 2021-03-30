import React from "react";

export default class Convenient extends React.Component {
  render() {
    return (
      <div className="clearfix">
        <h5 className="font-weight-bold">
          Tiện ích {this.props.ConvenientNames}
        </h5>
        <ul className="convenient is-flex " style={{width:"100%"}} >
          {this.props.data.map(val=> val.loaitienich.TenLoaiTienIch ===this.props.ConvenientNames&&  <li style={{width:"max-content"}} className="mt_12">{val.TenTienIch}</li>)}
        </ul>
      </div>
    );
  }
}
