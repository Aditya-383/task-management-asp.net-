import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react';

const Task = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [assignedTo, setAssignedTo] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedUser, setAssignedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectId = location.state.projectId;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7100/api/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
             console.log('project by id', response.data);
        // const list = response.data.project[0].assignedUsers.map((user) => ({
        //   name: user,
        // }));
        // console.log('list', list);
        setLoading(false);
        setAssignedUser(response.data.project[0]);
      } catch (error) {
        console.error('Error fetching in users:', error);
       
      } 
    };

    fetchUsers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName,
      taskDescription,
      assignedTo,
      taskStatus,
      startDate,
      endDate,
      projectId,
    }

    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post("https://localhost:7100/api/TaskList", taskData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      console.log('Task Created:', response.data)

      setTaskName('');
      setTaskDescription('');
      setAssignedTo('')
      setTaskStatus('Pending')
      setStartDate('')
      setEndDate('');
      setItems([]);
      setSelectedUsers('');
      alert('Task created successfully');
    } catch (error) {
      alert('Error creating task');
      console.error('Error creating task:', error);
    }
  };

  const handleUserChange = (event) => {
    const currentUser = Array.from(event.target.selectedOptions, (option) => option.value);
    setAssignedTo((prevUser) => Array.from(new Set([...prevUser, ...currentUser])));

  }

  const [items, setItems] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState('');
      const [dropdownOpen, setDropdownOpen] = useState(false);
    
      const handleSelect = (user,name) => {
        if (!assignedTo.includes(user)) {
          setAssignedTo([...assignedTo, user]);
          setItems([...items, [user,name]]);
        }
      };

      console.log('items', items);
    
      const handleRemove = (user) => {
        setAssignedTo(assignedTo.filter((s) => s !== user[0]));
         setItems(items.filter((s) => s[1] !== user[1]));
      };
    
      console.log('selectedUsers', assignedTo);
      console.log('assignedUser', assignedUser);
      const availableUsers = assignedUser.assignedUsers?.filter((user) => !assignedTo.includes(user.id));

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl text-[#1d3557] font-[500] mb-6 text-center">Create New Task</h2>

       
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-[#1d3557] font-[500] ">Task Name</label>
            <input  type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-[#1d3557] font-[500] ">Description</label>
            <textarea id="taskDescription" value={taskDescription}  onChange={(e) => setTaskDescription(e.target.value)} requiredrows="4"className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            
             <div className="w-full max-w-md mx-auto mt-6">
                  <h2 className="text-xl text-[#1d3557] font-bold mb-2">Users</h2>
                  <p className="text-sm text-gray-500 mb-2">Click to Add users</p>
            
                  <div className="relative">
                    <div
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="border border-blue-500 rounded-md px-3 py-2 cursor-pointer flex justify-between items-center"
                    >
                      <span className="text-sm text-blue-500 mb-2">Users list</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        >
                        <ChevronDownIcon className="w-6 h-5 text-blue-600" />
                      </svg>
                    </div>
            
                    {dropdownOpen && (
                      <div className="absolute z-10 w-full  mt-1 bg-white rounded shadow max-h-48 overflow-auto">
                        {availableUsers.length > 0 ? (
                          availableUsers.map((user) => (
                            <div
                              key={user.id}
                              onClick={() => {
                                handleSelect(user.id,user.name);
                                setDropdownOpen(false);
                              }}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            >
                              {user.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 px-4 py-2">No user.</div>
                        )}
                      </div>
                    )}
                  </div>
            
                  <div className="py-4 flex flex-wrap gap-2">
                    {items && items?.map((user) => (
                      <span
                        key={user}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {user[1]}
                        <button
                          onClick={() => handleRemove(user)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-[#1d3557] font-[500] ">Start Date</label>
              <input type="date"  id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 border border-[#1d3557] rounded-[30px] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[#1d3557] font-[500] ">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 border border-[#1d3557] rounded-[30px] focus:outline-none"  />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button type="submit" className="max-w-48  bg-[#1d3557] hover:bg-[#1d3557] text-white py-2 px-2 rounded-lg font-semibold transition duration-200"
            >
              Create Task
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

export default Task;
