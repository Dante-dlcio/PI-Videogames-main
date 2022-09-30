import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postGame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const allPlatforms = [
    { name: 'PC' },
    { name: 'Playstation 4' },
    { name: 'Playstation 5' },
    { name: 'Xbox one' },
    { name: 'Xbox Series S/X' },
    { name: 'Nintendo Switch' },
]

const validate = {
    name: {
        condition: (name) => !!name,
        message: "This input cannot be empty, please insert a name",
    },
    description: {
        condition: (description) => !!description,
        message: "This input cannot be empty, please insert a description",
    },
    releaseDate: {
        condition: (date) => !!date,
        message: "Please insert a valid date",
    },
    rating: {
        condition: (rating) => rating && rating > 0 && rating <= 5,
        message: "Please insert a number from 0 to 5",
    },
    platforms: {
        condition: (platforms) => platforms.length,
        message: "This field cannot be empty, please insert at least one platform ",
    },
    genres: {
        condition: (genres) => genres.length,
        message: "This field cannot be empty, please insert at least one genre ",
    },
};

export default function GameCreator() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    useEffect(() => {
        dispatch(getGenres());
    }, []);

    let [errors, setErrors] = useState({});
    let [input, setInput] = useState({
        name: "",
        description: "",
        releaseDate: new Date(),
        rating: 0,
        platforms: [],
        genres: [],
    });

    function handleOnChange(e) {
        let field = e.target.name;
        let value = e.target.value;
        let isValid = validate[field].condition;
        let message = validate[field].message;
        setInput({
            ...input,
            [field]: value,
        });

        setErrors({
            ...errors,
            [field]: isValid(value) ? "" : message,
        });
        console.log(errors);
    }



    function handleSelectG(e) {
        let field = e.target.name;
        let value = e.target.value;
        let isValid = validate[field].condition;
        let message = validate[field].message;
        setInput({
            ...input,
            genres: [...input.genres, value ],
        });

        setErrors({
            ...errors,
            [field]: isValid(value) ? "" : message,
        });

    }
    function handleSelectP(e) {
        let field = e.target.name;
        let value = e.target.value;
        let isValid = validate[field].condition;
        let message = validate[field].message;
        setInput({
            ...input,
            platforms: [...input.platforms,  value ],
        });

        setErrors({
            ...errors,
            [field]: isValid(value) ? "" : message,
        });

    }

    function handleDeleteG(genre) {
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !== genre),
        });}
        function handleDeleteP(platform) {
            setInput({
                ...input,
                platforms: input.platforms.filter((p) => p !== platform),
            });
        }

        function handleSubmit(e) {
            e.preventDefault();
            if (
                validate.name.condition(input.name) &&
                validate.description.condition(input.description) &&
                validate.releaseDate.condition(input.releaseDate) &&
                validate.rating.condition(input.rating) &&
                validate.platforms.condition(input.platforms) &&
                validate.genres.condition(input.genres)
            ) {
                input.platforms = input.platforms.toString()
             
                dispatch(postGame(input));
                alert(
                    "Your game was created successfully and is waiting for you. Now you can go to Home Page to see it"
                );
                setInput({
                    name: "",
                    description: "",
                    releaseDate: new Date(),
                    rating: 0,
                    platforms: [],
                    genres: [],
                });
            } else {
                alert("Please complete all fields");
            }
        }

        return (
            <div >
                <h3>Create your own game here!</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={input.name}
                            key="name"
                            name="name"
                            onChange={(e) => handleOnChange(e)}
                        ></input>
                        {/* //aclarar  errores y algun label y setear error de plataforma*/}
                        {errors.name && <p>{errors.name}</p>} 
                    </div>
                    <div>
                        <label htmlFor="description">description </label>
                        <input
                            type="text"
                            value={input.description}
                            key="description"
                            name="description"
                            onChange={(e) => handleOnChange(e)}
                        ></input>
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="releaseDate">releaseDate</label>
                        <input
                            type="date"
                            value={input.releaseDate}
                            key="releaseDate"
                            name="releaseDate"
                            onChange={(e) => handleOnChange(e)}
                        ></input>
                        {errors.releaseDate && <p>{errors.releaseDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input
                            type="number"
                            value={input.rating}
                            key="rating"
                            name="rating"
                            onChange={(e) => handleOnChange(e)}
                        ></input>
                        {errors.rating && <p>{errors.rating}</p>}
                    </div>

                    <div>
                        <label htmlFor="platforms">Select Platforms</label>
                        <select onChange={(e) => handleSelectP(e)} name="platforms">
                            <option key='' value='' name=''>
                                -
                            </option>
                            {allPlatforms?.map((platform) => {
                                return (
                                    <option key={platform.id} value={platform.name} name={platform.name}>
                                        {platform.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.platforms && <p>{errors.platforms}</p>}
                        {input.platforms.map((platform) => (
                            <div key={platform}>
                                <p>{platform}</p>
                                <button platform="button" onClick={() => handleDeleteP(platform)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>


                    <div>
                        <label htmlFor="genres">Select Genres</label>
                        <select onChange={(e) => handleSelectG(e)} name="genres">
                            <option key='' value='' name=''>
                                -
                            </option>
                            {genres?.map((genre) => {
                                return (

                                    <option key={genre.id} value={genre.name} name={genre.name}>
                                        {genre.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.genres && <p>{errors.genres}</p>}
                        {input.genres.map((genre) => (
                            <div key={genre}>
                                <p>{genre}</p>
                                <button genre="button" onClick={() => handleDeleteG(genre)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>


                    <button type="submit">
                        Create Game
                    </button>
                </form>
                <div className="container-button-home">
                    <Link to="/home">
                        <button className="button-home">Back to Home</button>
                    </Link>
                </div>
            </div>
        );
    }
