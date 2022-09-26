import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Card from "../Card/Card";

export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);
  return (
    <>
      {videogames?.map((v) => {
        return (
          <Card
            key={v.id}
            id={v.id}
            name={v.name}
            image={v.image}
            release={v.release}
            rating={v.rating}
            platforms={v.platforms}
          />
        );
      })}
    </>
  );
}
