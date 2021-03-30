import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import React, { Component } from 'react'
import { postHelper } from '../_helper';
import { PATH } from '../_type';
import { Link } from "react-router-dom"
import L from 'leaflet';
import markerRed from "../image/pngwing.com.png"

const duckIcon = new L.Icon({
    iconUrl: markerRed,
    iconRetinaUrl: markerRed,
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(16, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 45),
    className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

const marker = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(16, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(32, 32),
    className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});



export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marker: [{ address: "", imgage: "", price: "", local: [10.799415399999999, 106.7116815], id: "" }],
            suggesstPost: [],
            lat: "",
            lng: ""
        }
    }
    componentDidMount() {
        var localtion = navigator.geolocation;
        if (localtion) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log("lat", position.coords.latitude);
                // console.log("lng", position.coords.longitude)
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                // postHelper.suggesst({ lng: position.coords.longitude, lat: position.coords.latitude }).then(data => {
                //     this.setState({
                //         suggesstPost: data,
                //         marker: data.map(c => { return { address: c.DiaChi, image: c.avatar, price: c.price, local: [c.lat, c.lng], id: c.id, title: c.title } })
                //     })
                // })
            })
        }
        else {
            this.setState({
                lat: 10.799415399999999,
                lng: 106.7116815
            })
        }
        postHelper.getall().then(data=>{
            if (data.status) {
                this.setState({
                    suggesstPost: data.data,
                    marker: data.data.map(c => { return { address: c.DiaChi, image: c.avatar, price: c.price, local: [c.lat, c.lng], id: c.id, title: c.title } })
                })
            }
               
        })
    }

    render() {
        return (
            <MapContainer center={[this.props.center?.lat || 10.799415399999999, this.props.center?.lng || 106.7116815]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.marker.map((positon,index,array) => <Marker

                   icon={positon.id== (this.props.idPost ||0)? duckIcon:marker}
                    position={positon.local[0] == null? array[0].local.map(c=> c+0.01):positon.local}
                   >
                    <Popup>
                        <Link style={{textDecoration:"none"}} to={"/chitiet/" + positon.id} className="checkup_header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="checkup_title">
                                        {positon.title}
                                    </h4>
                                    <div className="checkup_add">
                                        <i
                                            className="fa fa-map-marker"
                                            aria-hidden="true"
                                        />
                                        <span className="address-thanhtoan">
                                            {positon.address}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img width={150}
                                        height={150}
                                        src={PATH.image + positon.image}
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        </Link>
                    </Popup>
                </Marker>)}
               

            </MapContainer>
        )
    }
}
