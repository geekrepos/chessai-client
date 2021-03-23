import {useState, useEffect} from 'react';
import Chess from 'chess.js';
import Chessboard from "../src/Chessboard";

function PVC({children}){
    const [fen, setFen] = useState('start');
    const [squareStyles, setSquareStyles] = useState({});
    const [pieceSquare, setPieceSquare] = useState('');

    let game = null;

    useEffect(()=>{
        game = new Chess();
    }, []);

    const makeRandomMove = () => {
        let possibleMoves = game.moves();

        // exit if the game is over
        if (
            game.game_over() === true ||
            game.in_draw() === true ||
            possibleMoves.length === 0
        )
            return;

        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        game.move(possibleMoves[randomIndex]);
        setFen(game.fen());
        setSquareStyles({
            [game.history({ verbose: true })[game.history().length - 1].to]: {
                backgroundColor: 'DarkTurquoise'
            }
        })
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
        window.setTimeout(makeRandomMove, 1000);
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
        window.setTimeout(makeRandomMove, 1000);
    };

    return children({ position: fen, onDrop, onSquareClick, squareStyles });
}

export default function PlayerVsComputer() {
    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <PVC>
                {({ position, onDrop, onSquareClick, squareStyles }) => (
                    <Chessboard
                        calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
                        id="humanVsRandom"
                        position={position}
                        onDrop={onDrop}
                        boardStyle={{
                            borderRadius: '5px',
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                        }}
                        onSquareClick={onSquareClick}
                        squareStyles={squareStyles}
                    />
                )}
            </PVC>
        </div>
    );
}
