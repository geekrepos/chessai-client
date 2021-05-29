import React, {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import {BrowserRouter, Link, Route, Switch, Redirect} from "react-router-dom";
import PlayGame from "./PlayGame";
import OneToOneChess from "./OneToOneChess";
import PlayerVsComputer from "./PlayerVsComputer";
import RoutesList from "../RoutesList";
import JoinGame from "./joingame";
import JoinRoom from "./joinroom";
import {ColorContext} from "../context/colorcontext";

export default function WelcomeScreen() {
    const [didRedirect, setDidRedirect] = useState(false)
    const [userName, setUserName] = useState('')

    const playerDidRedirect = React.useCallback(() => {
        setDidRedirect(true)
    }, [])

    const playerDidNotRedirect = React.useCallback(() => {
        setDidRedirect(false)
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ColorContext.Provider value={{
                didRedirect: didRedirect,
                playerDidRedirect: playerDidRedirect,
                playerDidNotRedirect: playerDidNotRedirect
            }}>
                <BrowserRouter>
                    <div className="App"
                         style={{
                             width: '100%',
                             display: 'flex',
                             flex: 1,
                             alignItems: 'center',
                             justifyContent: 'center'
                         }}>
                        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                            <div className="container">
                                <Link className="navbar-brand" to={"/"}>ChessAI</Link>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={RoutesList.login}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={RoutesList.signup}>Sign up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={RoutesList.playgame}>Play</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route path={RoutesList.login} component={Login}/>
                            <Route path={RoutesList.signup} component={SignUp}/>
                            <Route path ={RoutesList.playgame} exact>
                                <PlayGame setUserName = {setUserName}/>
                            </Route>

                            <Route path={RoutesList.onevsone} exact>
                                {
                                    didRedirect ?
                                    <React.Fragment>
                                        <JoinGame userName={"TEst"} isCreator={true}/>
                                        <OneToOneChess userName={"TEst"}/>
                                    </React.Fragment>
                                    :
                                    <JoinRoom/>}
                            </Route>
                            {/*<Route path={} component={OneToOneChess}/>*/}
                            <Route path={RoutesList.playervscomputer} component={PlayerVsComputer}/>
                        </Switch>

                    </div>
                </BrowserRouter>
            </ColorContext.Provider>
        </div>
    )
}
