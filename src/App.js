import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../src/Login';
import logo from "./logo2.png";
import BasicRoutor from './web/module/BasicRoutor';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    document.title = '德明財經科技大學USR';
  }, []);

  return (
    <>
    <Helmet>
        <meta name="description" content="For TMUST USR" />
        <meta property="og:image" content={logo} />
      </Helmet>
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route path="*" element={<BasicRoutor />} />
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
    </>
  );
}
