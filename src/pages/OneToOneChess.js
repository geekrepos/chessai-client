import React from "react";
import OnevsOne from '../assets/images/1v1.jpg';
import VsComputer from '../assets/images/vsComputer.jpg';
import Chessboard from "../src/Chessboard";

export default function OneToOneChess() {
    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Chessboard />
        </div>
    );
}
