import { Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/index.js';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <Navbar/>
      </Route>
    </Switch>
  );
}

export default App;
