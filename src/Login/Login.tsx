import React, {SyntheticEvent, useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {Alert, Button, Card, TextField} from "@mui/material";

async function getUserToken(credentials: Object, setMessage: Function) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(() => setMessage("Wrong credentials"))
}

export default function Login({setToken}: {setToken: Function}) {
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [message, setMessage] = useState<string>();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const token = await getUserToken({
            username, password
        }, setMessage);
        setToken(token);
    };

    return (
        <Card className="login-card" variant="outlined">
            <div className="login-wrapper">
                <h2>Welcome to the Cocktail app</h2>
                <form data-testid="login-form" onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        {!message && (
                            <Alert severity="info">Please use credentials <b>admin</b> and <b>admin</b> to sign
                                in.</Alert>)}
                        {!!message && (
                            <Alert id="alert-error" severity="error">{message}</Alert>)}
                        <TextField required id="username" label="Username" variant="outlined" type="text"
                                   data-testid="login-username"
                                   onChange={e => setUserName(e.target.value)}/>
                        <TextField required id="password" label="Password" variant="outlined" type="password"
                                   data-testid="login-password"
                                   onChange={e => setPassword(e.target.value)}/>
                        <div className="submit-btn-wrapper">
                            <Button disabled={!username || !password} variant="contained" type="submit"
                                    data-testid="login-submit" id="btn-submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
