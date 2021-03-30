import React from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Nav } from "react-bootstrap";

export default class AroundConvenient extends React.Component {
  render() {
    return (
      <div>
        <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>
                Tiện ích xung quanh
              </h3>
              <p>Trải nghiệm các tiện ích nổi bật xung quanh căn hộ</p>
              <Tab.Container defaultActiveKey="1">
              <div className="tab d-none d-sm-flex w-100">
                <Nav className="tab_nav">
                  <Nav.Link
                    className="tab_link is-flex align-center jstart is-relative .tab_link_active"
                    eventKey="1"
                  >
                    Địa điểm nổi tiếng
                  </Nav.Link>
                  <Nav.Link
                    className="tab_link is-flex align-center jstart is-relative"
                    eventKey="2"
                  >
                    Ẩm thực
                  </Nav.Link>
                  <Nav.Link
                    className="tab_link is-flex align-center jstart is-relative"
                    eventKey="3"
                  >
                    Giải trí
                  </Nav.Link>
                  <Nav.Link
                    className="tab_link is-flex align-center jstart is-relative"
                    eventKey="4"
                  >
                    Cơ quan, ban ngành
                  </Nav.Link>
                </Nav>
                <Tab.Content className="fl-item-stretch">
                  {/* Địa điểm nổi tiếng */}
                  <Tab.Pane eventKey="1" className="tab_link_content">
                    <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">1</span>
                          <span className="locationContentText">
                            Nhà hát lớn
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">2</span>
                          <span className="locationContentText">Bảo tàng</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">3</span>
                          <span className="locationContentText">Tượng đài</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">4</span>
                          <span className="locationContentText">Vườn hoa</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">5</span>
                          <span className="locationContentText">Chùa</span>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                    {/* Ẩm thực */}
                  <Tab.Pane eventKey="2" className="tab_link_content">
                    <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">1</span>
                          <span className="locationContentText">
                            Nhà hát lớn
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">2</span>
                          <span className="locationContentText">Bảo tàng</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">3</span>
                          <span className="locationContentText">Tượng đài</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">4</span>
                          <span className="locationContentText">Vườn hoa</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">5</span>
                          <span className="locationContentText">Chùa</span>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                    {/* Giải trí */}
                  <Tab.Pane eventKey="3" className="tab_link_content">
                    <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">1</span>
                          <span className="locationContentText">
                            Nhà hát lớn
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">2</span>
                          <span className="locationContentText">Bảo tàng</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">3</span>
                          <span className="locationContentText">Tượng đài</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">4</span>
                          <span className="locationContentText">Vườn hoa</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">5</span>
                          <span className="locationContentText">Chùa</span>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                    {/* Cơ quan ban ngành */}
                  <Tab.Pane eventKey="4" className="tab_link_content">
                    <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">1</span>
                          <span className="locationContentText">
                            Nhà hát lớn
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">2</span>
                          <span className="locationContentText">Bảo tàng</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">3</span>
                          <span className="locationContentText">Tượng đài</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">4</span>
                          <span className="locationContentText">Vườn hoa</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="locationContent d-flex">
                          <span className="locationContentNumber">5</span>
                          <span className="locationContentText">Chùa</span>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
              </Tab.Container>
      </div>
    );
  }
}