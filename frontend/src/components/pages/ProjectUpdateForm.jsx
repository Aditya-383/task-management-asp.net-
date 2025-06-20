import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../adminSideBar";
import { useLocation } from "react-router-dom";


const ProjectUpdateForm = () => {

  const location = useLocation();
    const projectId = location.state.projectId;

  const [ProjectTitle, setProjectTitle] = useState("");
  const [Description, setDescription] = useState("");
  // const [users, setUsers] = useState([])
  const [assignedUser, setAssignedUser] = useState([])
 


  const handleSubmit = async (e) => {
    e.preventDefault();

      const projectData ={
         ProjectTitle,
          Description
      }

      Object.keys(projectData).map((key)=>{
        if(!projectData[key]){
            delete projectData[key];
        }
      })

      console.log("projectData",projectData,projectId)

    const token = localStorage.getItem("token")

    try {
          const response = await axios.patch(`https://localhost:7100/api/Project/projectUpdateByAdmin/${projectId}`,
            
            {
            projectData
            }
           ,
         {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProjectTitle("");
      setDescription("");
      setAssignedUser([]);

      console.log("response",response)
      alert("Update successful!");
    } catch (error) {
      alert("update failed!")
      console.error("error:", error);
    }
  }

  

  return (
    <div className="flex  flex-col lg:flex-row  gap-20 lg:gap-80">
      <div>
        <Sidebar />
      </div>
      <div className="grid items-start pt-20  ">
      <div className=" mx-auto p-6 bg-white shadow-md h-auto shadow-[#1d3557] rounded-[15px]">
        <h2 className="text-[32px] md:text-[44px] text-[#1d3557] text-center font-[500]">Update Project</h2>
        <div className="border-1 border-[#1d3557] h-0"></div>

        <form onSubmit={handleSubmit} className=" grid gap-2 pt-10">

          <label htmlFor="projectTitle" className="text-[#1d3557] block font-[500]">  Project Name</label>
          <input type="text" value={ProjectTitle}  onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project name...." className="w-full p-4 text-[#1d3557] border border-[#1d3557] rounded"  required
          />

         <label htmlFor="projectDescription" className="text-[#1d3557] block font-[500]">  Project Description</label>

          <textarea value={Description} name="projectDescription" placeholder="Project Description...."  onChange={(e) => setDescription(e.target.value)}  className="w-full p-4 text-[#1d3557] border border-[#1d3557] rounded"
          />

          
          <div className="flex justify-center">
            <button type="submit" className="text-white bg-[#1d3557] cursor-pointer px-4 py-2 rounded-[30px]">  Update
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ProjectUpdateForm;