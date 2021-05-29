import React from 'react'
import { useParams } from 'react-router-dom'
import {socket} from "../socket-connection";

/**
 * 'Join game' is where we actually join the game room.
 */


const JoinGameRoom = (gameid, userName, isCreator) => {
    /**
     * For this browser instance, we want
     * to join it to a gameRoom. For now
     * assume that the game room exists
     * on the backend.
     *
     *
     * TODO: handle the case when the game room doesn't exist.
     */
    const idData = {
        gameId : gameid,
        userName : userName,
        isCreator: isCreator
    }

    socket.emit("playerJoinGame", idData)
    console.log(2)
}


const JoinGame = (props) => {
    /**
     * Extract the 'gameId' from the URL.
     * the 'gameId' is the gameRoom ID.
     */
    const { gameid } = useParams()
    JoinGameRoom(gameid, props.userName, props.isCreator)
    return ''
}

export default JoinGame

