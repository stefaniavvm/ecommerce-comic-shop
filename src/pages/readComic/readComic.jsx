import React from 'react'
import {useParams} from "react-router-dom";
//import {marvelComics} from "../MarvelComics/MarvelComics";


function readComic() {
  const params = useParams;
//const comics = marvelComics();
  
  return (
    <div>
        {params.id}
    </div>
  )
}

export default readComic