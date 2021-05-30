import React, {useEffect, useState} from "react";
import OnevsOne from '../assets/images/1v1.jpg';
import VsComputer from '../assets/images/vsComputer.jpg';
import {Link, Redirect, useParams} from "react-router-dom";
import RoutesList from "../RoutesList";
import {socket} from "../socket-connection";
import * as uuid from 'uuid'
import {ColorContext} from "../context/colorcontext";
import Chess from "chess.js";

function PlayGameInner(props) {
    console.log(props)
    const [didUserName, setDidUserName] = useState(false);
    const [gameId, setGameId] = useState();

    const send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier.
         */
        const newGameRoomId = uuid.v4()

        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later.

        setGameId(newGameRoomId);

        // emit an event to the server to create a new room
        socket.emit('createNewGame', newGameRoomId)
        console.log(1)
    }

    return (<React.Fragment>
        {
            didUserName ?
                <Redirect to={"/game/" + gameId}>
                    <button className="btn btn-success"
                            style={{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game
                    </button>
                </Redirect>
                :
                <div style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                    <h1 style={{textAlign: 'center'}}>How you want to play?</h1>
                    <div style={{display: 'flex'}}>
                        <div className="card" style={{width: "18rem", marginRight: 40}}>
                            <img className="card-img-top" height={200} src={OnevsOne} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Versus Mode</h5>
                                <p className="card-text">Play against your friend online</p>
                                {/*<Link to={RoutesList.onevsone}>*/}
                                {/*    <a className="btn btn-primary">Play Online</a>*/}
                                {/*</Link>*/}
                                <button className="btn btn-primary"
                                    onClick = {() => {
                                        // When the 'Submit' button gets pressed from the username screen,
                                        // We should send a request to the server to create a new room with
                                        // the uuid we generate here.
                                        props.didRedirect()
                                        props.setUserName("tset")
                                        setDidUserName(true)
                                        send()
                                    }}>Play Now</button>
                            </div>
                        </div>
                        <div className="card" style={{width: "18rem"}}>
                            <img className="card-img-top" height={200} src={VsComputer} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Computer Mode</h5>
                                <p className="card-text">Play against computer</p>
                                <Link to={RoutesList.playervscomputer}>
                                    <a className="btn btn-primary">Play with Computer</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </React.Fragment>
    );
}


const PlayGame = (props) => {
    const color = React.useContext(ColorContext)
    console.log(color)
    console.log("start")
    return <PlayGameInner didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}

export default PlayGame