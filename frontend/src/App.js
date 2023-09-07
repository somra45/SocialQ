import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar.js';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Tweets from './components/Tweets/Tweets';
import Profile from './components/Profile/Profile';
import otherUserProfile from './components/Profile/OtherUserProfile';

import { getCurrentUser } from './store/session';
import TweetGenerate from './components/Tweets/TweetGenerate';
import BigCalendar from './components/BigCalendar/BigCalendar';
import AboutPage from './components/AboutPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      {/* <NavBar /> */}
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/about" component={AboutPage} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/users/:username" component={otherUserProfile} />
        <ProtectedRoute exact path="/tweets/new" component={TweetGenerate} />
        <ProtectedRoute exact path="/calendar" component={BigCalendar} />
      </Switch>
    </>
  );
}

export default App;