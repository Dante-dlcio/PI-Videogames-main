import React from 'react';
import { setPage, previousPage, nextPage } from '../../redux/actions';
import './pagination.css'
import { useSelector, useDispatch } from 'react-redux';

export function Pagination({filtered}) {

    const dispatch = useDispatch()
    const { page,videogamesPerPage }= useSelector(state =>state)
    const handleSetPage = x => dispatch(setPage(x))
    const pageButtons = () => [-2, -1, 0, +1, +2]
          .map(x => x + page)
          .filter(x => x >= 0)
          .filter(x => x < filtered.length / videogamesPerPage)
          .map(x => (<div className={x == page?"current":""} onClick={() => handleSetPage(x)}>{x+1}</div>))
  
    return (
      <div className="pagination-buttons">
        <div onClick={() => page > 0 ? dispatch(previousPage()):null}>{"<"}</div>
          {pageButtons()}
        <div onClick={() => page+1 < filtered.length / videogamesPerPage?dispatch(nextPage()):null}>{">"}</div>
      </div>
    );
  }