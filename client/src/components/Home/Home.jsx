import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";



export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  
  useEffect(() => {
    dispatch(getAllGames());
  }, []);
  return (
    <>
      <NavBar />
      {videogames?.map((v) => {
        return (
          <Card
            key={v.id}
            id={v.id}
            name={v.name}
            image={v.image}
            release={v.releaseDate}
            rating={v.rating}
            platforms={v.platforms}
          />
        );
      })}
    </>
  );
}
