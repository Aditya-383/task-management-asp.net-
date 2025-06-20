import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";
import { useNavigate } from "react-router-dom";
import { MdClear } from "react-icons/md";
import Pagination from "./Pagination";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProject, setFilteredProject] = useState();
  const [search, setSearch] = useState();
  const [flag, setFlag] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cursor, setCursor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7100/api/Project/pagi", {
          params: {
            pageNumber: 1,
          }
            headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("response", response)
        setProjects(response.data.project);
        // setCursor(response.data.nextCursor);
        console.log("projects", response.data.nextCursor);
        setFilteredProject(response.data.project);
      } catch (error) {
        console.error("Error in projects", error);
      }
    };

    fetchProjects();
  }, [flag]);

 

  const handleInput = (e) => {
    setSearch(e.target.value);
  }


  const filterProject = async (text) => {
    text = text.trim();
    if (!text) {
      setFilteredProject(projects);
      setFilterActive(false);
      return;
    }


    try {
      const searchFilterResponse = await axios.get(`https://localhost:7100/api/Project/Title/${text}`);

      console.log("searchFilterResponse", searchFilterResponse.data)



      setFilteredProject(searchFilterResponse.data.projects);

      setFilterActive(true);

    }
    catch (error) {
      console.log("error", error)
      alert("No project found!");
      setFilteredProject(projects);
      setFilterActive(false);
    }
    // const filtered = projects.filter((project) =>
    //   project.projectTitle?.toLowerCase().includes(text.toLowerCase())
    // );
    // setFilteredProject(filtered);
    // setFilterActive(true);
  }

  const handleSearch = () => {
    filterProject(search);
  }

  const handleClearFilter = () => {
    setFilteredProject(projects);
    setFilterActive(false);
  }

  const handleCreatedDate = async(e) => {
    const date = e.target.value;

      console.log("date", date)
    

 try {
      const startDateFilterResponse = await axios.get(`https://localhost:7100/api/Project/by-date/${date}`, {
        params: {
           value:"start-date"
        }
      }

      );

      console.log("startDateFilterResponse", startDateFilterResponse)



      setFilteredProject(startDateFilterResponse.data);
      setFilterActive(true);

    }
    catch (error) {
      console.log("error", error)
      alert("No tasks found with this date");
      setFilteredProject(tasks);
      setFilterActive(false);
    }

    // const filtered = projects.filter((project) => {
    //   const projectDate = new Date(project.startDate).toISOString().split("T")[0];
    //   return projectDate === date;
    // });

    // setFilteredProject(filtered);
    // setFilterActive(true);
  }

  const handleEndDate = async(e) => {
    const date = e.target.value;

    console.log("date", date)

    try {
      const startDateFilterResponse = await axios.get(`https://localhost:7100/api/Project/by-date/${date}`, {
        params: {
           value:"end-date"
        }
      }

      );

      console.log("startDateFilterResponse", startDateFilterResponse)



      setFilteredProject(startDateFilterResponse.data);
      setFilterActive(true);

    }
    catch (error) {
      console.log("error", error)
      alert("No tasks found with this date");
      setFilteredProject(projects);
      setFilterActive(false);
    }
    // const filtered = projects.filter((project) => {
    //   const projectDate = new Date(project.endDate).toISOString().split("T")[0];
    //   return projectDate === date;
    // });

    // setFilteredProject(filtered);
    // setFilterActive(true);
  }


   console.log("filteredProject in all project", filteredProject)
  return (
    <div className="flex  flex-col lg:flex-row h-screen    w-full   ">
      <Sidebar />

      <div className="flex-1 px-4 sm:px-6 max-w-screen   lg:px-12 py-2  ">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-[#1d3557] ">

          All Projects
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-2 py-4  ">

          <div className="flex   border-indigo-900 rounded-[15px] bg-white shadow-sm py-0 items-center">
            <input type="text" value={search} onChange={handleInput} placeholder="Search by project name" className=" w-full outline-none   text-[12px] focus:ring-0 text-gray-700 px-2" />
            <button onClick={handleSearch} className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3.5 px-4 outline-none rounded-lg text-sm" >
              Search
            </button>
          </div>


          <div className="flex flex-col">
            <input type="date" value={createdDate} onChange={handleCreatedDate} className="border border-[#dfecff] shadow-blue-400 rounded px-2 py-1    text-[12px] max-w-30"
            />
            <label className="text-[#1d3557] text-sm font-[500]  ">Created Date</label>
          </div>


          <div className="flex flex-col">
            <input type="date" value={endDate} onChange={handleEndDate} className="border border-[#dfecff] shadow-blue-400 rounded   px-2 py-1 text-[12px] max-w-30" />
            <label className="text-[#1d3557] font-[500] text-[14px] ">End Date</label>
          </div>


          {filterActive && (
            <div className="flex items-end">
              <button onClick={handleClearFilter} className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm  flex items-center justify-center gap-2"
              > <MdClear className="text-lg" />
                Clear
              </button>
            </div>
          )}
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {filteredProject && filteredProject.map((project) => (
            <div key={project._id} className="bg-white rounded-[30px] h-auto shadow-lg p-4   border border-pink-200">
              <h2 className="text-xl font-semibold text-pink-700 pb-2 underline">     {project.projectTitle}
              </h2>
              <p className="text-[#80a6db] pb-3">{project.description}</p>

              <h3 className="font-medium text-[#1d3557] pb-1">Assigned Users:</h3>
              <div className="mb-4 pb-5">
                <select className="w-full bg-blue-300 text-white border border-[#1d3557] rounded p-2 text-sm">
                  <option disabled>List of assigned users</option>
                  {project.assignedUser.length > 0 ? (project.assignedUser.map((user) => (
                    <option >{user}</option>
                  ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>

              <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>


              <div className="flex flex-col sm:flex-row text-[#1d3557] sm:justify-between sm:items-center gap-2 pt-4 text-sm font-[500] ">
                <button onClick={() => handleSubmit(project.id)} className="text-blue-600 cursor-pointer hover:text-blue-800 transition-transform hover:scale-105"
                >
                  View Details
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-green-600 cursor-pointer hover:text-green-800 transition-transform hover:scale-105"
                >
                  Delete
                </button>
                <button onClick={() => handleUpdate(project.id)} className="text-amber-600 cursor-pointer hover:text-amber-800 transition-transform hover:scale-105"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {filteredProject && <Pagination filteredProject={filteredProject}/>}
      </div>
    </div>
  );
};

export default AllProjects;
