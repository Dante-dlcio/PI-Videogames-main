import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.videogame);

  useEffect(() => {
    dispatch(getGameById(id));
  }, []);
  return (
    <>
      <div>
        <Link to={`/home`}>
          <h1>{details.name}</h1>
          <h2>{details.release}</h2>
          <h2>{details.rating}</h2>
          {details.platforms?.map((p) => {
            <h2>{p}</h2>;
          })}
          <h2> {details.genres}</h2>
          <h2>{details.description}</h2>
        </Link>
      </div>
    </>
  );
}

