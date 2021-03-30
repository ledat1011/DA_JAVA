import React from 'react'

export default class Test extends React.Component {
    constructor() {
        super();

        this.state = {
            isPending: false,
            showAlert: false
        }
    }

    closePopup = () => {
        this.setState({
            isPending: true
        })
        setTimeout(() => {
            this.setState({
                isPending: false,
                showAlert: true
            })
        }, 2000);
    }

    render() {
        console.log(this.state.isPending);
        return (
                <div>

                <div className="status -pending">Pending</div>
                <div className="status -success">Success</div>
                <div className="status -failure">Failure</div>
              </div>

           
        );
    }
}

