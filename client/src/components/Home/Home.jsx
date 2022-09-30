import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { validate as uuidValidate } from 'uuid';
import { Pagination } from "../Pagination/Pagination";
import "./home.css"

const originFilters = {
  All: x => true,
  Api: x => !uuidValidate(x.id),
  Db: x => uuidValidate(x.id)
};
const alphabetical = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0
}
const alphabeticalInverse = (a, b) => alphabetical(a, b) * -1
const byRatingAsc = (a, b) => a.rating - b.rating
const byRatingDesc = (a, b) => b.rating - a.rating
const orderBy = [alphabetical, alphabeticalInverse, byRatingAsc, byRatingDesc]

export default function Home() {
  const dispatch = useDispatch();
  const { videogames, filters, orders, videogamesPerPage, page } = useSelector(state => state);
  const genresFilters = videogame => videogame.genres?.some(g => g.name === filters.byGenre || !filters.byGenre);
  const pagination = (_, i) => videogamesPerPage * page <= i && i < videogamesPerPage * (page + 1)
  useEffect(() => {
    dispatch(getAllGames());
  }, []);
  return (
    <>
    <div className="home-background">

      <NavBar />
      <div className="grid-container" >
        {videogames &&
          videogames?.sort(orderBy[orders])
            .filter(originFilters[filters.byOrigin])
            .filter(genresFilters)
            .filter(pagination)
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
      </div>
      {!videogames.length && <h2>No game was found with that name</h2>}

      <Pagination />
    </div>
    </>
  );
}
