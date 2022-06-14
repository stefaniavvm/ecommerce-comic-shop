import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopCards from "../ShopCards/ShopCards";

const Shop = () => {
  const baseURL = `http://localhost:3000`;
  const endpoint = "/products";

  const [shopcar, setShopcar] = useState([]);
  useEffect(() => {
    axios.get(baseURL + endpoint).then((response) => setShopcar(response.data));
  });
  return (
    <div className="shopCar">
      {shopcar.map((shopCar) => {
        return (
          <ShopCards
            key={shopCar.id}
            id={shopCar.id}
            article={shopCar.article}
            Stock={shopCar.Stock}
            Image={shopCar.Image}
            price={shopCar.price}
          />
        );
      })}
    </div>
  );
};

export default Shop;
