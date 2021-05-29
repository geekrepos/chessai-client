import React from 'react'
import JoinGame from './joingame'
import OneToOneChess from "./OneToOneChess";
import Chessboard from "../src/Chessboard";

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        didRedirect: true
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    render() {

        console.log(4)

        return (<React.Fragment>
            {
                this.state.didGetUserName ?
                    <React.Fragment>
                        <JoinGame userName = {'Open'} isCreator = {false}/>
                        <OneToOneChess user = {'Open'}/>
                    </React.Fragment>
                    : this.setState({
                        didGetUserName: true
                    })
            }
        </React.Fragment>)
    }
}

export default JoinRoom