const initialState = {
  videogame: {},
  videogames: [],
  genres: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_GAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_GAME_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GAME_BY_ID":
      return {
        ...state,
        videogame: action.payload,
      };
    case "CREATE_GAME":
      return {
        ...state,
      };
    default:
      return state;
  }
}
