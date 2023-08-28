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

  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists,setUsernameExists] = useState(false);
  const [passwordExists, setPasswordExists] = useState(false);
  const [password2Exists, setPassword2Exists] = useState(false);
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState(null)
  const [emailErrors, setEmailErrors] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState(false);
  const dispatch = useDispatch();

  function validateEmail(email) {
    // Define the regex pattern for email validation
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  
    // Test the email against the pattern
    return pattern.test(email);
  }

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

  const updateFile = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image
    };

    const resErrors = await dispatch(signup(user)); 
    setErrors(resErrors.errors);
    setEmailErrors(true);
    setUsernameErrors(true);
  }

  return (
    <div className='signup-session-form-container'>
        <form className="signup-session-form" onSubmit={handleSubmit}>
          
            <img className="socialQBlackLogoSignUp" src='/assets/images/SocialQBlackLogo.png' alt='socialQlogo'></img>
            
            <label>
              <p className={`inputHeader ${(emailExists && !email.length) || emailErrors ? 'errors-text' : ''}`}>Email</p>
              <input 
                className={`formInput ${(emailExists && !email.length) || emailErrors ? 'errors-div' : ''}`}
                type="text"
                value={email}
                onBlur={()=>setEmailExists(true)}
                onChange={e=>{update('email')(e); setEmailErrors(false); validateEmail(email) ? setEmailErrors(false) : setEmailErrors(true)}}
                placeholder="Email"
              />
            </label>
            <div className="signupErrors">{errors?.email}</div>

            <div className="signupErrors">
              <p>{emailExists && !email.length && 'Email can\'t be blank'} {email && !validateEmail(email) && 'Invalid email address'}</p>
            </div>
            
            <label>
              <p className={`inputHeader ${(usernameExists && !username.length) || usernameErrors ? 'errors-text' : ''}`}>Full Name</p>
              <input 
                className={`formInput ${(usernameExists && !username.length) || usernameErrors ? 'errors-div' : ''}`}
                type="text"
                value={username}
                onBlur={()=>setUsernameExists(true)}
                onChange={e=>{update('username')(e); setUsernameErrors(false)}}
                placeholder="Full Name"
              />
            </label>

            <div className="signupErrors">{errors?.username}</div>
            <div className="signupErrors">
              <p>{usernameExists && !username.length && 'Full Name can\'t be blank'}</p><br/>
            </div>
            
            <label>
              <p className={`inputHeader ${passwordExists && (password.length < 8 || password !== password2) ? 'errors-text' : ''}`}>Password</p>
              <input 
                className={`formInput ${passwordExists && (password.length < 8 || password !== password2) ? 'errors-div' : ''}`}
                type="password"
                value={password}
                onBlur={()=>setPasswordExists(true)}
                onChange={(e)=>update('password')(e)}
                placeholder="Password"
              />
            </label>

            <div className="signupErrors">
              <p>{passwordExists && password.length < 8 && 'Password must 8 or more characters'}</p><br/>
            </div>

            <label>
              <p className={`inputHeader ${passwordExists && (password.length < 8 || password !== password2) ? 'errors-text' : ''}`}>Confirm Password</p>
              <input 
                className={`formInput ${passwordExists && (password.length < 8 || password !== password2) ? 'errors-div' : ''}`}
                type="password"
                value={password2}
                onBlur={()=>setPasswordExists(true)}
                onChange={e=>update('password2')(e)}
                placeholder="Confirm Password"
              />
            </label>

            <div className="signupErrors">
              <p>{passwordExists && password !== password2 && 'Passwords must match'}</p>
            </div>

            <p className='inputHeader'>Profile Picture</p>
            <label>
              <input  className="formInput upload-button"type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
            </label>

            <input
              className={`loginButton ${email && username && password && password === password2 ? '' : 'auth-greyed-out'}`}
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />

            <div className='signupLinkContainer'>
              <p className='signup-link'>Already have an account?</p>
            
              <Link to="/login"className="sinupLink">Sign in</Link>
            </div>
        </form>
    </div>
  );
}

export default SignupForm;