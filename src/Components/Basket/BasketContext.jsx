import React, { useState, createContext } from "react";

export const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  return (
    <BasketContext.Provider value={[basket, setBasket]}>
      {children}
    </BasketContext.Provider>
  );
}