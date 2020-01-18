import React from "react";
import uuidv1 from "uuid/v1";
import FormErrors from "./FormErrors";

class AddOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: uuidv1(),
      userId: "",
      quantity: "",
      type: "BUY",
      price: "",
      noErrors: false,
      formErrors: {
        parameters: "",
        positiveNumber: "",
        stringCheck: "",
        typeCheck: ""
      }
    };
  }

  onUserIdChange = e => {
    const userId = e.target.value;
    this.setState(() => ({ userId }));
  };
  onQuantityChange = e => {
    let quantity = String(e.target.value);
    if (!quantity || quantity.match(/^\d{1,}(\.\d{0,8})?$/)) {
      this.setState(() => ({ quantity }));
    }
  };

  onPriceChange = e => {
    const price = e.target.value;
    if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ price }));
    }
  };
  onTypeChange = e => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  };

  validateInputs = async () => {
    await this.typeCheck();
    await this.parametersCheck();
    await this.positiveNumber();
    await this.stringCheck();
    this.errorsChecker();
  };

  parametersCheck = () => {
    if (
      !this.state.userId ||
      !this.state.price ||
      !this.state.quantity ||
      !this.state.type
    ) {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          parameters: "Please fill in all fields of the form. "
        }
      }));
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          parameters: ""
        }
      }));
    }
  };

  positiveNumber = () => {
    if (
      parseFloat(this.state.price, 10) <= 0 ||
      parseFloat(this.state.quantity, 10) <= 0
    ) {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          positiveNumber:
            "Please ensure both quantity and price are positive numbers. "
        }
      }));
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          positiveNumber: ""
        }
      }));
    }
  };

  stringCheck = () => {
    if (
      typeof this.state.userId !== "string" ||
      typeof this.state.type !== "string"
    ) {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          stringCheck: "Please ensure both userid and order type are strings. "
        }
      }));
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          stringCheck: ""
        }
      }));
    }
  };

  typeCheck = () => {
    if (this.state.type !== "BUY" && this.state.type !== "SELL") {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          typeCheck: 'Please ensure type is either "BUY" or "SELL". '
        }
      }));
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          typeCheck: ""
        }
      }));
    }
  };

  errorsChecker = () => {
    this.noErrors(
      Object.keys(this.state.formErrors).every(
        key => this.state.formErrors[key] === ""
      )
    );
  };

  noErrors = noErrors => {
    this.setState(() => ({ noErrors }));
  };

  onSubmit = async e => {
    e.preventDefault();
    const orderId = uuidv1();
    this.setState(() => ({ orderId }));
    await this.validateInputs();
    if (this.state.noErrors === true) {
      this.props.onSubmit({
        orderId: this.state.orderId,
        userId: this.state.userId,
        price: parseFloat(this.state.price, 10).toFixed(2),
        type: this.state.type,
        quantity: parseFloat(this.state.quantity, 10)
      });
    }
  };
  render() {
    return (
      <>
        <FormErrors formErrors={this.state.formErrors} />
        <form onSubmit={this.onSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="userId">User id: </label>
            <input
              name="userId"
              type="text"
              placeholder="UserId"
              className="form-control"
              autoFocus
              value={this.state.userId}
              onChange={this.onUserIdChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity"> Quantity (kg): </label>
            <input
              name="quantity"
              type="text"
              className="form-control"
              placeholder="Quantity (kg)"
              value={this.state.quantity}
              onChange={this.onQuantityChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price"> Price (£/kg): </label>
            <input
              name="price"
              type="text"
              className="form-control"
              placeholder="Price £/kg"
              value={this.state.price}
              onChange={this.onPriceChange}
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              className="form-control"
              onChange={this.onTypeChange}
              value={this.state.type}
            >
              <option value="SELL">SELL</option>
              <option value="BUY">BUY</option>
            </select>
          </div>
          <div className="form-group">
            <p></p>
            <button className="btn btn-submit">Place Order</button>
          </div>
        </form>
      </>
    );
  }
}

export default AddOrderForm;
