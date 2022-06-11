import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        let userToken;
        const tokenString = sessionStorage.getItem('token');
        if (tokenString != null) {
            userToken = JSON.parse(tokenString);
        }
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: { token: string }) => {
        if (userToken) {
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}
