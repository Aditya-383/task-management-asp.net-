import { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegistrationForm';
import Sidebar from './components/adminSideBar.jsx';
import UserSideBar from './components/UserSidebar.jsx';
import Home from './components/pages/Home.jsx';
import AllUsers from './components/pages/AllUsers.jsx';
import CreateProject from './components/pages/CreateProject.jsx';
import CreateUser from './components/pages/CreateUser.jsx';
import AllProjects from './components/pages/AllProjects.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetails from './components/pages/ProjectDetails.jsx';
import Task from './components/pages/Task.jsx';
import RegistrationForm from './pages/RegistrationForm';
import UserHome from './components/pages/UserHome.jsx';
import UserTask from './components/pages/UserTask.jsx';
import UpdateProfile from './components/pages/UpdateProfile.jsx';
import TaskUpdateForm from './components/pages/TaskUpdateForm.jsx';
import UserEditPage from './components/pages/UserEditPage.jsx';
import UserProject from './components/pages/UserProject.jsx';
import ProjectUpdateForm from './components/pages/ProjectUpdateForm.jsx';
import Pagination from './components/pages/Pagination.jsx'

function App() {
 
  const [role, setRole] = useState(""); 
       
  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    setRole(currentRole || ""); 
  }, []); 
 

  return (
    <Router>
      <div className="flex">
        
        
        <div className="flex-grow">
          

          <Routes>
            {/* <Pagination /> */}
            {role === '' && (
               <>
               <Route path="/" element={<LoginForm setRole={setRole}/>} />
               <Route path="/signin" element={<LoginForm setRole={setRole}/>} />
               <Route path="/signup" element={<RegistrationForm />} />

             </>
            )}
            {role === 'Admin' && (
            <>
            <Route path="/home" element={<Home />} />
            <Route path="/pagi" element={<Pagination />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/updateProject" element={<ProjectUpdateForm />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/createuser" element={<CreateUser  />} />
            <Route path="/projectDetails" element={<ProjectDetails />} />
            <Route path="/projectDetails/:projectId" element={<ProjectDetails />} />
            <Route path="/taskPage" element={<Task />} />
            <Route path="/taskUpdateForm" element={<TaskUpdateForm />} />
            <Route path="/UserEditPage" element={<UserEditPage />} />
            <Route path="/" element={<Home setRole={setRole} />} /> 
            </>
            )}
            {role === 'User' && (
              <>
              {/* <Route path="/" element={<UserHome />} /> */}
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/userTask" element={<UserTask />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/viewProject" element={<UserProject />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
                