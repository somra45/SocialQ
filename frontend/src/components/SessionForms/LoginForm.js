import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <>
    <div className='session-form-container'>

        <form className="session-form" onSubmit={handleSubmit}>

          <img className="socialQBlackLogo" src='/assets/images/SocialQBlackLogo.png' alt='socialQlogo'></img>
          <br/>

          <div className="errors">{errors?.email}</div>
          
          <label>
            <p className='inputHeader'>Email</p>
          
            <input 
              className='formInput'
              type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>

          <div className="errors">{errors?.password}</div>

          <label>
            <p className='inputHeader'>Password</p>
          
            <input 
              className='formInput'
              type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>

          <br/>

          <input
            className='loginButton'
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
          
          <div className='signupLinkContainer'>
            <p>Don't have an account?</p>
          
            <Link to="/signup"className="sinupLink">Sign Up</Link>
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginForm;