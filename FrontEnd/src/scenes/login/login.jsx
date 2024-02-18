import React, { useState } from 'react';
import './styles.css';
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedInState] = useState(false);
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading, error } = useGetUserQuery(userId);
  

  const handleLogin = async () => {

      // Check if data is available
      //if (data) {

        // if ( username===data.name && password === data.password) { 
        if ( username==='abc' && password === 'abc') { 
          setLoggedIn(true);
          setLoggedInState(true);
        } else {
          // If credentials are incorrect, log the first 5 usernames and passwords
          console.log("usernames and passwords:");
          
            console.log(`${data.name }:  ${data.password}`);
          
          setShowInvalidCredentials(true);
        }
    //   } else {
    //     setShowInvalidCredentials(true);
    //   }
    // } catch (error) {
    //   console.error("Error checking credentials:", error);
    //   setShowInvalidCredentials(true); // Or display a more specific error message
     }
 // };

  return (  
    <section className='login' id='login'>
      <div className='head'>
        <h1 className='company'>LendEase</h1>
      </div>
      {!loggedIn ? (
        <>
          <p className='msg'>Welcome</p>
          <div className='form'>
            <form>
              <input
                type="text"
                placeholder='Username'
                className='text'
                id='username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br />
              <input
                type="password"
                placeholder='••••••••••••••'
                className='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <button type="button" className='btn-login' onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
          {showInvalidCredentials && (
            <p className='error-message'>Invalid credentials. Please try again.</p>
          )}
        </>
      ) : (
        <p>We're happy to see you again, <h1>{username}</h1></p>
      )}
    </section>
  );
};

export default Login;
