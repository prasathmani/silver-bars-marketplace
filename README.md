# SilverBars Marketplace

A JavaScript implementation of a simple trading board app allowing the registering of 'Buy' and 'Sell' orders and displaying them on a live order board.

## Usage

To use this app clone this repo.

```
git clone https://github.com/prasathmani/silver-bars-marketplace.git
```

Install the dependencies

```
$ npm install
```

To start the app

```
$ npm start
```

Then go to http://localhost:3000/ in the browser.
Fill in the fields and click place order to register an order (see screenshot below):

![SilverBars Interface](SilverBars-Marketplace.PNG)

## Design Decisions

This application was written in JavaScript and makes use of React and Node. Node could be useful in the future with respect to connecting the live order board up to an api as it is very good at handling multiple api requests and WebSockets could be used to handle quick data transfers.

I made use of the latest ES6 syntax including object spreading and arrow functions.

Some of the input validations are not necessary due to the form restrictions applied, however, they would be useful if this application was extended or adapted.

This app is structured with a Dashboard component which has children components: Header, AddOrderForm, CombinedOrders and TotalOrders. AddOrderForm has a child component FormErrors, CombinedOrders has Combined and TotalOrders has IndividualOrder.

This structure means that the addOrder function is passed down into the AddOrderForm component as a property and similarly handleDeleteOrder is passed down to TotalOrders and then to IndividualOrder.

## Further work

This application could be extended by providing user authentication to ensure each user can only delete their own orders.

## User stories

```
As a user,
So that I can determine the demand for silver bars,
I want to see a summary of orders.

As a user,
So that I can analyse the demand for silver bars,
I want to see order of the same price merged together.

As a user,
So that I can analyse the prices of silver bars,
I want to see buy orders grouped in descending price order and sell orders grouped in ascending price order.

As a user,
So that I can register an order (buy/sell),
I want to be able to upload an order to a live order board with the order quantity, price and type.

As a user,
So that I can remove an order,
I want to be be able to cancel a registered order.
```
