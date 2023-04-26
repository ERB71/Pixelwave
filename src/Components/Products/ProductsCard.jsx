import React, { useContext } from "react";
import { BasketContext } from "./../Basket/BasketContext";

function ProductCard({ product }) {
  const [basket, setBasket] = useContext(BasketContext);

  function handleAddToBasket() {
    const existingItemIndex = basket.findIndex((item) => item.id === product.id);
    if (existingItemIndex >= 0) {
      // Item already exists in basket, so update its quantity
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      // Item does not exist in basket, so add it with a quantity of 1
      setBasket((prevBasket) => [...prevBasket, { ...product, quantity: 1 }]);
    }
  }

  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToBasket}>Add to basket</button>
    </div>
  );
}

export default ProductCard;
