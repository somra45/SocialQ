import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/tweets'}><i className="fa-solid fa-house fa-2xl" style={{color: "#f6f4eb"}}></i></Link>
          <Link to={'/tweets/new'}><i className="fa-solid fa-circle-plus fa-2xl" style={{color: "#f6f4eb"}}></i></Link>
          <Link to={'/profile'}><i className="fa-solid fa-user fa-2xl" style={{color: "#f6f4eb"}}></i></Link>
          <Link to={'/calendar'}><i class="fa-solid fa-calendar-days fa-2xl" style={{color: "#f6f4eb"}}></i></Link>
          <button className="navbarLogout" onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div className='navbarContainer'>
        
        <img className="navbarLogo" src='/assets/images/SocialQOffWhite.png' alt='socialQlogo'></img>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;