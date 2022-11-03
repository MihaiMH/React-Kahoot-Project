import {Routes, Route,Router} from "react-router-dom";
import Main from "./components/Main";
import GameMenu from "./components/GameMenu";
import Error from "./components/Error";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/> 
        <Route path="/gamemenu/:number" element={<GameMenu />}/>
        <Route path="/gamemenu/game/:number" element={<Game />}/>
        <Route path="*" element={<Error />}/> 
      </Routes>
    </div>
  );
}

export default App;
