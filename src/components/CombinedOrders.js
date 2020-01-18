import React from "react";
import Combined from "./Combined";
function combiningOrders(arrayOfObjects) {
  const orderPriceQuantObject = {};
  const ordered = {};
  for (let i = 0; i < arrayOfObjects.orders.length; i++) {
    if (!orderPriceQuantObject[arrayOfObjects.orders[i].price]) {
      orderPriceQuantObject[arrayOfObjects.orders[i].price] =
        arrayOfObjects.orders[i].quantity;
    } else {
      orderPriceQuantObject[arrayOfObjects.orders[i].price] +=
        arrayOfObjects.orders[i].quantity;
    }
  }

  Object.keys(orderPriceQuantObject)
    .sort()
    .forEach(function(key) {
      ordered[key] = orderPriceQuantObject[key];
    });
  return Object.entries(ordered);
}

const CombinedOrders = props => {
  return (
    <div>
      {props.orders.length >= 1 && props.orders[0].type === "BUY"
        ? combiningOrders(props)
            .reverse()
            .map(order => (
              <Combined key={order[0]} quantity={order[1]} price={order[0]} />
            ))
        : combiningOrders(props).map(order => (
            <Combined key={order[0]} quantity={order[1]} price={order[0]} />
          ))}
    </div>
  );
};

export default CombinedOrders;
