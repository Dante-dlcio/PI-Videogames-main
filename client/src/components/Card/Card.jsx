import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, release, rating, platforms }) {
  return (
    <div>
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img src={image} alt="img not found" />
        <h2>{release}</h2>
        <h2>{rating}</h2>
        {platforms?.map((p) => {
          <h2>{p}</h2>;
        })}
      </Link>
    </div>
  );
}
