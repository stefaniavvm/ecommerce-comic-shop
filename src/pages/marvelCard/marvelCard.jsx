import React from "react";


export default function marvelCard({ ...rest }) {
 
  const { comic, writer, year, penciler, image, issues } = rest;
  return (
    <div className="comic-card">
      
      <div className="comic-card__info">
        <div className="comic-card__comic">
          <span>comic:</span> {comic}
        </div>
        <div className="comic-card__writer">
          <span>writer:</span> {writer}
        </div>
        <p className="comic-card__penciler">
          <span>penciler:</span> {penciler}
        </p>
        <div className="comic-card__divider"></div>
        <p className="comic-card__year">
          <span>year:</span> {year}
        </p>

        <p className="comic-card__issues">
          <span>issues:</span> {issues}
        </p>
        <button className="comic-card__button">read</button>
      </div>
      <img src={image} alt="comics" className="comic-card__image"></img>
    </div>
  );
}
