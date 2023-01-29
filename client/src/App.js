import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import UserLogin from "./components/user/UserLogin/UserLogin";
import StartedCard from "./components/user/StartedCard/StartedCard";
import FinishedCard from "./components/user/FinishedCard/FinishedCard";
import AssignedCard from "./components/user/AssignedCard/AssignedCard";
import Structure from "./components/user/Header/Header";
import UserAuthentication from "./ProtectorRoute/userAuthentication";
// -----------ADMIN SIDE IMPORTS---------------------------//
import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import AdminStructure from "./pages/admin/AdminStructure";
import ViewUsers from "./components/admin/ViewUsers/ViewUsers";
import AddUser from "./components/admin/AddUser/AddUser";
import AssignTask from "./components/admin/AssignTask/AssignTask";
import WeeklyReport from "./components/admin/WeeklyReport/WeeklyReport";
import MonthlyReport from "./components/admin/MonthlyReport/MonthlyReport";
import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import AdminAuthentication from "./ProtectorRoute/adminAuthentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserLogin />} />

        <Route element={<UserAuthentication />}>
          <Route path="" element={<Structure />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<AssignedCard />} />
            <Route path="/started" element={<StartedCard />} />
            <Route path="/finished" element={<FinishedCard />} />
          </Route>
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route element={<AdminAuthentication />}>
          <Route path="" element={<AdminStructure />}>
            <Route path="/admin"element={<Navigate replace to="/admin/dashboard" />}/>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ViewUsers />} />
            <Route path="/admin/createUser" element={<AddUser />} />
            <Route path="/admin/assignTask" element={<AssignTask />} />
            <Route path="/admin/WeeklyReport" element={<WeeklyReport />} />
            <Route path="/admin/MonthlyReport" element={<MonthlyReport />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
