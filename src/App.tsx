import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import useToken from "./Login/useToken";

function App() {
    const {token, setToken} = useToken();

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Dashboard/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}


export default App;
