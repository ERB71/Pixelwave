import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "./BasketContext";

function BasketIcon() {
  const [basket] = useContext(BasketContext);
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Link to="/basket"></Link>
    </div>
    )
}