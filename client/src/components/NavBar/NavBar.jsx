import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux' 
import SearchBar from '../SearchBar/SearchBar';
import {
     getAllGames,
     getGenres
    } from '../../redux/actions';


export default function NavBar(){
    const dispatch = useDispatch();
    const genres = useSelector((state)=> state.genres)

    useEffect(() =>{
        dispatch(getAllGames())
    },[]);
    useEffect(()=>{
        dispatch(getGenres())
    },[]);
    
    function handleOnClick(e){
        e.preventDefault();
        dispatch(getAllGames());
    }


    return(
        <>
            <SearchBar/> 
            <select>
                <option>genre</option>
            </select>
            <select>
                <option>RAWG</option>
                <option>Data Base</option>
            </select>
            <select>
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
