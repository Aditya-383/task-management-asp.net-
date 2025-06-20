import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const [status, setStatus] = useState(task.status);
    const navigate = useNavigate();
    const [flag,setFlag] = useState(true);
  console.log("task",task)

   useEffect(()=>{
      
   },[flag])
  const handleStatusChange = async (e) => {
   

    try {
      console.log("hello",status)
      const response = await axios.patch(`https://localhost:7100/api/TaskList/user/${task.id}`, 
        // { status: status },
        JSON.stringify(status),
    {
    headers: {
      'Content-Type': 'application/json'
    }});
      setFlag(!flag);
      console.log('Status updated successfully:', response.data);
      alert("updation successful and please refresh the page");
    } catch (error) {
      alert("updation failed")
      console.error('Error updating task status:', error);
    }
  }

  const handleProject= async()=>{
    try {
      console.log("hello",status)
      const projectId = task.projectId;
      const response = await axios.get(`https://localhost:7100/api/Project/${projectId}`);
      
      console.log('data project successfully:', response.data);
      const data = response.data;
      navigate(`/viewProject`,{
        state:{data}
      })
   
    } catch (error) {
    
      console.error('Error fetching project status:', error);
    }
  }

  return (
    <div className="bg-white shadow-[#1d3557] shadow-lg rounded-[30px]  gap-9 p-6 border border-[#1d3557]">
      <div className='flex items-center justify-between gap-2 py-5'>

      <h3 className="text-[25px] font-[400] text[#1d3557]">{task.taskName}</h3>
      <button  onClick={handleProject} class="lucid-button lucid-button--primary text-[13px] text-blue-400 underline cursor-pointer ">
  view project
</button>
      </div>
      <p className="text-gray-900 pt-2">{task.taskDescription}</p>
      <div className="pt-4">
            <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>

      </div>

      <div className="mt-6 grid gap-2">
        <p className="text-[#1d3557] ">Status: {task.taskStatus}</p>
        <select 
          value={status}   onChange={(e)=>(setStatus(e.target.value))}  className="mt-2 cursor-pointer  bg-[#eef3fa] border  text-blue-700   text-[16px] rounded-[15px]  w-full "
        >
          <option value="">Update status</option>
          <option value="Pending">Pending</option>
              
               <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={handleStatusChange} className='bg-[#1d3557] rounded-[15px] text-[18px] cursor-pointer py-2 px-4 text-white'>update</button>
      </div>
    </div>
  )
}

export default TaskCard;
