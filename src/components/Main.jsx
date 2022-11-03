import {games} from "../data/data";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../css/main.css';

export default function Main(){
    const navigate = useNavigate();
    return(
        <body>
        <div className="content">
            <h1>
                KAHOOT 3.0
            </h1>
            <div className="buttons">
            {
                games.map((game)=><button onClick={()=>{navigate('/gamemenu/'+games.indexOf(
                    game,0))}}> Game {games.indexOf(game,0)+1}</button>)
            }
            </div>
        </div>
        </body>
    );
}