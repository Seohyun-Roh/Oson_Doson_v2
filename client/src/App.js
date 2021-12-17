import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./views/Main";

import LoginPage from "./views/LoginPage";
import RegisterChoicePage from "./views/RegisterChoicePage";
import UserRegisterPage from "./views/UserRegisterPage";
import HospitalRegisterPage from "./views/HospitalRegisterPage";

import AppointmentPage from "./views/AppointmentPage";
import AppointmentCheckPage from "./views/AppointmentCheckPage";

import MedHistoryPage from "./views/MedHistoryPage";

import UserManagePage from "./views/UserManagePage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/register_choice"
            element={<RegisterChoicePage />}
          />
          <Route exact path="/user_register" element={<UserRegisterPage />} />
          <Route
            exact
            path="/hospital_register"
            element={<HospitalRegisterPage />}
          />
          <Route exact path="/appt" element={<AppointmentPage />} />
          <Route exact path="/appt_check" element={<AppointmentCheckPage />} />
          <Route exact path="/med_history" element={<MedHistoryPage />} />

          <Route exact path="/usermanage" element={<UserManagePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
