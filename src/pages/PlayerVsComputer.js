import {useState, useEffect} from 'react';
import Chess from 'chess.js';
import Chessboard from "../src/Chessboard";
import MoveCalculation from "../models/MoveCalculation";
const $ = window.$;

function PVC({children, setGameContext, whenPieceMoved, onGameOver}){
    const [fen, setFen] = useState('start');
    const [squareStyles, setSquareStyles] = useState({});
    const [pieceSquare, setPieceSquare] = useState('');
    const [game, setGame] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(()=>{});

    useEffect(()=>{
        setGame(new Chess());
    }, []);

    const makeComputerMove = () => {
        MoveCalculation(null, null, onGameOver).makeBestMove({...game, ugly_move: function(move_obj, options) {
                var pretty_move = game.make_pretty(move_obj);
                game.make_move(move_obj);

                return pretty_move;
            }}, currentPosition);
        // let possibleMoves = game.moves();
        //
        // // exit if the game is over
        // if (
        //     game.game_over() === true ||
        //     game.in_draw() === true ||
        //     possibleMoves.length === 0
        // )
        //     return;
        //
        // let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        // game.move(possibleMoves[randomIndex]);
        // setFen(game.fen());
        // setSquareStyles({
        //     [game.history({ verbose: true })[game.history().length - 1].to]: {
        //         backgroundColor: 'DarkTurquoise'
        //     }
        // })
        whenPieceMoved(game.history({verbose: true}));
    };

    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        var move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        setFen(game.fen());
        whenPieceMoved(game.history({verbose: true}));
        window.setTimeout(makeComputerMove, 1000);
    };

    const onSquareClick = square => {
        setSquareStyles({ [square]: { backgroundColor: 'DarkTurquoise' } });
        setPieceSquare(square);

        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: 'q' // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        setFen(game.fen());
        whenPieceMoved(game.history({verbose: true}));
        window.setTimeout(makeComputerMove, 1000);
    };

    return (
        <Chessboard
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
            id="humanVsComputer"
            position={fen}
            getPosition={setCurrentPosition}
            onDrop={(e)=>onDrop(e) && console.log(e) }
            boardStyle={{
                borderRadius: '5px',
                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            onSquareClick={onSquareClick}
            squareStyles={squareStyles}
        />
    );
}

export default function PlayerVsComputer({user= 'Avinash'}) {
    const [movesList, setMovesList] = useState([]);
    const [gameContext, setGameContext] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    return (
        <div style={{display: 'flex'}}>
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <h5 style={{color: "green"}}>{user} <span style={{color: 'black'}}>V/s</span> <span style={{color: 'red'}}>Computer</span></h5>
            <PVC whenPieceMoved={setMovesList} computer={MoveCalculation}>

            </PVC>
        </div>
        <div style={{ marginLeft: 10, backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <h4>Moves List</h4>
            <hr/>
            <ul>
                {movesList.map(m=>(
                    <li>{m.color=="w"?user:"Computer"}: {m.from} -> {m.to}</li>
                ))}
            {/*{movesList?.map(m=><li>{m}</li>)}*/}
            </ul>
        </div>
        </div>
    );
}
