import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const PAGE = 3;

const TaskPagination =({filteredTasks}) =>{
  console.log("filterProject",filteredTasks)
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag]=useState(true)
  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredTasks.length / PAGE);

  const lastIndex = currentPage * PAGE;
  const firstIndex = lastIndex - PAGE;
  const currentItems = filteredTasks.slice(firstIndex, lastIndex);

  const goToPage = (page) => {


    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }



   useEffect(() => {


   }, [flag]);
  
   const handleDelete = async (taskId) => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.delete(`https://localhost:7100/api/TaskList/${taskId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

       
      setFlag(!flag);
      alert("Task deleted successfully and please refresh the page"); 
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  }

  
  
   const handleUpdate = (taskId) => {
    navigate(`/taskUpdateForm`, {
      state: { taskId },
    });
  }

  return (
    <div className="max-w-full  mx-auto p-4">
     
      <ul className=" grid grid-cols-1 xl:grid-cols-3 gap-3 auto-h space-x-2">
        {currentItems.map((task) => (
          // <li key={item.id} className="p-3 bg-gray-100 rounded shadow-sm">
           <li key={task.id} className=" justify-between bg-gray-100 rounded-[15px] p-4 max-h-70 overflow-x-auto shadow-md  ">
            <div className="text-lg text-gray-700">
                  <p className="text-blue-500 font-[500]  underline">{task.taskName}</p>
                  <p> {task.taskDescription}</p>
                  <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>

                  <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
                  <p>Status: {task.taskStatus}</p>

                </div>



                <div className=" flex gap-5">
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
        ))}
      </ul>

      <div className="flex justify-center gap-5 space-x-2 pt-6">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}  className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1? "bg-blue-600 text-white": "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1   bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TaskPagination;  