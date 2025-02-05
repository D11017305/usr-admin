// src/Login.js
import React, { useState } from 'react';
import "../src/Login.css";
import logoImage from "../src/web/module/logo.png";
import { LoginApi } from './web/_basic/Protocol/loginApi';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const correctUsername = '2024UsrAd';
    // const correctPassword = 'P@55w0rd#7Xz';
    const correctUsername = '';
    const correctPassword = '';

    const handleSubmit  = (event) => {
    event.preventDefault();

        try{
            const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password); 
            LoginApi.postLogin(formData);
            // console.log(data);
            onLogin();
        }catch(e){
            console.log("登入失敗，帳號或密碼錯誤",e);
        }
    
        // if (username === correctUsername && password === correctPassword) {
        //     onLogin();  // 登入成功後執行 onLogin
        // } else {
        //     alert('帳號或密碼錯誤');  // 顯示錯誤信息
        // }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="login-container">
                <div className="logcontain">
                    <img src={logoImage} alt="logo" className="logo" />
                    <div className="inputContain">
                        <div className="input-container">
                            <div className='input-text'>帳號：</div>
                            <input
                                className='input-in'
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <div className='input-text'>密碼：</div>
                            <input
                                className='input-in'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='btnIn'>登入</button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
};

export default Login;
