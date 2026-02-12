import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage  () { //defines a component that does something
  const [username, setUsername] = useState(''); //useState creates "states"
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmployee, setIsEmployee] = useState(false); //for teachers and admin

  //hardcode login info
  const employeeInfo = {
    username: 'usernameEReal',
    password: 'passwordEReal',
  };
  const studentInfo = {
    username: 'usernameReal',
    password: 'passwordReal',
  };

  const checkLogin = () => {
    if (!username && !password) { //checks id it is empty
      setError('Fill the required information.');
      return;
    }
    else if (!password) {
      setError('Missing password, please input password correctly.');
      return;
    }
    else if(!username) {
      setError('Missing username, please input username correctly.');
      return;
    }

    setError('');

    if(isEmployee) {
      if (username===employeeInfo.username && password === employeeInfo.password){
        setError('');
        alert ('Login Successful!');
      }
      else{
        setError('Invalid username or password.');
      }
    }
    else{
      if (username === studentInfo.username && password === studentInfo.password) { //checks if password right
      setError('');
      alert ('Login Successful!');
      }
      else {
       setError('Invalid username or password.');
      }
    }
  };

  return (
    <div className="login-page"> 
      <h2>Login to your Smart Course Companion</h2>
      <h3>{isEmployee ? 'Employees Login' : 'Student Login'}</h3>
      <div className="employee-Toggle">
        <label className="switch">
          <input
          type="checkbox"
          checked={isEmployee}
          onChange={() => setIsEmployee(!isEmployee)}
        />
        <span className="slider"></span>
        </label>
        <span>Employee</span>
      </div>

      <div className = "Fill1"> //box for username
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
          <div className = "Fill2"> //box for password
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}//prints error message if needed\
        <button onClick={checkLogin}>Login</button> //Login button calls check
        </div>

  );
  }

  export default LoginPage;
