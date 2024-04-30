import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import SignInFormV2 from './SignIn';
import SignUpForm from './SignUp';
import Navigation from './Navigation';
import { getAuth, signOut } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      console.log("User signed out");
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={<SignInFormV2 onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<SignUpForm onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
