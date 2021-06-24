import './App.css';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
import Signup from './screen/Signup';
import Home from './screen/Home';

function App() {
  return (
    
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Signup/>
        </Route>
        <Route exact path="/Home">
          <Home/>
        </Route>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
