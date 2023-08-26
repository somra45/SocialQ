import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState('');
  const [passwordExists, setPasswordExists] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [emailErrors, setEmailErrors] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resErrors = await dispatch(login({ email, password })); 
    if (resErrors.statusCode === 422) {
      setErrorMessage(resErrors.message)
      setEmailErrors(true)
      setPasswordErrors(true)
    }
    
  }

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email:"demo-user@appacademy.io", password:"starwars" })); 
  }

  return (
    <>
    <div className='session-form-container'>

        <form className="session-form" onSubmit={handleSubmit}>

          <img className="socialQBlackLogo" src='/assets/images/SocialQBlackLogo.png' alt='socialQlogo'></img>
          <br/>

          <div className="errors">{errorMessage}</div>
          
          <label>
            <p className={`inputHeader ${(emailExists && !email.length) || emailErrors ? 'errors-text' : ''}`}>Email</p>
          
            <input 
              className={`formInput ${(emailExists && !email.length) || emailErrors ? 'errors-div' : ''}`}
              type="text"
              value={email}
              onBlur={()=>setEmailExists(true)}
              onChange={(e)=>{update('email')(e); setEmailExists(true); setEmailErrors(false)}}
              placeholder="Email"
            />
          </label>

          <div className="signupErrors">{emailExists && !email.length ? 'Email can\'t be blank' : ''}</div>

          <label>
            <p className={`inputHeader ${(passwordExists && !password.length) || passwordErrors ? 'errors-text' : ''}`}>Password</p>
          
            <input 
              className={`formInput ${(passwordExists && !password.length) || passwordErrors ? 'errors-div' : ''}`}
              type="password"
              value={password}
              onBlur={()=>setPasswordExists(true)}
              onChange={(e)=>{update('password')(e); setPasswordErrors(false)}}
              placeholder="Password"
            />
          </label>

          <div className="signupErrors">{passwordExists && !password.length ? 'Password can\'t be blank' : ''}</div>

          <br/>

          <input
            className={`loginButton ${email && password ? '' : 'auth-greyed-out'}`}
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />

          <button
            className='loginButton'
            type="submit"
            onClick={handleDemoLogin}
          > Demo Log In</button>
          
          <div className='signupLinkContainer'>
            <p>Don't have an account?</p> <br/>
          
            <p><Link to="/signup"className="sinupLink">Sign Up</Link></p>
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginForm;