import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from './components/Firebase/Firebase.jsx';
import './SignIn.css';

const SignInForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      onLogin(true);
      navigate('/home');
    } catch (error) {
      setError(error.message);
      onLogin(false);
    }
  };

  const isInvalid = password === '' || email === '';

  return (
    <div className='parent-container'>
      <div className="form-container">
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form-title">sign in</h2>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button disabled={isInvalid} type="submit">
        sign in
      </button>
      {error && <p>{error}</p>}
    </form>
    </div>
    <div className='background-container'></div>
    <div className='banner-container'>welcome to taskmaster!</div>
    </div>
    
  );
}

export default SignInForm;
