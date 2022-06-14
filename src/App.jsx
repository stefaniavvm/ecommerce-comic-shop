import React from "react";
import NavBar from "./components/NavBar/NavBar";

import Footer from "./components/footer/footer";
import Marvelcomics from "./pages/MarvelComics/MarvelComics";

import ShopCards from "./components/carShop/carShop";

import ReadComic from "./pages/readComic/readComic";
import Errorpage from "./pages/Errorpage/Errorpage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";


function App() {
  return (
    <Router>
      <NavBar />
     
      <div className="App">
        <Routes>
          
          <Route path="/marvelComics" element={<Marvelcomics/>}></Route>
          <Route path="/marvelComics/:id" element={<ReadComic/>}></Route>
          
          <Route path="/shop" element={<ShopCards />}></Route>
          <Route path="*" element={<Errorpage/>}></Route>
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
