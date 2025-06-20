import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Eye, Trash2, Pencil,ChevronLeft,ChevronRight,} from "lucide-react"; 
import ProjectDropDown from "./ProjectDropDown";

const page = 6;

const Pagination = ({ filteredProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");  
  }, [flag]);
  const totalPages = Math.ceil(filteredProject.length / page);
  const lastIndex = currentPage * page;
  const firstIndex = lastIndex - page;
  const currentItems = filteredProject.slice(firstIndex, lastIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = (projectId) => {
    navigate(`/projectDetails/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.delete(`https://localhost:7100/api/Project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setFlag(!flag);
    alert("Project deleted successfully");
    } catch (err) {
      alert("Error deleting project");
      console.log("error:", err.message);
    }
  };

  const handleUpdate = (projectId) => {
    navigate(`/updateProject`, { state: { projectId } });
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <ul className="grid grid-cols-1   md:grid-cols-2 xl:grid-cols-3 gap-3 auto-h space-x-2">
        {currentItems.map((project) => (
          <div key={project.id} className="bg-white rounded-[15px] max-h-70          max-w-100 overflow-x-auto   shadow-lg p-3 border border-[#FFF8EF]"
          >
            <h2 className="text-xl font-semibold max-w-100 text-pink-700 pb-1 underline">
              {project.projectTitle}
            </h2>
            <h2 className="text-[#80a6db] max-w-70 pb-3">{project.description}</h2>

           <div className="flex gap-2 items-center">

            <h3 className="font-medium text-[#1d3557] pb-1">Assigned Users:</h3>
            {/* <div className="mb-4 pb-5">
              <select className="w-full bg-blue-300 text-white border border-[#1d3557] rounded p-2 text-sm">
                <option disabled>List of assigned users</option>
                {project.assignedUser.length > 0 &&
                  project.assignedUser.map((user, i) => (
                    <option key={i}>{user}</option>
                  ))}
              </select>
            </div> */}
           { project && <ProjectDropDown assignedUsers={project.assignedUsers}/>}
           </div>

            {/* <div className="border border-[#1d3557] rounded-lg p-3 bg-[#f0f8ff] shadow-inner">
  <h4 className="text-[#1d3557] font-semibold mb-2">Assigned Users</h4>
  <div className="max-h-40 overflow-y-auto space-y-2">
    {project.assignedUser.length > 0 ? (
      project.assignedUser.map((user, index) => (
        <div
          key={index}
          className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm font-medium w-fit shadow-sm hover:bg-blue-300 transition-all"
        >
          {user}
        </div>
      ))
    ) : (
      <p className="text-gray-500 italic">No users assigned</p>
    )}
  </div>
</div> */}


            <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>
            <p className="text-[#1d3557] font-semibold">CreatedBy: {project.createdBy}</p>

            <div className="flex flex-col sm:flex-row text-[#1d3557] sm:justify-between sm:items-center gap-2 pt-4 text-sm font-[500]">
              <button
                onClick={() => handleSubmit(project.id)}
                className="flex items-center gap-1 text-blue-600 cursor-pointer hover:text-blue-800 transition-transform hover:scale-105"
              >
                <Eye size={16} /> View
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="flex items-center gap-1 text-green-600 cursor-pointer hover:text-green-800 transition-transform hover:scale-105"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={() => handleUpdate(project.id)}
                className="flex items-center gap-1 text-amber-600 cursor-pointer hover:text-amber-800 transition-transform hover:scale-105"
              >
                <Pencil size={16} /> Update
              </button>
            </div>
          </div>
        ))}
      </ul>

      <div className="flex justify-center gap-5 space-x-2 pt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1? " text-white bg-blue-600": " hover:bg-gray-300      bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
