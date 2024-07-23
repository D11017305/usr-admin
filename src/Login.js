// src/Login.js
import React, { useState } from 'react';
import logoImage from "../src/web/module/logo.png";
import "../src/Login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // 假設登入成功
        onLogin();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-container">
                <div className="logcontain">

                    <img src={logoImage} alt="logo" className="logo" />
                    <div className="inputContain">
                        <div className="input-container">
                            <h3>帳號:</h3>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <h3>密碼:</h3>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className='btnIn'>登入</button>
                </div>
            </div>
        </form>
    );
};

export default Login;
