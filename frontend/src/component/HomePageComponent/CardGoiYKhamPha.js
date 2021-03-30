import React from "react";
import PropTypes from "prop-types";
export default class CardGoiY extends React.Component {
  render() {
    
    return (
      <div className="col-md-3" style={{ float: "left" }}>
        <div className="mb-2">
          {/* Thẻ xoay */}
          <div className="card-flip">
            <div className="flip">
              <div className="front">
                {/* Nội dung mặt trước */}
                <div className="card">
                  <img
                  
                    className="card-img-top"
                    src={this.props.img}
                    alt="100%x180"
                    style={{
                      display: "block",
                     height:"200px"
                    }}
                    data-holder-rendered="true"
                  />
                </div>
              </div>
              <div className="back">
                {/* Nội dung mặt sau */}
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CardGoiY.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  keyword: PropTypes.string,
  onSearchProduct: PropTypes.func.isRequired
};

