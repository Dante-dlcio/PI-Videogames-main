import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"


export default function Card({ id, name, image, release, rating, genres, platforms }) {
  return (
    <div className = 'card'>
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img className = 'image'  src={image? image:'https://i.pinimg.com/originals/eb/41/4d/eb414d8d94b4b2ba94ddaafcf10313f2.jpg'} alt={name} />
        {/* <h2>{release}</h2>
        <h2>{rating}</h2>
        {typeof platforms == 'string'? <h2>{platforms}</h2> : platforms?.map((p) => <h2>{p}</h2>)} */}
        {typeof genres == 'string'? <h2>{genres}</h2> : genres?.map((g) => <h2>{g.name}</h2>)}

        </Link>
    </div>
  );
}
