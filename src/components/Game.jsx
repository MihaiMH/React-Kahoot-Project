import {games} from "../data/data";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import '../css/game.css';


export default function Game(){
    const navigate = useNavigate();
    let { number } = useParams();
    let game = games[parseInt(number)];

    const [gameStart, setGameStart] = useState(true);
    const [roundStart, setRoundStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(true);
    const [question, setQuestion] = useState(false);

    const[qNumber, setqNumber] = useState(0);

    const[answer, setAnswer] = useState("");
    const[right, setRight] = useState(0);

    const [sec, setSec] = useState(3);  
    const [sec2, setSec2] = useState(0); 

    useEffect(()=>{
            if(sec===-1){setGameStart(false);setRoundStart(true); return};
            const intervalId = setInterval(()=>{setSec(sec-1);},1000);
            return ()=>clearInterval(intervalId);
    },[sec]);

    useEffect(()=>{
        if(roundStart===true){setSec2(15);} else {setSec2(-1);}
    },[roundStart])

    useEffect(()=>{
        if(sec2===0){setRoundStart(false);return;}
        const intervalId = setInterval(()=>{setSec2(sec2-1);},1000);
        return ()=>clearInterval(intervalId);
    },[sec2]);

    function gStop(){
        setSec(-1);
        setTimer(false);
    }
    function gStart(time){
        setSec(time);
        setTimer(true);
    }

    function nextQuetion(){
        if(qNumber+1<game.length){
            setqNumber(qNumber+1);
            console.log(qNumber);
            setRoundStart(true);
        } else {
            setGameOver(true);
        }
    }
    
     useEffect(()=>{
         if(answer===game[qNumber].correct)setRight(right+1);
         setRoundStart(false);
     }, [answer]);

    function sendAnswer(text){
        setAnswer(text);
    }


    return(
        <body>
        <div className="content">
        { 
        gameStart===true?
                timer===true?
                        sec>0?
                        <div id={sec} className="timer">
    
                        <p>{sec}</p>
                        
                        </div>
                        :
                        sec!==-1? <div className="gameStart"><p>START!</p></div>:null
                    :null 
                :
                null
        }

        {
        roundStart===true?
                timer===true?
                        sec2>0?
                        <div className="timerround"><div className="line"/><p>{sec2}</p></div>
                        :
                        <div className="roundOver"><p>TIME IS UP!</p></div>
                    :
                    null
                    
                :
                null 
        }
        {
        roundStart===true?
                <h1 className="question">{game[qNumber].q}</h1>                    
                :
                null 
        }
        {
        roundStart===true?
                <div className="total-buttons"><div className="answers">{game[qNumber].a.map((answer)=><button onClick={()=>{sendAnswer(answer)}}>{answer}</button>)}
                </div>
                <button className="gohomebutton" onClick={()=>{navigate('/')}}> Stop the game and go home </button>
                </div>
                :
                null 
        }
        {
        roundStart===false&&gameStart===false&&gameOver===false?
            <button className="nquestion" onClick={()=>nextQuetion()}>Next Question</button>
            :
            null
        }    
        {
            gameOver===true?
            <div className="endgame">
            <h1>GAME OVER</h1>
            <p>{right} corecte din {game.length}</p>
            <div className="endgame-buttons">
                <button onClick={()=>{navigate('/')}}> Go home </button>
                <button onClick={()=>{window.location.reload();}}> Restart game </button>
            </div>
            </div>
            : 
            null
        }   
        </div>
        </body>
   );
}