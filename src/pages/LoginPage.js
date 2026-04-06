import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesCSS/LoginPage.css';
import { generatedId } from '../utils/generatedId.js';


function LoginPage () { //defines a component that does something
  const [username, setUsername] = useState(''); //useState creates "states"
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmployee, setIsEmployee] = useState(false); //for teachers and admin
  const [showRegister, setShowRegister] = useState(false);

  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [regError, setRegError] = useState('');
 
  //hardcode login info
  const employeeInfo = {
    username: 'usernameEReal',
    password: 'passwordEReal',
    id: 'TCH-00000001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@school.com'
  };
  const studentInfo = {
    username: 'usernameReal',
    password: 'passwordReal',
    id: 'STU-40212345',
    firstName: 'Veft',
    lastName: 'Soen',
    email: 'veft@email.com'
  };

  const navigate = useNavigate();

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
        localStorage.setItem("userId", employeeInfo.id);
        localStorage.setItem("authUser", "teacher");
      const existingTeacher = localStorage.getItem("currentTeacher");
  if (existingTeacher) {
    const parsed = JSON.parse(existingTeacher);
    // only overwrite if it's a different teacher
    if (parsed.id !== employeeInfo.id) {
      localStorage.setItem("currentTeacher", JSON.stringify(employeeInfo));
    }
    } else {
    // first time login, set the default
    localStorage.setItem("currentTeacher", JSON.stringify(employeeInfo));
  }

       alert ('Login Successful!');
        navigate('/teacher');
        return;
      }
const registeredTeachers = JSON.parse(localStorage.getItem("registeredTeachers") || "[]");
      const foundTeacher = registeredTeachers.find(t => t.username === username && t.password === password);

    
      if (foundTeacher) {
  localStorage.setItem("userId", foundTeacher.id);
  localStorage.setItem("authUser", "teacher");

  const existingTeacher = localStorage.getItem("currentTeacher");
  if (existingTeacher) {
    const parsed = JSON.parse(existingTeacher);
    if (parsed.id !== foundTeacher.id) {
      localStorage.setItem("currentTeacher", JSON.stringify(foundTeacher));
    }
  } else {
    localStorage.setItem("currentTeacher", JSON.stringify(foundTeacher));
  }
   alert('Login Successful!');
        navigate('/teacher');
      }else{
        setError('Invalid username or password.');
      }
    }
    else{
      if (username === studentInfo.username && password === studentInfo.password) { //checks if password right
       localStorage.setItem("userId", studentInfo.id);
       localStorage.setItem("authUser", "student");
       const existingStudent = localStorage.getItem("currentStudent");
  if (existingStudent) {
    const parsed = JSON.parse(existingStudent);
    if (parsed.id !== studentInfo.id) {
      localStorage.setItem("currentStudent", JSON.stringify(studentInfo));
    }
  } else {
    localStorage.setItem("currentStudent", JSON.stringify(studentInfo));
  }

       alert ('Login Successful!');
       navigate('/student');
       return;
      }
const registeredStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
      const foundStudent = registeredStudents.find(s => s.username === username && s.password === password);
    if (foundStudent) {
  localStorage.setItem("userId", foundStudent.id);
  localStorage.setItem("authUser", "student");

  const existingStudent = localStorage.getItem("currentStudent");
  if (existingStudent) {
    const parsed = JSON.parse(existingStudent);
    if (parsed.id !== foundStudent.id) {
      localStorage.setItem("currentStudent", JSON.stringify(foundStudent));
    }
  } else {
    localStorage.setItem("currentStudent", JSON.stringify(foundStudent));
  }
    alert('Login Successful!');
        navigate('/student');
      }
      else {
       setError('Invalid username or password.');
      }
    }
  };

  const handleRegChange = (e) => {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { firstName, lastName, username, email, password, confirmPassword } = regForm;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      setRegError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    // pick the right storage key and ID prefix based on role
    const storageKey = isEmployee ? "registeredTeachers" : "registeredStudents";
    const idPrefix = isEmployee ? "TCH" : "STU";

    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (existing.find(u => u.username === username)) {
      setRegError('Username already taken.');
      return;
    }
    if (existing.find(u => u.email === email)) {
      setRegError('Email already registered.');
      return;
    }

    const confirmed = window.confirm(
      `Please confirm your details:\n\nName: ${firstName} ${lastName}\nUsername: ${username}\nEmail: ${email}\nRole: ${isEmployee ? "Teacher" : "Student"}\n\nClick OK to register.`
    );

    if (!confirmed) return;

    const newId = `${idPrefix}-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newUser = { id: newId, firstName, lastName, username, email, password };

    localStorage.setItem(storageKey, JSON.stringify([...existing, newUser]));

    setRegError('');
    setRegForm({ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' });
    alert(`Registration successful!\nYour ${isEmployee ? "Teacher" : "Student"} ID is: ${newId}\nYou can now log in.`);
    setShowRegister(false);
  };
  
   if (showRegister) {
  return (<div className="login-page">
        <h2>Create a {isEmployee ? "Teacher" : "Student"} Account</h2>

        <div className="Fill1">
          <input
            name="firstName"
            placeholder="First Name"
            value={regForm.firstName}
            onChange={handleRegChange}
          />
        </div>
        <div className="Fill1">
          <input
            name="lastName"
            placeholder="Last Name"
            value={regForm.lastName}
            onChange={handleRegChange}
          />
        </div>
        <div className="Fill1">
          <input
            name="username"
            placeholder="Username"
            value={regForm.username}
            onChange={handleRegChange}
          />
        </div>
        <div className="Fill1">
          <input
            name="email"
            placeholder="Email Address"
            value={regForm.email}
            onChange={handleRegChange}
          />
           </div>
        <div className="Fill1">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={regForm.password}
            onChange={handleRegChange}
          />
        </div>
        <div className="Fill2">
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={regForm.confirmPassword}
            onChange={handleRegChange}
          />
        </div>
         {regError && <p className="error">{regError}</p>}

        <button className="loginButton" onClick={handleRegister}>Register</button>

        <p style={{ textAlign: 'center', color: '#fff', marginTop: '15px' }}>
          Already have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => { setShowRegister(false); setRegError(''); }}
          >
            Log in
          </span>
        </p>
      </div>
    );
  }
  return (
    <div className="login-page"> 
      <h2>Login to your Smart Course Companion</h2>
      <h3>{isEmployee ? "Employee's Login" : "Student's Login"}</h3>
      <div className="employee-Toggle">
        <label className="switch">
          <input
          type="checkbox"
          checked={isEmployee}
          onChange={() => setIsEmployee(!isEmployee)}
        />
        <span className="slider">Employee Employee</span>
       
       
        </label>
       
      </div>

      <div className = "Fill1"> {/*box for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
          <div className = "Fill2"> {/*box for password*/}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       
      
      {error && <p className="error">{error}</p>}

      <button className="loginButton" onClick={checkLogin}>Login</button>

      <p style={{ textAlign: 'center', color: '#fff', marginTop: '15px' }}>
        Don't have an account?{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => { setShowRegister(true); setError(''); }}
       >
                Register here
             </span>
          </p>
       </div>
    );
  }

  export default LoginPage;

