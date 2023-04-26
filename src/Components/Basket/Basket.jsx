import React, { useContext } from "react";
import { BasketContext } from "./BasketContext";

function Basket() {
  const [basket, setBasket] = useContext(BasketContext);

  return (
    <div>
      <h2>Basket</h2>
      {basket.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => setBasket((prevBasket) => prevBasket.filter((basketItem) => basketItem.id !== item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Basket;
