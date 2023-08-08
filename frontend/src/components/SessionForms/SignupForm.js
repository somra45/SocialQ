import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <div className='session-form-container'>
        <form className="session-form" onSubmit={handleSubmit}>
          
            <img className="socialQBlackLogo" src='/assets/images/SocialQBlackLogo.png' alt='socialQlogo'></img>
            
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

            <div className="errors">{errors?.username}</div>
            
            <label>
              <p className='inputHeader'>Full Name</p>
              <input 
                className='formInput'
                type="text"
                value={username}
                onChange={update('username')}
                placeholder="Full Name"
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

            <div className="passwordErrors">
              {password !== password2 && 'Confirm Password field must match'}
            </div>

            <label>
              <p className='inputHeader'>Confirm Password</p>
              <input 
                className='formInput'
                type="password"
                value={password2}
                onChange={update('password2')}
                placeholder="Confirm Password"
              />
            </label>

            <input
              className='loginButton'
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />

            <div className='signupLinkContainer'>
              <p>Already have an account?</p>
            
              <Link to="/login"className="sinupLink">Sign in</Link>
            </div>
        </form>
    </div>
  );
}

export default SignupForm;