import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getAllGames, getGameByName } from '../../redux/actions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');



    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(name){
        dispatch(getGameByName(name))
        }else
        dispatch(getAllGames());
    }

    return (
        <>
            <input
                type='text'
                placeholder='enter your game'
                onChange={(e) => handleChange(e)}>
            </input>
            <button type='submit' onClick={(e) => handleSubmit(e)}>
                search
            </button>
        </>
    )
} 