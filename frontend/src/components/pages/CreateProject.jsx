import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";
// import Selector from "./Selector";
import { ChevronDownIcon } from "lucide-react";



const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState([])
  const [selected, setSelected] = useState(false);
  const [userName, setUserName] = useState("")
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log("assignedUser", assignedUser)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = localStorage.getItem("token")
        console.log("jwt", jwt);
        const response = await axios.get("https://localhost:7100/api/User/users",
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )

        const list = response.data.map((user) => ({
          id: user.id, name: `${user.name}`,
        }))
        console.log("response", list)
        setUsers(list)
      } catch (error) {
        console.error("error", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
     console.log("assignedUser--", assignedUser);
    try {
      const response = await axios.post("https://localhost:7100/api/project",
        {
          projectTitle,
          description,
          assignedUser,
          startDate,
          endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProjectTitle("");
      setDescription("");
      setAssignedUser([]);
      setUserName("");
      setStartDate("");
      setEndDate("");
      setItems([]);
      console.log("response", response);
      alert("Project created!");
    } catch (error) {
      alert("project creation failed!")
      console.error("error:", error);
    }
  }

  // const handleUserChange = (event) => {
  //   setSelected(true);

  //   const currentUser = Array.from(event.target.selectedOptions, (option) => option.value);
  //   const currentUserNames = Array.from(event.target.selectedOptions, (option) => option.text);
  //   console.log("currentUser", currentUser, currentUserNames);
  //   setUserName(currentUserNames);
  //   setAssignedUser((prevUser) => {
  //     const updatedUser = [...prevUser, [...currentUser, ...currentUserNames]];
  //     return Array.from(new Set(updatedUser));
  //   });

  // };

  const [items, setItems] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const handleSelect = (user,name) => {
      if (!assignedUser.includes(user)) {
        setAssignedUser([...assignedUser, user]);
        setItems([...items, [user,name]]);
      }
    }
  
    const handleRemove = (user) => {
      setAssignedUser(assignedUser.filter((s) => s !== user[0]));
       setItems(items.filter((s) => s[1] !== user[1]));
    }
  
    const availableUsers = users.filter((user) => !assignedUser.includes(user.id));
  console.log("hadle user Change", assignedUser);

  return (
    <div className="flex flex-col  lg:flex-row items-start gap-10 ">
      <Sidebar />

      <div className="p-4 w-full  pt-10">

        <div className=" max-w-4xl mx-auto p-6  bg-[#ffffff] shadow-md shadow-[#1d3557] mt-10 rounded-[15px]">
          <h2 className="text-[32px] md:text-[44px] text-[#1d3557] text-center font-[500]">
            Create New Project
          </h2>
          <div className="border-2 border-[#1d3557] "></div>

          <form onSubmit={handleSubmit} className="grid ">
            <div>
              <label htmlFor="projectTitle" className="text-[#1d3557] block font-[500]"
              >
                Project Name
              </label>
              <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project name...."
                className="w-full p-4 text-[#1d3557] border border-[#1d3557] rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="projectDescription" className="text-[#1d3557] block font-[500]"
              >
                Project Description
              </label>
              <textarea value={description} name="projectDescription" placeholder="Project Description...." onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 text-[#1d3557] border   border-[#1d3557] rounded"
              />
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
          <div className="absolute  w-full  z-1 mt-1 bg-white rounded-[15px] shadow max-h-48 overflow-auto">
            {availableUsers.length > 0 ? (
              availableUsers.map((user) => (
                <div key={user.id} onClick={() => { handleSelect(user.id,user.name); setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {user.name}
                </div>
              ))
            ) : (<div className="text-blue-500 px-4 py-2">No user.</div>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-[18px] font-medium text-[#1d3557]"
                >
                  Start Date
                </label>
                <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-4 border border-blue-300 rounded-[15px] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-[18px] font-medium text-[#1d3557]"
                >
                  End Date
                </label>
                <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-4 border border-blue-300 rounded-[15px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center pt-5">
              <button type="submit" className="text-white bg-[#1d3557] cursor-pointer px-6 py-2 rounded-full w-full sm:w-auto text-center hover:bg-[#16304d] transition"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
