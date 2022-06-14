import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="menu">
      
      <Link to="/marvelComics" className="menu__link menu__link--marvel">
        comics
      </Link>

      <Link to="/shop" className="menu__link">
        shop
      </Link>
      
      

      <div>
        
      </div>
    </nav>
  );
};

export default Navbar;
