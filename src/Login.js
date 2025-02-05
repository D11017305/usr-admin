// src/Login.js
import React, { useState } from 'react';
import "../src/Login.css";
import logoImage from "../src/web/module/logo.png";
import { LoginApi } from './web/_basic/Protocol/loginApi';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit  = async (event) => {
        event.preventDefault();
    
        try {
            const response = await LoginApi.postLogin({
                username,
                password
            });
    
            console.log("API 回應:", response); // 檢查 API 返回的資料
    
            // 檢查 API 是否成功，假設 API 成功時返回 { success: true }
            if (response == "Login successful!") {
                console.log("登入成功");
                if (onLogin) {
                    onLogin(); 
                }
            } else {
                throw new Error(response.message || "登入失敗");
            }
        } catch (e) {
            console.error("登入失敗", e);
            alert(e.message || '帳號或密碼錯誤');
        }
    };
    

    return (
        <>
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
                        <button type="submit" className='btnIn' onClick={handleSubmit}>登入</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
