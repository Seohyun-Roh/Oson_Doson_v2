import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./views/Main";
import LoginPage from "./views/LoginPage";
import RegisterChoicePage from "./views/RegisterChoicePage";

import UserRegisterPage from "./views/UserRegisterPage";
import UserMyPage from "./views/UserMyPage";
import AppointmentPage from "./views/AppointmentPage";
import AppointmentCheckPage from "./views/AppointmentCheckPage";
import MedHistoryPage from "./views/MedHistoryPage";

import HospitalRegisterPage from "./views/HospitalRegisterPage";
import UserManagePage from "./views/UserManagePage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register_choice" component={RegisterChoicePage} />

          <Route exact path="/user_mypage" component={UserMyPage} />
          <Route exact path="/user_register" component={UserRegisterPage} />
          <Route exact path="/appt" component={AppointmentPage} />
          <Route exact path="/appt_check" component={AppointmentCheckPage} />
          <Route exact path="/med_history" component={MedHistoryPage} />

          <Route
            exact
            path="/hospital_register"
            component={HospitalRegisterPage}
          />
          <Route exact path="/usermanage" component={UserManagePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
