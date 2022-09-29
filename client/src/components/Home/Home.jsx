import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { validate as uuidValidate } from 'uuid';

const originFilters = {
  All: x => true,
  Api: x => !uuidValidate(x.id),
  Db: x => uuidValidate(x.id)
};


export default function Home() {
  const dispatch = useDispatch();
  const { videogames, filters } = useSelector(state => state);
  const genresFilters = videogame => videogame.genres?.some(g => g.name == filters.byGenre || !filters.byGenre);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);
  console.log(videogames[0])
  return (
    <>
      <NavBar />
      {
        videogames &&
        videogames?.filter(originFilters[filters.byOrigin])
          .filter(genresFilters)
          .map((v) => {
            return (
              <Card
                key={v.id}
                id={v.id}
                name={v.name}
                image={v.image}
                release={v.releaseDate}
                rating={v.rating}
                genres={v.genres}
                platforms={v.platforms}
              />
            );
          })
      }
      {!videogames.length && <h2>No game was found with that name</h2>}
    </>
  );
}
