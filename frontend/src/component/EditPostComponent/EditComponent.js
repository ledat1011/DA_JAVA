import axios from "axios";
import React from "react";
import { Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "react-web-tabs/dist/react-web-tabs.css";
import { getPostById, getPostByIdV2 } from "../../_helper/index"
import { PATH } from "../../_type/filepath.type"
import { connect } from 'react-redux'
import { wardData, provinceData, districtData, convenientData as convenientDatas, typePostData, formpostData } from '../../_helper'
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";


function checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] === null || obj[key] === "" || obj[key] === 0) return false;
    }
    return true;
}
function getBase64(file) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
var falttenObj = (object) => {
    return Object.assign({}, ...function _flatten(o) {
        return [].concat(...Object.keys(o)
            .map(k => {
                return typeof o[k] === 'object' ?
                    _flatten(o[k]) :
                    ({ [k]: o[k] })
            }

            )
        );
    }(object))
}


class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            //location
            location: {
                fProvince: "",
                fDistrict: "",
                fWard: "",
                fStreet: "",
                fNumberAddress: "",
                tProvince: "",
                tDistrict: "",
                tWard: "",
                province: [],
                district: [],
                ward: [],
                tNumberAdd: "",
                tStreet: "",
            },
            // type post
            typePost: {
                fTypePost: "",
                fNamePost: "",
                fFormPost: "",
            },
            // parameter post
            parameter: {
                acreage: 0,
                roomNumber: 0,
                bathroomNuber: 0,
                kitchen: 0
            },
            // convenient post
            convenient: [],
            convenientData: [],
            //Rules
            rules: {
                smoke: { selectedRuleSmoke: 'allowed' },
                pet: { selectedRulePet: 'allowed', },
                party: { selectedRuleParty: "allowed" },
                addRule: ""
            },
            //handle image
            image: {
                avatar: { fileList: [] },
                room: { fileList: [] },
                previewVisible: false,
                previewImage: '',
                previewTitle: '',
            },
            //for custom
            // file: [],
            // isPreviewAvailable: false,

            //introduct
            introduction: "",
            // price
            price: {
                basicPrice: "",
                minPrice: "",
                maxPrice: ""
            },
            //other
            type: [],
            form: [],
            nextTab: 1, // check next tab
            selectTab: 1,// for next and back tab
            sumTab: 9, // total tab

            //ALERT
            showAlert: false,
            isPending: false,
            
            //Redirect
            isRedirect: false,
            linkRedirect: "",

            error: "",
            isClickUpdate: false
        };

        //get and set data to select bar province
        if (this.state.location.province.length === 0) {
            provinceData().then((data) => {
                this.setState({
                    location: {
                        ...this.state.location,
                        province: data
                    }
                })
            })
        }
        if (this.state.convenientData.length === 0) {
            convenientDatas().then((data) => {
                this.setState({
                    convenientData: data
                })
            })
        }
        if (this.state.type.length === 0) {
            typePostData().then(data => this.setState({ type: data }))
        }
        if (this.state.form.length === 0) {
            formpostData().then(data => this.setState({ form: data }))
        }


    }
    popUp = () => {
        return (
          <div className="popup">
            <div className="popup_inner text-center">
    
              {this.state.isPending == true ?
    
                <div className="status -pending">Pending</div>
                : <div className={"status " + (this.state.showAlert ? "-failure" : "-success")}>{this.state.showAlert ? "Failure" : "Success"}</div>
    
              }
              <div style={{top:"25px"}} className={"alert alert-" + (this.state.showAlert ? "danger" : "success")}>{this.state.showAlert ? this.state.error : "????ng b??i th??nh c??ng"}</div>
              <button
                className="btn btn-success w-50 btn-positionDetailPayment"
                onClick={this.closePopup}
              >
                ????ng
    </button>
            </div>
          </div>
        )
      }
      closePopup =()=>{
          this.setState({
              isRedirect:true,
              linkRedirect:"/preview/"+this.props.match.params.id
          })
      }
    //check onchange in basic infor post
    isChangeTypePost = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            typePost: {
                ...this.state.typePost,
                [name]: value
            }
        })
    }
    //check onchange in select PROVINCE bar and set data to district bar
    changeProvince = (e) => {
        var id = e.target.value; // get value 
        var name = e.target.name; // get name
        this.setState({
            location: {
                ...this.state.location,
                district: [],
                [name]: id,
                ward: [],
                tProvince: id ? e.target.options[e.target.selectedIndex].text : "",
                tWard: "",
                tDistrict: "",
            }

        })
        districtData(id).then(data => {
            this.setState({
                location: {
                    ...this.state.location,
                    district: data,
                }
            })
        })
    }


    //check onchange in select DISTRICT bar and set data to ward bar
    changeDistrict = (e) => {
        var idDistrict = e.target.value;
        this.setState({
            location: {
                ...this.state.location,
                ward: [],
                tWard: "",
                fDistrict: idDistrict,
                tDistrict: idDistrict ? e.target.options[e.target.selectedIndex].text + " - " : ""
            }
        })
        wardData(this.state.location.fProvince, idDistrict).then((data) => {
            this.setState({
                location: {
                    ...this.state.location,
                    ward: data
                }

            })
        })
    }
    //check onchange in select WARD bar and set data to DETAIL ADDRESS input
    changeWard = (e) => {
        this.setState({
            location: {
                ...this.state.location,
                fWard: e.target.value,
                tWard: e.target.value ? e.target.options[e.target.selectedIndex].text + " - " : ""
            }

        })
    }
    changeNumberAdd = (e) => {
        this.setState({
            location: {
                ...this.state.location,
                fNumberAddress: e.target.value,
                tNumberAdd: e.target.value ? "s??? " + e.target.value + " " : ""
            }
        })
    }
    changeStreet = (e) => {
        this.setState({
            location: {
                ...this.state.location,
                fStreet: e.target.value,
                tStreet: e.target.value ? "???????ng " + e.target.value + " - " : ""
            }
        })
    }

    //Change parameter
    ischangeParameter = (e) => {
        var value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value); // get value 
        var name = e.target.name; // get name
        this.setState({
            parameter: {
                ...this.state.parameter,
                [name]: value
            }
        })
    }
    //change Rule
    isChangeRule = (e) => {

        var name = e.target.name;
        var value = e.target.value
        var id = e.target.id;
        this.setState({
            rules: {
                ...this.state.rules,
                [id]: {
                    ...this.state.rules[id],
                    [name]: value,

                }
            }
        })

    }
    isChangeAddRule = (e) => {
        this.setState({
            rules: {
                ...this.state.rules,
                addRule: e
            }
        })
    }

    //hande image
    // ???nh b??a
    handleCancel = (e, name) => {
        this.setState({
            image: {
                ...this.state.image,
                previewVisible: false
            }
        })
    }

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            image: {
                ...this.state.image,
                previewImage: file.url || file.preview,
                previewVisible: true,
                previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),

            }
        });
    };
    handleChange = (e, name) => {
        this.setState({
            image: {
                ...this.state.image,
                [name]: {
                    ...this.state.image[name],
                    fileList: e.fileList
                }

            }
        });
    }
    convenientForm = (data) => {

        return (<div>
            <div className="title_box mt_12">
                <h4>{data.name}</h4>
            </div>
            <div className="row mt_12">
                {data.value.map(val =>
                    <div className="col-md-6 col-lg-4">
                        <div className="checkBox_custom pb_2">
                            <input type="checkbox" name="mycheckboxes"
                                checked={this.state.convenient.includes(val.id)}
                                onClick={(event) => this.isChangeConvenient(event, val.id)} />
                            <label htmlFor="1">{val.TenTienIch}</label>
                        </div>

                    </div>)}
            </div>
        </div>)
    }
    isChangeConvenient = (e, id) => {
        var checked = e.target.checked;
        if (checked) {
            this.setState({
                convenient: [...this.state.convenient, id]
            })
        } else {
            var arrConvenient = [...this.state.convenient].filter(c => c != id);
            this.setState({
                convenient: arrConvenient
            })
        }

    }
    isChangeIntroduction = (text) => {
        this.setState({
            introduction: text
        })
    }
    isChangePrice = (e) => {
        var value = e.target.value;
        var key = e.target.name;
        this.setState({
            price: {
                ...this.state.price,
                [key]: value
            }
        })

    }

    // handle next or back tab
    nextTab = (val) => {

        // click next 
        if (val > 0) {
            if (this.state.selectTab >= this.state.nextTab) {
                this.setState({
                    nextTab: (this.state.nextTab + val) % this.state.sumTab,
                    showAlert: false
                })
            }
        }
        this.setState({ selectTab: (this.state.selectTab + val) % this.state.sumTab })
    }
    onChangeTab = (number) => {
        this.setState({
            selectTab: parseFloat(number)
        })
    }
    componentDidMount() {
        if (Object.keys(this.state.data).length === 0) {
            getPostByIdV2(this.props.match.params.id).then(val => {
                this.setState({
                    data: val,
                    location: {
                        ...this.state.location,
                        fProvince: val.idProvince,
                        fDistrict: val.idDistrict,
                        fWard: val.idWard,
                        tProvince: val.province._name,
                        tDistrict: val.district._prefix + " " + val.district._name,
                        tWard: val.ward._prefix + " " + val.ward._name
                    },
                    image: {
                        ...this.state.image,
                        avatar: {
                            fileList: [{
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: PATH.image + val.avatar,
                            }]
                        },
                        room: {
                            fileList: val.images.map((value, index) => {
                                return {
                                    uid: index,
                                    name: 'image.png',
                                    status: 'done',
                                    url: PATH.image + value.img,
                                }
                            })
                        }
                    },
                    convenient: val.tieniches.map(value => value.id),
                    introduction: val.introduction,
                    parameter: {
                        ...this.state.parameter,
                        acreage: val.Dientich,
                        roomNumber: val.roomNumber,
                        bathroomNuber: val.bathroomNuber,
                        kitchen: val.kitchenNumber
                    },
                    price: {
                        ...this.state.price,
                        basicPrice: val.price,
                        minPrice: val.minPrice,
                        maxPrice: val.maxPrice
                    },
                    typePost: {
                        ...this.state.typePost,
                        fTypePost: val.typepost.id,
                        fFormPost: val.formpost.id,
                        fNamePost: val.title
                    },
                    rules: {
                        ...this.state.rules,
                        smoke: { selectedRuleSmoke: val.selectedRuleSmoke },
                        pet: { selectedRulePet: val.selectedRulePet, },
                        party: { selectedRuleParty: val.selectedRuleParty },
                        addRule: val.addRule
                    }
                })
                districtData(val.idProvince).then(data => {
                    this.setState({
                        location: {
                            ...this.state.location,
                            district: data,
                        }
                    })
                })
                wardData(val.idProvince, val.idDistrict).then((data) => {
                    this.setState({
                        location: {
                            ...this.state.location,
                            ward: data,
                        }

                    })
                })
            })
        }
        // this.props.checkSavePost();
    }
    isRemoveFile = (e, type) => {     
        if(e.url?.includes("http://localhost:4000/upload/")){
            var URL = e.url.replace("http://localhost:4000/upload/", "")
            axios.put("/api/post/deleteimg", { URL: URL, idPost: this.props.match.params.id, type: type })
        }
      
    }
    Upload = async (e) => {

        e.preventDefault();
        this.setState({
            isClickUpdate:true,
            isPending: true,
        })
        const formData = new FormData();
        this.state.image.avatar.fileList.forEach((val) => { !val.url && formData.append('avatar', val.originFileObj) });
        this.state.image.room.fileList.forEach(val => !val.url && formData.append('room', val.originFileObj));
        var data = falttenObj({ ...this.state, convenient: this.state.convenient.toString(), data: {}, image: [], location: { ...this.state.location, province: [], district: [], ward: [] }, type: [], form: [], convenientData: [] });
        formData.append("id", this.props.match.params.id);
        formData.append('image', JSON.stringify(this.state.image))
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        try {
           var update= await axios.put(`/api/post/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              
            })
            if(update.data.status){
                this.setState({
                    isPending: false,
                    
                  })
            }else{
               this.setState({
                   showAlert:true,
                   error: update.data.error
               })
            }
        } catch (e) {
            console.log(e);
            this.setState({
                showAlert:true,
                error: e
            })
        }
    }
    /** RENDER */
    render() {
        const { fProvince, fDistrict, fWard } = this.state.location;
        const { introduction } = this.state;
        const { maxPrice, minPrice, basicPrice } = this.state.price;
        const { acreage, bathroomNuber, kitchen, roomNumber } = this.state.parameter;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (

            <div>
                {this.state.isClickUpdate && <this.popUp/>}
                {this.state.isRedirect && <Redirect to={this.state.linkRedirect}/>}
                <Header></Header>
                <TabProvider
                    defaultTab={this.state.selectTab.toString()}
                    onChange={(tabId) => { this.onChangeTab(tabId) }}
                >
                    <TabList>
                        <div className="container">
                            <Tab tabFor="1" className="tabList-item">
                                Th??ng tin c?? b???n
              </Tab>
                            <Tab tabFor="2">?????a ??i???m</Tab>
                            <Tab tabFor="3">Th??ng s???</Tab>
                            <Tab tabFor="4">Ti???n nghi</Tab>
                            <Tab tabFor="5">N???i quy</Tab>
                            <Tab tabFor="6">Gi???i thi???u</Tab>
                            <Tab tabFor="7">H??nh ???nh</Tab>
                            <Tab tabFor="8">Gi?? cho thu??</Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId="1">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Ph??n lo???i ph??ng tr???</h3>
                                                <p>
                                                    Tr?????c h???t, h??y cho ch??ng t??i bi???t, ch??? ngh??? c???a b???n
                        </p>
                                            </div>
                                        </div>
                                        {/* Form nh???p li???u */}
                                        <div className="postType_box_content">
                                            {/* Ch???n lo???i ph??ng tr??? */}
                                            <div className="input_wrap mt_30">
                                                <label>Ph??ng tr??? c???a b???n l??:</label>
                                                <div>
                                                    <div className="form-group">
                                                        <select
                                                            onChange={this.isChangeTypePost}
                                                            name='fTypePost'
                                                            id="inputState"
                                                            value={this.state.typePost.fTypePost}
                                                            className={"form-control w-100" + (this.state.showAlert && !this.state.typePost.fTypePost ? ' has-error' : '')}
                                                        >
                                                            <option value="" >Ch???n lo???i ph??ng tr???</option>
                                                            {this.state.type.map(data =>
                                                                <option value={data.id}>{data.name}</option>
                                                            )}

                                                        </select>
                                                        {this.state.showAlert && !this.state.typePost.fTypePost &&
                                                            <div style={{ position: "absolute" }} className="help-block">Ch???n lo???i ph??ng tr???</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Ch???n lo???i ph??ng tr??? */}

                                            {/* T??n ph??ng tr??? */}
                                            <div className="input_wrap mt-4">
                                                <label>T??n ph??ng tr???:</label>
                                                <input
                                                    onChange={this.isChangeTypePost}
                                                    name='fNamePost'
                                                    value={this.state.typePost.fNamePost}
                                                    placeholder="T??n ph??ng tr???"
                                                    className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.typePost.fNamePost ? ' has-error' : '')}
                                                    aria-required="true"
                                                    aria-invalid="true"
                                                />
                                                {this.state.showAlert && !this.state.typePost.fNamePost &&
                                                    <div style={{ position: "absolute" }} className="help-block">Nh???p t??n ph??ng</div>}
                                            </div>
                                            {/* T??n ph??ng tr??? */}

                                            {/* H??nh th???c cho thu?? */}
                                            <div className="input_wrap mt-4">
                                                <label>H??nh th???c cho thu??:</label>
                                                <div>
                                                    <div className="form-group">
                                                        <select
                                                            onChange={this.isChangeTypePost}
                                                            name='fFormPost'
                                                            id="inputState"
                                                            value={this.state.typePost.fFormPost}
                                                            className={"form-control w-100" + (this.state.showAlert && !this.state.typePost.fFormPost ? ' has-error' : '')}
                                                        >
                                                            <option value=""> Ch???n lo???i h??nh th???c cho thu?? </option>
                                                            {this.state.form.map(data =>
                                                                <option value={data.id}>{data.name}</option>
                                                            )}


                                                        </select>
                                                        {this.state.showAlert && !this.state.typePost.fFormPost &&
                                                            <div style={{ position: "absolute" }} className="help-block">Ch???n lo???i h??nh th???c cho thu??</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* H??nh th???c cho thu?? */}
                                            <div className="row">
                                                <button onClick={() => (checkProperties(this.state.typePost) === false) ? this.setState({ showAlert: true }) : this.nextTab(1)} className={"btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri "}>
                                                    <span className="btn_text">Ti???p</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="2">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>V??? tr?? ph??ng tr???</h3>
                                            </div>
                                        </div>

                                        {/* Form nh???p */}
                                        <div className="postType_box_content">



                                            {/* T???nh/th??nh ph??? */}
                                            <div className="input_wrap mt-4">
                                                <label>T???nh/th??nh ph???:</label>
                                                <div>
                                                    <div className="form-group">
                                                        <select id="inputState"
                                                            name="fProvince"
                                                            value={fProvince}
                                                            onChange={this.changeProvince}
                                                            className={"form-control w-100" + (this.state.showAlert && !this.state.location.fProvince ? ' has-error' : '')}>
                                                            <option value="" >T???nh th??nh</option>
                                                            {this.state.location.province.map((val, index) => (
                                                                <option key={index} value={val.id}>{val._name}</option>
                                                            ))}

                                                        </select>
                                                        {this.state.showAlert && !this.state.location.fProvince &&
                                                            <div style={{ position: "absolute" }} className="help-block">Ch???n th??nh ph???</div>}

                                                    </div>
                                                </div>
                                            </div>
                                            {/* T???nh/th??nh ph??? */}

                                            {/* Qu???n huy???n */}
                                            <div className="input_wrap mt-4">
                                                <label>Qu???n huy???n:</label>
                                                <div>
                                                    <div className="form-group">
                                                        <select id="inputState"
                                                            value={fDistrict}
                                                            onChange={this.changeDistrict}
                                                            className={"form-control w-100" + (this.state.showAlert && !this.state.location.tDistrict ? ' has-error' : '')}>

                                                            <option value=""  >Qu???n huy???n</option>
                                                            {
                                                                this.state.location.district.map((val, index) => (
                                                                    <option key={index} value={val.id}>{val._prefix}  {val._name}</option>
                                                                ))}
                                                        </select>
                                                        {this.state.showAlert && !this.state.location.tDistrict &&
                                                            <div style={{ position: "absolute" }} className="help-block">Ch???n qu???n huy???n</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Qu???n huy???n */}

                                            {/* Ph?????ng x?? */}
                                            <div className="input_wrap mt-4">
                                                <label>Ph?????ng/x??:</label>
                                                <div>
                                                    <div className="form-group">
                                                        <select id="inputState"
                                                            value={fWard}
                                                            onChange={this.changeWard}
                                                            className={"form-control w-100" + (this.state.showAlert && !this.state.location.tWard ? ' has-error' : '')}>

                                                            <option value="" >Ph?????ng x??</option>
                                                            {
                                                                this.state.location.ward.map((val, index) => (
                                                                    <option key={index} value={val.id}>{val._prefix} {val._name}</option>
                                                                ))}
                                                        </select>
                                                        {this.state.showAlert && !this.state.location.tDistrict &&
                                                            <div style={{ position: "absolute" }} className="help-block">Ch???n ph?????ng x??
                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Ph?????ng x?? */}

                                            {/* ???????ng */}
                                            <div className="input_wrap mt-4">
                                                <label>???????ng:</label>
                                                <input
                                                    onChange={this.changeStreet}
                                                    name="Street"
                                                    placeholder="???????ng"
                                                    className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.location.tStreet ? ' has-error' : '')}

                                                />
                                                {this.state.showAlert && !this.state.location.tStreet &&
                                                    <div style={{ position: "absolute" }} className="help-block">Nh???p t??n ???????ng
                                </div>
                                                }
                                            </div>
                                            {/* ???????ng */}

                                            {/* ?????a ch??? */}
                                            <div className="input_wrap mt-4">
                                                <label>S??? nh??:</label>
                                                <input
                                                    onChange={this.changeNumberAdd}

                                                    placeholder="S??? nh??"
                                                    className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.location.tNumberAdd ? ' has-error' : '')}

                                                />
                                                {this.state.showAlert && !this.state.location.tNumberAdd &&
                                                    <div style={{ position: "absolute" }} className="help-block">Nh???p s??? nh??
                                </div>
                                                }
                                            </div>
                                            {/* ?????a ch??? */}

                                            {/* ?????a ch??? chi ti???t */}
                                            {/* Ch??? n??y s??? t???ng h???p nh???ng g?? ng?????i d??ng nh???p ??? tr??n 
                      th??nh 1 ?????a ch??? ?????y ????? 
                      v?? ????a l??n b???n ????? n???u c?? th??? */}
                                            <div className="input_wrap mt-4">
                                                <label>?????a ch??? chi ti???t:</label>
                                                <input
                                                    disabled={true}
                                                    name="addressDetail"
                                                    placeholder="?????a ch??? chi ti???t"
                                                    className="input-custom input_custom--err"
                                                    aria-required="true"
                                                    aria-invalid="true"
                                                    value={this.state.location.tNumberAdd + this.state.location.tStreet + this.state.location.tWard + this.state.location.tDistrict + (this.state.location.tProvince)}
                                                />
                                            </div>
                                            {/* ?????a ch??? chi ti???t */}
                                            {/* ??? ????y c?? th??? th??m c??i b???n ????? ????? th??? hi???n v??? tr?? ch??nh x??c */}
                                        </div>
                                        <div className="row mt-4">
                                            <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Quay l???i</span>
                                            </button>
                                            <button onClick={() => (checkProperties(this.state.location) === false) ? this.setState({ showAlert: true }) : this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Ti???p</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="3">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Chi ti???t ph??ng tr???</h3>
                                            </div>
                                        </div>
                                        {/* Form nh???p li???u */}
                                        <div className="postType_box_content">
                                            <div name="Space">
                                                <div className="title_box mt_12">
                                                    <h4>Kh??ng gian</h4>
                                                </div>

                                                <div className="input_wrap mt_12">
                                                    <label>Di???n t??ch:</label>
                                                    <input
                                                        name="acreage"
                                                        type="number"
                                                        min="0"
                                                        value={acreage}
                                                        onChange={this.ischangeParameter}
                                                        placeholder="Di???n t??ch"
                                                        className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.parameter.acreage ? ' has-error' : '')}

                                                    />
                                                    {this.state.showAlert && !this.state.parameter.acreage &&
                                                        <div style={{ position: "absolute" }} className="help-block">Nh???p di???n t??ch</div>}
                                                </div>

                                                <div className="input_wrap mt-4">
                                                    <label>S??? ph??ng:</label>
                                                    <input
                                                        onChange={this.ischangeParameter}
                                                        name="roomNumber"
                                                        type="number"
                                                        min="0"
                                                        max="5"
                                                        value={roomNumber}
                                                        placeholder="S??? ph??ng"
                                                        className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.parameter.roomNumber ? ' has-error' : '')}

                                                    />
                                                    {this.state.showAlert && !this.state.parameter.roomNumber &&
                                                        <div style={{ position: "absolute" }} className="help-block">Nh???p s??? ph??ng</div>}
                                                </div>
                                            </div>

                                            <div name="bathRoom">
                                                <div className="title_box mt-4">
                                                    <h4>Ph??ng t???m</h4>
                                                </div>

                                                <div className="input_wrap mt_12">
                                                    <label>S??? l?????ng ph??ng t???m:</label>
                                                    <input
                                                        value={bathroomNuber}
                                                        onChange={this.ischangeParameter}
                                                        name="bathroomNuber"
                                                        type="number"
                                                        min="0"
                                                        max="5"
                                                        placeholder="S??? l?????ng ph??ng t???m"
                                                        className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.parameter.bathroomNuber ? ' has-error' : '')}
                                                        aria-required="true"
                                                        aria-invalid="true"
                                                    />
                                                    {this.state.showAlert && !this.state.parameter.bathroomNuber &&
                                                        <div style={{ position: "absolute" }} className="help-block">Nh???p s??? ph??ng t???m</div>}
                                                </div>
                                            </div>

                                            <div name="kitchenRoom">
                                                <div className="title_box mt-4">
                                                    <h4>Ph??ng b???p</h4>
                                                </div>

                                                <div className="input_wrap ">
                                                    <label>S??? l?????ng ph??ng b???p:</label>
                                                    <input
                                                        onChange={this.ischangeParameter}
                                                        value={kitchen}
                                                        name="kitchen"
                                                        type="number"
                                                        min="0"
                                                        max="5"
                                                        placeholder="S??? l?????ng ph??ng b???p"
                                                        className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.parameter.kitchen ? ' has-error' : '')}

                                                    />
                                                    {this.state.showAlert && !this.state.parameter.kitchen &&
                                                        <div style={{ position: "absolute" }} className="help-block">Nh???p s??? ph??ng b???p</div>}
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                    <span className="btn_text">Quay l???i</span>
                                                </button>
                                                <button onClick={() => (checkProperties(this.state.parameter) === false) ? this.setState({ showAlert: true }) : this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                    <span className="btn_text">Ti???p</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel tabId="4">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Ti???n nghi</h3>
                                            </div>
                                        </div>

                                        {/* Form nh???p li???u */}
                                        <div className="postType_box_content">
                                            {this.state.convenientData.map(val => this.convenientForm({ name: val.TenLoaiTienIch, value: val.tieniches }))}
                                            {/* <this.convenientForm name={this.state.loaitientich} ></this.convenientForm> */}
                                        </div>
                                        <div className="row mt_12">
                                            <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Quay l???i</span>
                                            </button>
                                            <button onClick={() => this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Ti???p</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel tabId="5">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>N???i quy ph??ng tr???</h3>
                                            </div>
                                        </div>
                                        {/* Form nh???p li???u */}
                                        <div className="postType_box_content">
                                            <div name="smoking">
                                                <div className="title_box mt_12">
                                                    <h4>H??t thu???c</h4>
                                                </div>
                                                {/* <RadioCheck

                          label1="Cho ph??p"
                          label2="C?? ??i???u ki???n"
                          label3="Kh??ng cho ph??p"
                        /> */}
                                                <div className="container">
                                                    <form>
                                                        <div className="row mt_12">
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name='selectedRuleSmoke'
                                                                            type="radio"
                                                                            value="allowed"
                                                                            id="smoke"
                                                                            checked={this.state.rules.smoke.selectedRuleSmoke === "allowed"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name="selectedRuleSmoke"
                                                                            type="radio"
                                                                            value="conditions"
                                                                            id="smoke"
                                                                            checked={this.state.rules.smoke.selectedRuleSmoke === "conditions"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>C?? ??i???u ki???n</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            onClick={this.isChangeRule}
                                                                            type="radio"
                                                                            name="selectedRuleSmoke"
                                                                            value="notAllowed"
                                                                            id="smoke"
                                                                            checked={this.state.rules.smoke.selectedRuleSmoke == "notAllowed"}

                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Kh??ng cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div name="smoking">
                                                <div className="title_box mt_12">
                                                    <h4>Th?? c??ng</h4>
                                                </div>
                                                {/* <RadioCheck
                          label1="Cho ph??p"
                          label2="C?? ??i???u ki???n"
                          label3="Kh??ng cho ph??p"
                        
                        /> */}
                                                <div className="container">
                                                    <form>
                                                        <div className="row mt_12">
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name='selectedRulePet'
                                                                            type="radio"
                                                                            value="allowed"
                                                                            id="pet"
                                                                            checked={this.state.rules.pet.selectedRulePet === "allowed"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name="selectedRulePet"
                                                                            type="radio"
                                                                            value="conditions"
                                                                            id="pet"
                                                                            checked={this.state.rules.pet.selectedRulePet === "conditions"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>C?? ??i???u ki???n</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            onClick={this.isChangeRule}
                                                                            type="radio"
                                                                            name="selectedRulePet"
                                                                            value="notAllowed"
                                                                            id="pet"
                                                                            checked={this.state.rules.pet.selectedRulePet == "notAllowed"}

                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Kh??ng cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div name="smoking">
                                                <div className="title_box mt_12">
                                                    <h4>T??? ch???c ti???c</h4>
                                                </div>
                                                {/* <RadioCheck
                          label1="Cho ph??p"
                          label2="C?? ??i???u ki???n"
                          label3="Kh??ng cho ph??p"
                        /> */}
                                                <div className="container">
                                                    <form>
                                                        <div className="row mt_12">
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name='selectedRuleParty'
                                                                            type="radio"
                                                                            value="allowed"
                                                                            id="party"
                                                                            checked={this.state.rules.party.selectedRuleParty === "allowed"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            name="selectedRuleParty"
                                                                            type="radio"
                                                                            value="conditions"
                                                                            id="party"
                                                                            checked={this.state.rules.party.selectedRuleParty === "conditions"}
                                                                            onClick={this.isChangeRule}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>C?? ??i???u ki???n</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="radio col-md-6 col-lg-4">
                                                                <div className="radio-custom">
                                                                    <label>
                                                                        <input
                                                                            onClick={this.isChangeRule}
                                                                            type="radio"
                                                                            name="selectedRuleParty"
                                                                            value="notAllowed"
                                                                            id="party"
                                                                            checked={this.state.rules.party.selectedRuleParty == "notAllowed"}

                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <p>Kh??ng cho ph??p</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Thi???t l???p n???i quy ph??ng tr???</h3>
                                                <p>
                                                    Kh??ch h??ng s??? ???????c cung c???p n???i quy ph??ng v?? c???n ph???i
                                                    ?????ng ?? v???i n?? tr?????c khi thu?? ph??ng.
                        </p>
                                            </div>
                                            <div className="mt_12">
                                                <div className="checkboxRules">
                                                    <div className="check-custom">
                                                        <label>
                                                            <input type="checkbox" value="option1" />
                                                            <span className="checkmarkcb"></span>
                                                            <p>
                                                                Y??u c???u ch???ng minh th??/ c??n c?????c c??ng d??n/ h???
                                                                chi???u ho???c ?????t c???c t???i ch??? ngh???
                              </p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="checkboxRules">
                                                    <div className="check-custom">
                                                        <label>
                                                            <input type="checkbox" value="option2" />
                                                            <span className="checkmarkcb"></span>
                                                            <p>H???n ch??? l??m ???n sau 10 gi??? t???i</p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="checkboxRules">
                                                    <div className="check-custom">
                                                        <label>
                                                            <input type="checkbox" value="option3" />
                                                            <span className="checkmarkcb"></span>
                                                            <p>Kh??ng h??t thu???c ??? khu v???c chung</p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Form nh???p li???u */}
                                        <div className={"postType_box_content" + (this.state.showAlert && !this.state.rules.addRule ? ' has-error' : '')}>
                                            <div name="moreRules">
                                                <div className="title_box mt_12">
                                                    <h3>Th??m quy ?????nh m???i</h3>
                                                </div>
                                                {/* <CKTools /> */}
                                                <div className={"container mt_12"}>

                                                    <CKEditor
                                                        data={this.state.rules.addRule}
                                                        editor={ClassicEditor}
                                                        placeholder="Nh???p th??ng tin..."
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            this.isChangeAddRule(data)
                                                        }}
                                                    // onBlur={(event, editor) => {
                                                    //   console.log("Blur.", editor);
                                                    // }}
                                                    // onFocus={(event, editor) => {
                                                    //   console.log("Focus.", editor);
                                                    // }}

                                                    />
                                                    {this.state.showAlert && !this.state.rules.addRule &&
                                                        <div style={{ position: "absolute" }} className="help-block">Nh???p n???i quy</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt_12">
                                        <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                            <span className="btn_text">Quay l???i</span>
                                        </button>
                                        <button onClick={() => !this.state.rules.addRule ? this.setState({ showAlert: true }) : this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                            <span className="btn_text">Ti???p</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel tabId="6">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Th??ng tin gi???i thi???u</h3>
                                                {this.state.showAlert && !this.state.introduction &&
                                                    <div style={{ position: "absolute" }} className="help-block">Nh???p n???i quy</div>}
                                            </div>
                                        </div>

                                        {/* Form nh???p */}
                                        <div className="postType_box_content">

                                            <div name="moreRules">
                                                <CKEditor
                                                    data={introduction}
                                                    editor={ClassicEditor}
                                                    placeholder="Nh???p th??ng tin..."
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        this.isChangeIntroduction(data)
                                                    }}
                                                // onBlur={(event, editor) => {
                                                //   console.log("Blur.", editor);
                                                // }}
                                                // onFocus={(event, editor) => {
                                                //   console.log("Focus.", editor);
                                                // }}

                                                />
                                            </div>

                                        </div>
                                        <div className="row mt_12">
                                            <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Quay l???i</span>
                                            </button>
                                            <button onClick={() => !this.state.introduction ? this.setState({ showAlert: true }) : this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Ti???p</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel tabId="7">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>H??nh ???nh ch??? ngh???</h3>
                                            </div>
                                        </div>

                                        {/* Form nh???p  */}
                                        <div className="postType_box_content">
                                            <div name="hinhAnh">
                                                <div name="anhBia">
                                                    <div className="title_box mt_12">
                                                        <h4>???nh b??a</h4>
                                                    </div>
                                                    <Upload
                                                        defaultFileList={this.getDataImage}
                                                        // data={this.getDataImage}
                                                        accept="image/*"
                                                        action="/api/post/upload"
                                                        listType="picture-card"
                                                        onRemove={(e) => this.isRemoveFile(e, "avatar")}
                                                        fileList={this.state.image.avatar.fileList}
                                                        onPreview={(e) => this.handlePreview(e, "avatar")}
                                                        onChange={(e) => this.handleChange(e, "avatar")}

                                                    >
                                                        {this.state.image.avatar.fileList.length >= 1 ? null : uploadButton}
                                                    </Upload>
                                                    <Modal
                                                        visible={this.state.image.previewVisible}
                                                        title={this.state.image.previewTitle}
                                                        footer={null}
                                                        onCancel={this.handleCancel}
                                                    >
                                                        <img alt="example" style={{ width: '100%' }} src={this.state.image.previewImage} />
                                                    </Modal>
                                                </div>
                                                <div name="anhPhong">
                                                    <div className="title_box mt_12">
                                                        <h4>???nh ph??ng tr???</h4>
                                                    </div>
                                                    <Upload
                                                        multiple={true}
                                                        data={this.getDataImage}
                                                        accept="image/*"
                                                        action="/api/post/upload"
                                                        listType="picture-card"
                                                        onRemove={(e) => this.isRemoveFile(e, "room")}
                                                        fileList={this.state.image.room.fileList}
                                                        onPreview={this.handlePreview}
                                                        onChange={(e) => this.handleChange(e, "room")}

                                                    >
                                                        {this.state.image.room.fileList.length >= 8 ? null : uploadButton}
                                                    </Upload>
                                                    {/* <Modal
                            visible={this.state.image.room.previewVisible}
                            title={this.state.image.room.previewTitle}
                            footer={null}
                            onCancel={(e)=>this.handleCancel(e,"room")}
                          >
                            <img alt="example" style={{ width: '100%' }} src={this.state.image.room.previewImage} />
                          </Modal> */}
                                                    {/* <div className="upload-section">

                            <Dropzone onDrop={this.onDrop}>
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'drop-zone' })} >
                                  <input {...getInputProps()} multiple={true} />
                                  <p>Up load</p>
                                  {this.state.file && (
                                    <div>
                                      <strong>Selected file:</strong> {this.state.file.name}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Dropzone>
                            {this.state.file ? (
                              this.state.isPreviewAvailable ? (
                                <div className="image-preview">
                                  {this.state.file.map((val) =>
                                    <div style={{ display: "inline-block" }}>
                                      <button type="button" onClick={() => this.deleteimgae(val.id)}  >delete</button>
                                      <img style={{ display: "inline-block" }} className="preview-image" width="80px" height="80px" src={val.src} alt="Preview" />
                                    </div>
                                  )}
                                </div>) : (
                                  <div className="preview-message">
                                    <p>No preview available for this file</p>
                                  </div>)
                            ) : (
                                <div className="preview-message">
                                  <p>Image preview will be shown here after selection</p>
                                </div>
                              )}
                          </div> */}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt_12">
                                            <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Quay l???i</span>
                                            </button>
                                            <button onClick={() => this.nextTab(1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Ti???p</span>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel tabId="8">
                        <div className="container" style={{ marginTop: "80px" }}>
                            <div className="row">
                                {/* Nh???p th??ng tin */}
                                <div className="col-md-8">
                                    <div className="postType_box mb_30">
                                        <div className="postType_box_header">
                                            <div className="title_box">
                                                <h3>Thi???t l???p gi?? v?? ch??nh s??ch</h3>
                                            </div>
                                        </div>

                                        {/* Form nh???p */}
                                        <div className="postType_box_content">
                                            <div name="Price">
                                                <div className="price">
                                                    <div className="title_box mt_12">
                                                        <h4>Ch??nh s??ch gi??</h4>
                                                    </div>
                                                    <div className="input_wrap mt_12">
                                                        <label>Gi?? c?? b???n:</label>
                                                        <input
                                                            value={basicPrice}
                                                            name="basicPrice"
                                                            type="number"
                                                            min="0"
                                                            placeholder="Gi?? c?? b???n"
                                                            className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.price.basicPrice ? ' has-error' : '')}
                                                            onChange={this.isChangePrice}
                                                        />
                                                        {this.state.showAlert && !this.state.price.basicPrice &&
                                                            <div style={{ position: "absolute" }} className="help-block">Gi?? c?? b???n</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div name="GiaBienDong">
                                                <div className="price">
                                                    <div className="title_box mt-4">
                                                        <h4>M???c gi?? bi???n ?????ng</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 input_wrap mt_12">
                                                            <label>Gi?? t???i thi???u:</label>
                                                            <input
                                                                value={minPrice}
                                                                name="minPrice"
                                                                type="number"
                                                                min="0"
                                                                onChange={this.isChangePrice}
                                                                placeholder="Gi?? c?? b???n"
                                                                className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.price.minPrice ? ' has-error' : '')}
                                                                aria-required="true"
                                                                aria-invalid="true"
                                                            />
                                                            {this.state.showAlert && !this.state.price.minPrice &&
                                                                <div style={{ position: "absolute" }} className="help-block">Gi?? t???i thi???u</div>}
                                                        </div>
                                                        <div className="col-md-6 input_wrap mt_12">
                                                            <label>Gi?? t???i ??a:</label>
                                                            <input
                                                                value={maxPrice}
                                                                name="maxPrice"
                                                                type="number"
                                                                min="0"
                                                                placeholder="Gi?? c?? b???n"
                                                                className={"input-custom input_custom--err" + (this.state.showAlert && !this.state.price.maxPrice ? ' has-error' : '')}
                                                                onChange={this.isChangePrice}
                                                            />
                                                            {this.state.showAlert && !this.state.price.maxPrice &&
                                                                <div style={{ position: "absolute" }} className="help-block">Gi?? t???i ??a</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <button onClick={() => this.nextTab(-1)} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">Quay l???i</span>
                                            </button>
                                            <button onClick={(event) => checkProperties(this.state.price) ? this.Upload(event) : this.setState({ showAlert: true })} className="col-md-5 btn btn_grad_pri px_6 pb_6 mb_12 btn_sm btn_half bold rounded btn_shadow_pri">
                                                <span className="btn_text">C???p nh???t</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Nh???p th??ng tin */}

                                {/* N???i quy ????ng b??i */}
                                <div className="col-md-4">
                                    <div className="pb_20">
                                        <div className="guild_wrap">
                                            <h3>T???i sao c???n ph??n lo???i ph??ng tr????</h3>
                                            <p>
                                                T???i Luxstay, ch??ng t??i ph??n ch??? ngh??? th??nh 29 lo???i, vi???c
                                                n??y gi??p cho kh??ch h??ng l???a ch???n n??i ??? d??? d??ng h??n. ?????ng
                                                th???i Luxstay c??ng c?? ??i???u ki???n h??? tr??? b???n t???t h??n.
                      </p>
                                        </div>

                                        <div className="guild_wrap mt_12">
                                            <h3>
                                                G???i ?? ?????t t??n ch??? ngh??? ????? thu h??t kh??ch h??ng v?? t???i ??u
                                                t??m ki???m tr??n Google, Luxstay
                      </h3>
                                            <p>
                                                - M???t c??i t??n thu h??t th?????ng bao g???m: T??n nh?? + T??n
                                                ph??ng + ?????c ??i???m n???i b???t t???i ch??? ngh??? + ?????a ??i???m du l???ch
                                                - V?? d??? t??n ch??? ngh??? t???t: LuxHome - Ph??ng hoa h???ng c??
                                                m??y chi???u, 5p t???i h??? G????m - Kh??ng n??n ?????t t??n: Ph??ng hoa
                                                h???ng t???i LuxHome
                      </p>
                                        </div>
                                    </div>
                                </div>
                                {/* N???i quy ????ng b??i */}
                            </div>
                        </div>
                    </TabPanel>
                </TabProvider>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.Account
    }
}

export default connect(mapStateToProps)(EditPost)