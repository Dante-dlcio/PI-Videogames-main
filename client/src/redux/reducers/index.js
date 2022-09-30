const initialState = {
  videogame: {},
  videogames: [],
  genres: [],
  filters: {
    byOrigin: "All",
    byGenre: "",
  },
  orders: 0,
  page: 0,
  videogamesPerPage: 15

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
    case "FILTER_BY_ORIGIN":
      return {
        ...state,
        page:0,
        filters: { ...state.filters, byOrigin: action.payload }
      };
    case "FILTER_BY_GENRE":
      return {
        ...state,
        page:0,
        filters: { ...state.filters, byGenre: action.payload }
      };
    case "SET_ORDERS":
      return {
        ...state,
        page:0,
        orders: action.payload,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "PREVIOUS_PAGE":
      return {
        ...state,
        page: state.page - 1,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      return state;
  }
}
