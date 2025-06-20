import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProject = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const project = location.state.data.project;
  
  return (
    <div className="grid min-h-screen bg-[#bed2ed] gap-10 justify-center items-center ">
      <div className="container grid gap-10 max-w-3xl bg-white   rounded-lg shadow-lg p-8">
        <h2 className="text-[44px] font-extrabold text-[#1d3557] mb-10 underline text-center">
          {project.projectTitle}
        </h2>

     
        <div className="mb-6">
          <h3 className="text-[30px] font-[400] underline  text-gray-800 mb-2">Description:</h3>
          <p className="text-[18px] text-gray-600">{project.description}</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-blue-50 rounded-[30px] shadow-md hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Date</h3>
            <p> {new Date(project.startDate).toLocaleDateString()}</p>
             

          </div>

     
          <div className="p-4 bg-green-100 rounded-[30px] shadow-md  hover:scale-105">
            <h3 className="text-xl font-[900] text-gray-700 mb-2">End Date</h3>
            <p> {new Date(project.endDate).toLocaleDateString()}</p>

          </div>
        </div>
        <button onClick={()=>{
            navigate(`/userTask`)
          }}     className="max-w-auto py-3 px-6   text-[#1d3557] font-[400] rounded-[30px]      mt-8 cursor-pointer "
          >
            back
          </button>
        
      </div>
      
    </div>
  );
};

export default UserProject;
