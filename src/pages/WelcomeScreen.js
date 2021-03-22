import Login from "./Login";
import SignUp from "./SignUp";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import PlayGame from "./PlayGame";

export default function WelcomeScreen(){
    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <BrowserRouter>
                <div className="App" style={{width: '100%',display:'flex', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={"/"}>ChessAI</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li>
                               <li className="nav-item">
                                        <Link className="nav-link" to={"/playgame"}>Play</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                            <Switch>
                                <Route exact path='/' component={Login} />
                                <Route path="/sign-in" component={Login} />
                                <Route path="/sign-up" component={SignUp} />
                                <Route path="/playgame" component={PlayGame} />
                            </Switch>

                </div>
            </BrowserRouter>
        </div>
    )
}
