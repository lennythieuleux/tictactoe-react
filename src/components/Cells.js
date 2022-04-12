import {React, useState, useEffect} from "react";

const Game = () => {

    

    //States hooks
    const[turn, setTurn] = useState(0);
    const[hasGameStarted, setHasGameStarted] = useState(false);
    const[playerSign, setPlayerSign] = useState('<i class="nes-icon heart"></i>');
    
    
    const whichPlayerTurn = () =>{
        if (turn % 2 === 0) {
            setPlayerSign('<i class="nes-icon heart"></i>');
        } else {
            setPlayerSign('<i class="nes-icon star"></i>');
        }
    }

    let grid = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const Cell = (key) =>{
        return <div className="cell" onClick={handleClick}>{grid[key]}</div>
    }

    //VAR INIT
    // let cellIndex = null;
    // let cellRow = null;
    // let isGameOver = false;
    // let pointsToWin = 0;
    // let totalPoints = 0;

    

    const handleClick = () =>{
        whichPlayerTurn();
        console.log(turn)
        if (grid !== null) {
            setTurn(turn + 1);
            
            
        }

        
    }

    const DisplayGrid = () =>{

        return(
            <>
                {
                grid.map((row, index) => (
                <div class="row" key={index}>
                    <Cell key={index * 1}/>
                    <Cell key={index * 2}/>
                    <Cell key={index * 3}/>
                </div>
                    ))
                }
            </>
        )
    }
    
    const startGame = () => {
        setHasGameStarted(true);
    }


    return(
                <>
                    {hasGameStarted === false ? null : <DisplayGrid/>}
                    <button onClick={startGame}>{hasGameStarted === false ? 'Start the game' : 'Restart'}</button>
                </>
    )
}

export default Game;