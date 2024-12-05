// src/components/Auth/Confirm.js
import React, { Component } from "react";
import { confirmEmail } from "../../services/apiService";

class Confirm extends Component {
  constructor(props) {
    super(props);
    const { email } = this.props.location.state || {};
    this.state = {
      code: "",
      message: "",
      email: email || "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, code } = this.state;
    this.setState({ message: "" });

    try {
      const response = await confirmEmail({ email, code });
      console.log("API Response:", response);
      this.setState({ message: "Email confirmed successfully. Redirecting to Home..." });
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error during email confirmation:", error);
      this.setState({ message: error.message });
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ code: value });
  };

  render() {
    const { code, message } = this.state;

    return (
      <div className="confirm-container">
        <h1 className="confirm-title">Confirm Email</h1>
        <form className="confirm-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={this.handleChange}
              required
            />
          </div>
          <button className="submit-button" type="submit">Confirm</button>
        </form>
        <p className="message">{message}</p>
      </div>
    );
  }
}

export default Confirm;
