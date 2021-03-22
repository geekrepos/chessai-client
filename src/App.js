import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WelcomeScreen from "./pages/WelcomeScreen";

export default function(){
    return (
        <div>
            <WelcomeScreen/>
        </div>
    )
}
