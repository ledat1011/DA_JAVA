import React from "react";
import { Redirect } from "react-router-dom";
import { districtData, provinceData, wardData } from "../../_helper/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { tienichHelper } from "../../_helper/tienich.helper";

function cleanObj(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] == ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ThanhTimKiem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fProvince: "",
      province: [],
      district: [],
      ward: [],
      fDistrict: "",
      fWard: "",
      query: "",
      isRedirect: false,
      showPopUp: false,
      tienich: [],
      fTienIch: [],
      fMaxPrice: "",
      fMinPrice: "",
    };

    if (this.state.province.length === 0) {
      provinceData().then((data) => {
        this.setState({
          province: data,
        });
      });
    }
    if (this.state.tienich.length === 0) {
      tienichHelper.get().then((data) => {
        if (data.status) {
          this.setState({
            tienich: data.data.map((val) => {
              return { value: val.id, label: val.TenTienIch };
            }),
          });
        } else {
          console.log(data.error);
        }
      });
    }
  }

  popup = () => {
    return (
      <div className="popup_search">
        <div className="popup_inner_search text-center container">
          <div
            style={{ float: "right", padding: "5px 25px" }}
            className="font-weight-bold"
          >
            <button className="btn" onClick={this.togglePopup}>
              X
            </button>
          </div>
          <div className="clearfix"></div>
          <h1>Tìm kiếm nâng cao</h1>

          <h4>Giới tính</h4>
          <div className="mt_12" style={{ marginLeft: "-30px" }}>
            <label className="radio--box ">
              <input type="radio" name="gioiTinh" />
              <span className="radiomark" />
              <p style={{ marginLeft: "60px" }}>Nam</p>
            </label>
            <label className="radio--box ">
              <input type="radio" name="gioiTinh" />
              <span className="radiomark" />
              <p style={{ marginLeft: "60px" }}>Nữ</p>
            </label>
            <label className="radio--box ">
              <input type="radio" name="gioiTinh" />
              <span className="radiomark" />
              <p style={{ marginLeft: "60px" }}>Khác</p>
            </label>
          </div>

          <div className="mt_12">
            <h4>Tiện ích</h4>
            <div
              className="mt_12"
              style={{ maxWidth: "70%", marginLeft: "35%" }}
            >
              <Select
                onChange={this.isChangeTienIch}
                options={this.state.tienich}
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                className="w-50"
              />
            </div>
          </div>

          <h4 className="mt_24">Khoảng giá</h4>
          <div
            className="row mt_12 form-group inputValue"
            // style={{ maxWidth: "70%", marginLeft: "21%" }}
          >
            <div className="col-md-5">
              <input
                className="form-control"
                name="fMinPrice"
                onChange={this.isChangeFilter}
                placeholder="Giá tối thiểu"
              />
            </div>
            <div className="col-md-5">
              <input
                className="form-control inputMt_10"
                name="fMaxPrice"
                onChange={this.isChangeFilter}
                placeholder="Giá tối đa"
              />
            </div>
          </div>

          <div className="mt_24">
            <h4>Diện tích</h4>
            <div
              className="row mt_12 inputValue"
            >
              <div className="col-md-5">
                <input className="form-control" placeholder="Diện tích tối thiểu"/>
              </div>
              <div className="col-md-5">
                <input className="form-control inputMt_10" placeholder="Diện tích tối đa"/>
              </div>
            </div>
          </div>

          {/* <div className="mt_24">
            <h4>Tiện ích</h4>
            <div
              className="mt_12"
              style={{ maxWidth: "70%", marginLeft: "35%" }}
            >
              <Select
                onChange={this.isChangeTienIch}
                options={this.state.tienich}
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                className="w-50"
              />
            </div>
          </div> */}

          <button
            onClick={this.isClickSearch}
            className="btn btn-warning font-weight-bold w-25 btn-positionDetailPayment"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    );
  };

  changeProvince = (e) => {
    var id = e.target.value;
    var name = e.target.name;
    this.setState({
      district: [],
      [name]: id,
      ward: [],
    });
    districtData(id).then((data) => {
      this.setState({
        district: data,
      });
    });
  };

  changeDistrict = (e) => {
    var idDistrict = e.target.value;
    this.setState({ fDistrict: idDistrict });
    this.setState({
      ward: [],
    });
    wardData(this.state.fProvince, idDistrict).then((data) => {
      this.setState({
        ward: data,
      });
    });
  };
  changeWard = (e) => {
    var idWard = e.target.value;
    this.setState({ fWard: idWard });
  };
  // componentWillMount() {

  // }

  isClickSearch = () => {
    var obj = {
      idProvince: this.state.fProvince,
      idDistrict: this.state.fDistrict,
      idWard: this.state.fWard,
      idTienIch: this.state.fTienIch.toString(),
      minPrice: this.state.fMinPrice,
      maxPrice: this.state.fMaxPrice,
    };
    var param = cleanObj(obj);
    var query = "";
    Object.keys(param).forEach((value) => {
      query += `${value}=${param[value]}&`;
    });
    query = query.slice(0, query.length - 1);
    this.setState({ query: query, isRedirect: true });
  };

  togglePopup = () => {
    this.setState({
      showPopUp: !this.state.showPopUp,
    });
  };
  isChangeTienIch = (e) => {
    console.log(e);
    this.setState({
      fTienIch: [...e.map((c) => c.value)],
    });
  };
  isChangeFilter = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return this.state.isRedirect ? (
      <Redirect to={"/result?" + this.state.query} />
    ) : (
      <div className="row searching-bar">
        <div className="col-md-2 pt-4">
          <div className="form-group">
            <select id="inputState" className="form-control w-100">
              <option>Loại tin</option>
              <option>Phòng trọ, nhà trọ</option>
              <option>Nhà thuê nguyên căn</option>
              <option>Tìm người ở ghép</option>
              <option>Cho thuê căn hộ</option>
            </select>
          </div>
        </div>
        <div className="col-md-2 pt-4">
          <div className="form-group">
            <select
              id="inputState"
              name="fProvince"
              onChange={this.changeProvince}
              className="form-control w-100"
            >
              <option value="0">Tỉnh thành</option>

              {Array.isArray(this.state.province) &&
                this.state.province.map((val, index) => (
                  <option key={index} value={val.id}>
                    {val._name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-2 pt-4">
          <div className="form-group">
            <select
              id="inputState"
              onChange={this.changeDistrict}
              name="fDistrict"
              className="form-control w-100"
            >
              <option value="0">Quận huyện</option>
              {this.state.district.map((val, index) => (
                <option key={index} value={val.id}>
                  {val._prefix} {val._name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-2 pt-4">
          <div className="form-group">
            <select
              id="inputState"
              name="fWard"
              onChange={this.changeWard}
              className="form-control w-100"
            >
              <option value="0">Phường xã</option>
              {this.state.ward.map((val, index) => (
                <option key={index} value={val.id}>
                  {val._prefix} {val._name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-2 pt-4">
          <button
            type="button"
            onClick={this.isClickSearch}
            className="btn btn-warning btn-searching-custom btn-block font-weight-bold"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="col-md-2 pt-4">
          <button
            type="button"
            onClick={this.togglePopup}
            className="btn btn-warning btn-searching-custom btn-block font-weight-bold"
          >
            Bộ lọc
          </button>
        </div>
        {this.state.showPopUp && <this.popup />}
      </div>
    );
  }
}

export default ThanhTimKiem;
