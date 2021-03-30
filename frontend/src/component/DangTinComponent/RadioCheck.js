import React from "react";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

export default class RadioCheck extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "option1",
    };
    this.radioChange = this.radioChange.bind(this);
  }

  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="row mt_12">
            <div className="radio col-md-6 col-lg-4">
              <div className="radio-custom">
                <label>
                  <input
                    type="radio"
                    value="option1"
                    checked={this.state.selectedOption === "option1"}
                    onChange={this.radioChange}
                  />
                  <span className="checkmark"></span>
                  <p>{this.props.label1}</p>
                </label>
              </div>
            </div>
            <div className="radio col-md-6 col-lg-4">
              <div className="radio-custom">
                <label>
                  <input
                    type="radio"
                    value="option2"
                    checked={this.state.selectedOption === "option2"}
                    onChange={this.radioChange}
                  />
                  <span className="checkmark"></span>
                  <p>{this.props.label2}</p>
                </label>
              </div>
            </div>
            <div className="radio col-md-6 col-lg-4">
              <div className="radio-custom">
                <label>
                  <input
                    type="radio"
                    value="option3"
                    checked={this.state.selectedOption === "option3"}
                    onChange={this.radioChange}
                  />
                  <span className="checkmark"></span>
                  <p>{this.props.label3}</p>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
