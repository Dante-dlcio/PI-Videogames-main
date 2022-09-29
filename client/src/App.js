import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage.jsx";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import GameCreator from "./components/GameCreator/GameCreator.jsx";


function App() {
  return(
    <div>
    <Router>
      <Route exact path='/'><LandingPage/></Route>
      <Route path='/home'><Home/></Route>
      <Route path='/videogame/:id'><Detail/></Route>
      <Route path='/create'><GameCreator/></Route>
    </Router>
    </div>
  );
}

export default App;
