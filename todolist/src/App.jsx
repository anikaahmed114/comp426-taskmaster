import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import SignInFormV2 from './SignIn';
import SignUpForm from './SignUp';
import Navigation from './Navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null to handle loading state
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      console.log("User signed out");
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate replace to={isLoggedIn ? "/home" : "/signin"} />} />
          <Route path="/signin" element={<SignInFormV2 onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<SignUpForm onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate replace to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

