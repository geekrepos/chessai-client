import React from "react";
import OnevsOne from '../assets/images/1v1.jpg';
import VsComputer from '../assets/images/vsComputer.jpg';

export default function PlayGame() {

    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <h1 style={{textAlign: 'center'}}>How you want to play?</h1>
            <div style={{display: 'flex'}}>
                <div className="card" style={{width: "18rem", marginRight: 40}}>
                    <img className="card-img-top" height={200} src={OnevsOne} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Versus Mode</h5>
                        <p className="card-text">Play against your friend online</p>
                        <a href="#" className="btn btn-primary">Play Online</a>
                    </div>
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" height={200} src={VsComputer} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Computer Mode</h5>
                        <p className="card-text">Play against computer</p>
                        <a href="#" className="btn btn-primary">Play with Computer</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
