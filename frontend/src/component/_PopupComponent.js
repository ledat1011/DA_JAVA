import React, { Component } from 'react'

export default class PopupComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="popup">
                <div className="popup_inner text-center">

                    {this.props.isPending == true ?
                        <div className="status -pending">Pending</div>
                        : <div className={"status " + (this.props.showAlert ? "-failure" : "-success")}>{this.props.showAlert ? "Failure" : "Success"}</div>
                    }
                    <div className={"alert alert-" + (this.props.showAlert ? "danger" : "success")}>{this.props.showAlert ? this.props.error : this.props.messege}</div>
                    <button
                        className="btn btn-success w-50 btn-positionDetailPayment"
                        onClick={this.closePopup}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        )
    }
}
