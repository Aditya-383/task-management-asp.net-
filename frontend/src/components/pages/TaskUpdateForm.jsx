import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskUpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [assignedTo, setAssignedTo] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const taskId = location.state.taskId;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName,
      taskDescription,
      taskStatus,
      startDate,
      endDate,
    };

    Object.keys(taskData).forEach((key) => {
      if (!taskData[key]) {
        delete taskData[key];
      }
    });

    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.patch(`https://localhost:7100/api/TaskList/admin/${taskId}`, taskData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('Task Updated:', response.data);

      
      setTaskName('');
      setTaskDescription('');
      setTaskStatus('Pending');
      setStartDate('');
      setEndDate('');
      alert("successful")
    } catch (error) {
      alert("failed")
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF]   flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl bg-white    p-6 md:p-10 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl    text-[#1d3557] font-semibold mb-6 text-center">Update Task</h2>

        <form onSubmit={handleFormSubmit} >
          <div>
            <label htmlFor="taskName" className="block text-[#1d3557] font-[500] mb-1">Task Name</label>
            <input  type="text"  id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-[#1d3557] font-[500] mb-1">Description</label>
            <textarea  id="taskDescription"  value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} rows="4"
              className="w-full px-4     py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="taskStatus" className="block text-[#1d3557] font-[500] mb-1">Status</label>
            <select id="taskStatus"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-[#1d3557] font-medium mb-1">Start Date</label>
              <input  type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#1d3557] rounded-lg focus:outline-none" required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[#1d3557] font-medium mb-1">End Date</label>
              <input type="date"  name="endDate"  value={endDate} onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#1d3557] rounded-lg focus:outline-none" required
              />
            </div>
          </div>

          <div className="flex justify-center pt-10">
            <button
              type="submit"
              className="max-w-50   px-3 cursor-pointer bg-[#1d3557] hover:bg-[#1d3557] text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Update Task
            </button>
            
          </div>
        </form>
        <button onClick={()=>{
            navigate(-1)
          }}     className="max-w-auto py-3 px-6   text-[#1d3557] font-[400] rounded-[30px]      mt-8 cursor-pointer "
          >
            back
          </button>
      </section>
    </div>
  );
};

export default TaskUpdateForm;
