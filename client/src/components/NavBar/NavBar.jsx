import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar';
import {
    getAllGames,
    getGenres,
    setGenreFilter,
    setOriginFilter,
    setOrders,
    filterByRating
} from '../../redux/actions';
import './NavBar.css'


export default function NavBar() {
    const dispatch = useDispatch();
    const { genres, orders, filters } = useSelector((state) => state)

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch]);
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    function handleRatingOnClick() {
        dispatch(filterByRating())
    }

    function handleOriginOnChange(e) {
        dispatch(setOriginFilter(e.target.options[e.target.options.selectedIndex].value))
    }

    function handleGenreOnChange(e) {
        dispatch(setGenreFilter(e.target.options[e.target.options.selectedIndex].value))
    }

    function handleOrdersOnChange(e) {
        dispatch(setOrders(e.target.options.selectedIndex))
    }


    return (
        <>
            <div className='container-gf'>
                <div className='selectors-bar-child'>
                    <SearchBar />
                </div>
                <div className='container-nav-father'>
                    <div className='selectors-child'>
                        <select defaultValue={filters.byGenre} onChange={handleGenreOnChange}>
                            <option value=''>genre</option>
                            {
                                genres?.map(g => (
                                    <option value={g.name}>
                                        {g.name}
                                    </option>
                                ))
                            }
                        </select>
                        <select value={filters.byOrigin} onChange={handleOriginOnChange}>
                            <option value="All">All</option>
                            <option value="Api">RAWG</option>
                            <option value="Db">Data Base</option>
                        </select>
                        <select value={orders} onChange={handleOrdersOnChange}>
                            <option value='0'>A-Z</option>
                            <option value='1'>Z-A</option>
                            <option value='2'>Rating Asc</option>
                            <option value='3'>Rating Desc</option>
                        </select>
                        <Link to="/create">
                            <button>Create your videogame</button>
                        </Link>
                        <button onClick={handleRatingOnClick}>
                            4 stars or more
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
