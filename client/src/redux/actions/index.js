import axios from "axios";

//Action creators:
export function getAllGames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_ALL_GAMES",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getGameByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: "GET_GAME_BY_NAME",
        payload: json.data.just15,
      });
    } catch (e) {
      return dispatch({
        type: "GET_GAME_BY_NAME",
        payload: [],
      });
    }
  };
}

export function getGameById(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({
      type: "GET_GAME_BY_ID",
      payload: json.data,
    });
  };
}

export function postGame(payload) {
  return async function () {
    let json = await axios.post("http://localhost:3001/videogames/createGame", payload);
    return json;
  };
}

export function setOriginFilter(filter) {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_BY_ORIGIN",
      payload: filter,
    })
  }
}
export function setGenreFilter(filter) {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_BY_GENRE",
      payload: filter,
    })
  }
}

export function setOrders(orders) {
  return async function (dispatch) {
    return dispatch({
      type: "SET_ORDERS",
      payload: orders
    })
  }
}

export function setPage(page) {
  return async function (dispatch) {
    return dispatch({
      type: "SET_PAGE",
      payload: page,
    });
  };
}

export function previousPage() {
  return async function (dispatch) {
    return dispatch({
      type: "PREVIOUS_PAGE",
    });
  };
}

export function nextPage() {
  return async function (dispatch) {
    return dispatch({
      type: "NEXT_PAGE",

    });
  };
}