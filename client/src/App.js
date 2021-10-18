import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Main from './views/Main';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import UserManagePage from './views/UserManagePage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/usermanage" component={UserManagePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;