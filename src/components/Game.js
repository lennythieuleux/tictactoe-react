import {React, useState} from "react";

const Game = () => {

    //State hooks initialization
    const[turn, setTurn] = useState(0);
    const[playerSign, setPlayerSign] = useState("x");
    const [grid, setGrid] = useState(Array(9).fill(null));                                  
    const [points, setPoints] = useState({
        playerX: 0,
        playerO: 0
    });                                  
    const [isGameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    
    const whichPlayerTurn = () => {
        if(turn % 2 === 0) {
            setPlayerSign("x");
        } else {
            setPlayerSign("o");
        }
    }

    //Game output
    let gameOutput;

    const Winner = () => {
        return(
            <p className="gameOutput">Team {winner} won the game !  <i className="nes-icon trophy"></i></p>
        )
    }

    const DrawGame = () => {
        return(
            <p className="gameOutput">It's a draw. Play again !  <i className="nes-icon close"></i></p>
        )
    }

    if(winner !== null){
        gameOutput = <Winner/>
    } else{
        gameOutput = <DrawGame/>
    }


    //Cell component
    const Cell = ({pos}) => {
        return <div className="cell" onClick={() => handleClick(pos)} pos={pos}>{grid[pos]}</div>
    }

    //Handles click on Cell component
    const handleClick = (pos) =>{
        //Passes only if game is in process
        if(isGameOver !== true){
            whichPlayerTurn();

            let cell = [...grid];
        
            if (cell[pos] === null) {
                cell[pos] = playerSign;
                setGrid(cell);
                checkWin(cell);                
                setTurn(turn + 1);
            }
        }
        //Otherwise click on grid does nothing
    }

    //Grid component
    const DisplayGrid = () =>{
        return(
            <>
                <div className="row">
                    <Cell className="cell" pos={0}></Cell>
                    <Cell className="cell" pos={1}></Cell>
                    <Cell className="cell" pos={2}></Cell>
                </div>
                <div className="row">
                    <Cell className="cell" pos={3}></Cell>
                    <Cell className="cell" pos={4}></Cell>
                    <Cell className="cell" pos={5}></Cell>
                </div>
                <div className="row">
                    <Cell className="cell" pos={6}></Cell>
                    <Cell className="cell" pos={7}></Cell>
                    <Cell className="cell" pos={8}></Cell>
                </div>
            </>
        )
    }

    //Starts game on click on button
    const startGame = () => {
        setTurn(turn + 1);
    }

    //Restarts game on click on button 
    //Resets all the state hooks
    const restartGame = () => {
        setGrid(Array(9).fill(null))
        setGameOver(false);
        setTurn(1);
        setPlayerSign('x');
        setWinner(null);
    }

    //Checks if a player has won
    const checkWin = (cell) => {
        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        //Loops through all the combinations
        for(let i = 0; i < 8 ; i++){
            //Checks if a combination isn't completed by empty cells
            if(cell[combinations[i][0]] !== null && cell[combinations[i][1]] !== null && cell[combinations[i][2]] !== null){
                //Checks if a combination is duly completed, if it is... Congrats to {playerSign} !
                if(cell[combinations[i][0]] === cell[combinations[i][1]] && cell[combinations[i][1]] === cell[combinations[i][2]]){
                    setWinner(playerSign);
                    setGameOver(true);
                    if(winner === "x"){
                        setPoints({playerX: points.playerX + 1});
                    } else{
                        setPoints({playerO: points.playerO + 1});
                    }
                }
            }
        }
        //Grid could be full if no combination as been completed...
        //Let's check !
        checkGridFull();
    }

    //Checks if grid is full
    const checkGridFull = () =>{
        let filledCells = 1;
        
        for(let cell of grid){
            //Increment filledCells if cell isn't null / empty (on UI)
            if(cell !== null){
                filledCells = filledCells + 1;
            } 

        }
        //If all cells are filled and game is still running, it's a draw !
        if(filledCells === 9 && isGameOver !== true){
            console.log('hoy')
            setGameOver(true);
        }
    }

    return(
                <>
                    <div className="pointsCount">
                        <span>Player x : {points.playerX}</span> VS <span>Player o : {points.playerO}</span>
                    </div>
                    {turn === 0 ? null : <DisplayGrid/>}
                    {isGameOver ? gameOutput : null}
                    <button onClick={turn === 0 ? startGame : restartGame}>{turn === 0 ? 'Start the game' : 'Restart'}</button>
                </>
    )
}

export default Game;