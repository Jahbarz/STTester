import { useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import storeToken from "../client/storeToken";

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Login =()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState('');
    //store token to call in profile compoent to view data

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        login();
        setUsername("");
        setPassword("");
        console.log(password);
    };

    const login = async () => {

        try {
          const response = await fetch(`${baseUrl}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });
          const result = await response.json();
          console.log(result.data.token);
          setToken(result.data.token);
          console.log(token);
          storeToken(token);
          return result
        } catch (err) {
          console.error(err);
        }
      }

    return (
        <div id="container">
            <div id="navbar">Login</div>
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input type="text" placeholder="Username" value={username} onChange={handleChange}></input>
                <h2>Password</h2>
                <input type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
                <button type="submit">Log In</button>
                <Link to="/register">Don't have an account? Sign up!</Link>
            </form>
        </div>
    );
}


export default Login;