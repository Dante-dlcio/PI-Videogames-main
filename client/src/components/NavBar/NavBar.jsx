import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar';
import {
    getAllGames,
    getGenres,
    setGenreFilter,
    setOriginFilter
} from '../../redux/actions';


export default function NavBar() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getAllGames())
    }, []);
    useEffect(() => {
        dispatch(getGenres())
    }, []);

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getAllGames());
    }
    function handleOriginOnChange(e) {
        dispatch(setOriginFilter(e.target.options[e.target.options.selectedIndex].value))
    }

    function handleGenreOnChange(e) {
        dispatch(setGenreFilter(e.target.options[e.target.options.selectedIndex].value))
    }


    return (
        <>
            <SearchBar />
            <select defaultValue = '' onChange={handleGenreOnChange}>
                <option value = ''>genre</option>
                {
                    genres?.map(g => (
                        <option value={g.name}>
                            {g.name}
                        </option>
                    ))
                }
            </select>
            <select defaultValue="All" onChange={handleOriginOnChange}>
                <option value="All">All</option>
                <option value="Api">RAWG</option>
                <option value="Db">Data Base</option>
            </select>
            <select >
                <option>A-Z</option>
                <option>Z-A</option>
            </select>
            <select>
                <option>Rating Asc</option>
                <option>Rating Desc</option>
            </select>
            <Link to={'/createGame'} />

        </>

    )
}
