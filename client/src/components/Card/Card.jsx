import React from "react";
import { Link } from "react-router-dom";
import cardstyle from '../componentsCSS/Card.module.css'

export default function Card({ id, name, image, release, rating, platforms }) {
  return (
    <div className={cardstyle.dis}>
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img src={image? image:'https://i.pinimg.com/originals/eb/41/4d/eb414d8d94b4b2ba94ddaafcf10313f2.jpg'} alt={name} />
        <h2>{release}</h2>
        <h2>{rating}</h2>
        {typeof platforms == 'string'? <h2>{platforms}</h2> : platforms?.map((p) => <h2>{p}</h2>)}
      </Link>
    </div>
  );
}
