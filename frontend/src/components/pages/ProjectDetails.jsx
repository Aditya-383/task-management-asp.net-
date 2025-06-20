import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import DropDown from './DropDown';
import { MdClear, MdSearch } from 'react-icons/md';
import Task from './Task';
import TaskPagination from './TaskPagination';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [search, setSearch] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    const fetchProjectData = async () => {
      try {
        console.log("projectId", projectId)
        const response = await axios.get(`https://localhost:7100/api/project/${projectId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        const projectData = response.data.project[0];
        setProjectName(projectData.projectTitle);
        setProjectDescription(projectData.description);
        console.log("response--", response.data)
      } catch (error) {
        console.error('Error fetching project data:', error);
      }

      try {
        const tasksResponse = await axios.get(`https://localhost:7100/api/TaskList/Project/${projectId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        const task = tasksResponse.data.tasks;
        console.log("task", task)
        setAssignedUsers(task);
        setTasks(task);
        setFilteredTasks(task);
        console.log("taskresponse", tasksResponse.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchProjectData();
  }, [projectId, flag]);

  const handleDelete = async (taskId) => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.delete(`https://localhost:7100/api/TaskList/${taskId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setFlag(!flag);
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  }

  const handleTask = () => {
    navigate(`/taskPage`, {
      state: { projectId },
    });
  }


  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = async () => {
    const text = search.trim();
    if (!text) {
      setFilteredTasks(tasks);
      setFilterActive(false);
      return;
    }
    try {
      const titleFilterResponse = await axios.get(`https://localhost:7100/api/TaskList/Title/${text}`, {
        params: {
          projectId: projectId
        }
      }

      );

      console.log("titleFilterResponse", titleFilterResponse.data.tasks)



      setFilteredTasks(titleFilterResponse.data.tasks);
      setFilterActive(true);

    }
    catch (error) {
      alert("No tasks found with this status");
      setFilteredTasks(tasks);
      setFilterActive(false);
    }
  }

  const handleClearFilter = () => {
    setFilterActive(false);
    setFilteredTasks(tasks);
    setSearch('');
    setCreatedDate('');
    setEndDate('');
  }

  const handleCreatedDate = async (e) => {
    const date = e.target.value;
    setCreatedDate(date);

    console.log("startdate", date)
    try {
      const startDateFilterResponse = await axios.get(`https://localhost:7100/api/TaskList/by-date/${date}`, {
        params: {
          projectId: projectId,
          value: "start-date"
        }
      }

      );

      console.log("startDateFilterResponse", startDateFilterResponse)



      setFilteredTasks(startDateFilterResponse.data);
      setFilterActive(true);

    }
    catch (error) {
      console.log("error", error)
      alert("No tasks found with this date");
      setFilteredTasks(tasks);
      setFilterActive(false);
    }

    // const filtered = tasks.filter((task) => {
    //   const taskStartDate = new Date(task.startDate).toISOString().split("T")[0];
    //   // console.log("taskdate", task?.startDate, date)
    //   return (task?.startDate?.split("T")[0]) === date;
    // });

    // console.log("filtered date".filtered)
    // setFilteredTasks(filtered);
    // setFilterActive(true);
  }

  const handleEndDate = async (e) => {
    const date = e.target.value;
    setEndDate(date);
    console.log("end", date)


    try {
      const endDateFilterResponse = await axios.get(`https://localhost:7100/api/TaskList/by-date/${date}`, {
        params: {
          projectId: projectId,
          value: "end-date"
        }
      }

      );

      console.log("endDateFilterResponse", endDateFilterResponse.data)



      setFilteredTasks(endDateFilterResponse.data);
      setFilterActive(true);

    }
    catch (error) {
      console.log("error", error)
      alert("No tasks found with this date");
      setFilteredTasks(tasks);
      setFilterActive(false);
    }
    // const filtered = tasks.filter((task) => {
    //   const taskEndDate = new Date(task.endDate).toISOString().split("T")[0];
    //   return taskEndDate === date;
    // });

    // setFilteredTasks(filtered);
    // setFilterActive(true);
  }

  const handleStatus = async (e) => {
    const value = e.target.value;
    try {
      const statusFilterResponse = await axios.get(`https://localhost:7100/api/TaskList/Status/${value}`, {
        params: {
          projectId: projectId
        }
      });


      console.log("statusFilterResponse", statusFilterResponse.data.tasks)
      // const filtered = tasks.filter((task) =>

      //   task.taskStatus?.toLowerCase().trim() == value.toLowerCase().trim()
      // )

      // console.log("filtered", filtered);

      setFilteredTasks(statusFilterResponse.data.tasks);
      setFilterActive(true);
    }
    catch (error) {
      alert("No tasks found with this status");
      setFilteredTasks(tasks);
      setFilterActive(false);
    }
  }

  // console.log("tasks", tasks)

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex justify-center items-center md:py-6 md:px-8">
      <div className="w-full bg-white rounded-[30px] shadow-2xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-[52px] font-[500] text-[#1d3557] mb-4 underline pb-4">{projectName}</h1>
          <p className="text-lg    text-[#1d3557]">{projectDescription}</p>
        </div>

        <section className="mb-8 flex gap-2">
          <h2 className="text-[18px] text-[#1d3557] font-[400]">Assigned Users</h2>
          <div className="flex flex-col  pb-10">
            {filteredTasks && <DropDown assignedUsers={filteredTasks} />}
          </div>
        </section>

        <section className="my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center xl:grid-cols-4 gap-6">
            <h2 className="text-2xl text-[#1d3557] font-[500]    col-span-full mb-2">Existing Tasks</h2>

            


            <div className="flex border-2  bg-white   border-indigo-900 max-w-55 sm:max-w-68 md:max-w-74   rounded-[15px] items-center">
                <MdSearch className="text-[24px]  text-gray-700" />
             <input type="text" value={search} onChange={handleInput} placeholder="Search by name"  className="ml-2 bg-white outline-none text-[12px] sm:text-[18px] w-[200px]"
            />
            <button       onClick={handleSearch} className=" bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 text-[12px] md:text-[20px] rounded-[15px]"
            > Search
            </button>
          </div>


            <div className="flex flex-col">
              <input type="date" value={createdDate} onChange={handleCreatedDate} className="border max-w-100 border-[#1d3557] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
              />
              <label className="text-gray-700 font-bold text-sm mb-1">Created date</label>
            </div>

            <div className="flex flex-col">
              <input type="date" value={endDate} onChange={handleEndDate} className="border max-w-100 cursor-pointer border-[#1d3557] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
              />
              <label className="text-gray-700 font-bold text-sm mb-1">End date</label>
            </div>

            <select name="" id="" className=' border border-[#b5b0a9] font-sans shadow-blue-950 rounded-[10px] py-2 max-w-50 max-h-10 ' onChange={handleStatus}>
              <option value="" className='bg-[#1d3557] text-sm  '>filter by status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {filterActive && (
              <div className="flex items-end">
                <button onClick={handleClearFilter} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <MdClear className="text-lg" />
                  Clear
                </button>
              </div>
            )}



          </div>

          <ul className="flex flex-col flex-wrap pt-6 gap-10 pb-10">
            {/* {filteredTasks?.map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-gray-100 rounded-[15px] p-4  shadow-md  ">
                <div className="text-lg text-gray-700">
                  <p className="text-blue-500 font-[500]  underline">{task.taskName}</p>
                  <p> {task.taskDescription}</p>
                  <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>

                  <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
                  <p>Status: {task.taskStatus}</p>

                </div>



                <div className="flex gap-5">
                  <button onClick={() => handleDelete(task.id)} className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-full focus:outline-none"
                  >
                    <FaTrashAlt />
                  </button>
                  <button onClick={() => handleUpdate(task.id)} className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full focus:outline-none"
                  >
                    <FaEdit />
                  </button>
                </div>
              </li>
            ))} */}

            <TaskPagination filteredTasks={filteredTasks} />
          </ul>
        </section>

        <div className='flex justify-center items-center'>

          <button onClick={handleTask} className="max-w-auto py-3 px-6  bg-[#1d3557] hover:bg-[#1d3557] text-white font-[400] rounded-[30px]     shadow-md mt-8 cursor-pointer "
          >
            Create New Task
          </button>
          <button onClick={() => {
            navigate(`/allProjects`)
          }} className="max-w-auto py-3 px-6   text-[#1d3557] font-[400] rounded-[30px]      mt-8 cursor-pointer "
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
