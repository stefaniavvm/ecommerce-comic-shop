import React, { useState, useEffect } from "react";
import axios from "axios";
import CardsMarvel from "../marvelCard/marvelCard";

const Marvelcomics = () => {
  const baseURL = `http://localhost:3000`;
  const endpoint = "/comics";
  const [marvelcomics, setMarvelComics] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL + endpoint)
      .then((response) => setMarvelComics(response.data));
  });
  return (
    <div className="marvel-list">
      {marvelcomics.map((comicsMarvel) => {
        return (
          <CardsMarvel
            key={comicsMarvel.id}
            id={comicsMarvel.id}
            comic={comicsMarvel.comic}
            writer={comicsMarvel.writer}
            year={comicsMarvel.year}
            image={comicsMarvel.image}
            penciler={comicsMarvel.penciler}
            issues={comicsMarvel.issues}
          />
        );
      })}
    </div>
  );
};

export default Marvelcomics;
