import { useState, useEffect } from 'react';
// import TaskCard from './TaskCard';
import UserSideBar from "../UserSideBar";
import TaskCard from './TaskCard';
import axios from 'axios';


const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('All');

  const fetchUserTasks = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const userId = await axios.get(`https://localhost:7100/api/User/token`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("user",userId)

      // const userId =user.data._id;
      const response = await axios.get(`https://localhost:7100/api/TaskList/User/${userId.data}`);
      
       console.log("response",response);
      const userTasks = response.data.tasks;
      console.log("userTasks",userTasks,userId)
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  


  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-10">

    <div >
      <UserSideBar/>
    </div>
    <div className="mr-7 p-10 " >
      <h1 className="text-[#1d3557] text-[44px] pb-6">Your Tasks</h1>
      
        
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>

    </div>
    </div>
  );
};

export default UserTask;





