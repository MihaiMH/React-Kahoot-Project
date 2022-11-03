import {games} from "../data/data";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import '../css/gamemenu.css';


export default function GameMenu(){
    const navigate = useNavigate();
    let { number } = useParams();
    let nr =  parseInt(number) +1;
    return (
        <body>
        <div class="content contentgamemenu">
        <h1>Game {nr}</h1>
        <p>Questions: {games[nr-1].length}</p>
        <div className="buttons">
        <button onClick={()=>{navigate('/')}}> Go home </button>
        <button onClick={()=>{navigate('/gamemenu/game/'+number)}}> Start game! </button>
        </div>
        </div>
        </body>
    );
}