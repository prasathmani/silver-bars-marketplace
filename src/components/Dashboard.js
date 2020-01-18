import React from "react";
import Header from "./Header";
import AddOrderForm from "./AddOrderForm";
import TotalOrders from "./TotalOrders";
import CombinedOrders from "./CombinedOrders";

class Dashboard extends React.Component {
  state = {
    buyOrders: [],
    sellOrders: []
  };

  addOrder = order => {
    if (order.type === "BUY") {
      this.setState(prevState => ({
        buyOrders: prevState.buyOrders.concat(order)
      }));
    } else if (order.type === "SELL") {
      this.setState(prevState => ({
        sellOrders: prevState.sellOrders.concat(order)
      }));
    }
  };

  handleDeleteOrder = orderToRemove => {
    if (orderToRemove[1] === "BUY") {
      this.setState(prevState => ({
        buyOrders: prevState.buyOrders.filter(
          order => orderToRemove[0] !== order.orderId
        )
      }));
    } else if (orderToRemove[1] === "SELL") {
      this.setState(prevState => ({
        sellOrders: prevState.sellOrders.filter(
          order => orderToRemove[0] !== order.orderId
        )
      }));
    }
  };

  render() {
    return (
      <div className="main">
        <Header />
        <div className="container">
          <AddOrderForm onSubmit={this.addOrder} />
          <div className="row">
            <div className="card column">
              <p className="underline">Live Order Sells</p>
              <CombinedOrders orders={this.state.sellOrders} />
              <br />
              <p className="underline">Live Order Buys</p>
              <CombinedOrders orders={this.state.buyOrders} />
              <br />
            </div>
            <div className="card column">
              <TotalOrders
                buyOrders={this.state.buyOrders}
                sellOrders={this.state.sellOrders}
                handleDeleteOrder={this.handleDeleteOrder}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
