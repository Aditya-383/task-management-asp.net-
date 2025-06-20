import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdClear, MdSearch } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7100/api/User", {
          headers: { Authorization: `Bearer ${jwt}` },
        });

         console.log("response",response);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // alert("Error in users");
      }
    };

    fetchUsers();
  }, []);

 

  const handleSearch= (e)=>{
    filterUsers(searchText);
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };


  const filterUsers = async(text) => {
    if (!text) {
      setFilteredUsers(users);
      setFilterActive(false);
      return;
    }


    
         try {
          const searchFilterResponse = await axios.get(`https://localhost:7100/api/User/name/${text}`);
    
          console.log("searchFilterResponse", searchFilterResponse.data)
    
    
    
          // setFilteredTasks(searchFilterResponse.data);
          // const values = Object.values(searchFilterResponse);
          setFilteredUsers(searchFilterResponse.data.user);
          console.log("values", filteredUsers)
          setFilterActive(true);
    
        }
        catch (error) {
          console.log("error", error)
          alert("No user found!");
          setFilteredUsers(tasks);
          setFilterActive(false);
        }

    // const filtered = users.filter((user) =>
    //   user.name?.toLowerCase().includes(text.toLowerCase())
    // );
    // setFilteredUsers(filtered);
    // setFilterActive(true);
  };

  const handleClearFilter = () => {
    setSearchText("");
    // setFilterType("name");
    console.log("users", users);
    setFilteredUsers(users);
    setFilterActive(false);
  };

  const handleEdit = (userId) => {
    navigate(`/UserEditPage`, { state: { userId } });
  };

  const handleDelete = async (userId) => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.delete(`https://localhost:7100/api/User/${userId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("User deletion failed");
    }
  }


  const filterUserByStatus= async(value)=>{
    const active = value === "true";


     try {
          const statusFilterResponse = await axios.get(`https://localhost:7100/api/User/status/${active}`);
    
          console.log("searchFilterResponse", statusFilterResponse.data)
    
    
    
          // setFilteredTasks(searchFilterResponse.data);
          // const values = Object.values(searchFilterResponse);
          setFilteredUsers(statusFilterResponse.data.user);
          setFilterActive(true);
    
        }
        catch (error) {
          console.log("error", error)
          alert("No user found!");
          setFilteredUsers(users);
          setFilterActive(false);
        }
    // const filtered = users.filter((user) =>
    // ( user.isActive === active)
    // )
    // setFilteredUsers(filtered)
    // setFilterActive(true);
  }
  const handleStatus =  (e) => {
      const value = e.target.value;
      console.log("value",value)
      filterUserByStatus(value);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10   sm:gap-20">
      <Sidebar />
      <div className=" w-full pt-10 pb-2 px-1 md:px-4">
        <h2 className="text-[44px] mt-50 font-[500] text-left  text-[#1d3557]">All Users</h2>
        <div className="border-2 h-0 border-[#1d3557] mb-6"></div>

       
        <div className="flex flex-col lg:flex-row items-center gap-4 py-10">
            <div className="flex border-2    bg-white   border-indigo-900   rounded-[15px] items-center">
                <MdSearch className="text-[24px]  text-gray-700" />
             <input type="text" value={searchText} onChange={handleInput} placeholder="Search by name"  className="ml-2 bg-white outline-none text-[18px] w-[200px]"
            />
            <button       onClick={handleSearch} className=" bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-[15px]"
            > Search
            </button>
          </div>

         <div className="flex gap-2">
           <label className="flex items-center gap-2 text-[18px] font-[500">
        <input  type="radio"  name="status" value="true"   onChange={handleStatus}  className="cursor-pointer"
        />
        Active
      </label>

      <label className="flex items-center gap-2 cursor-pointer text-[18px] font-[500]">
        <input type="radio" name="status" value="false"
          
          onChange={handleStatus}
          
            className="cursor-pointer"
        />
        Inactive
      </label>
         </div>
          {filterActive && (
                <button onClick={handleClearFilter} className="bg-red-500 hover:bg-red-600 text-white cursor-pointer pr-1 pl-2  md:py-1 rounded-[50px] flex items-center gap-2"
            >
              <MdClear />
              Clear
            </button>
          )}
        </div>

        <div className=" w-full">
  <table className="min-w-full  shadow-md rounded-lg text-sm sm:text-base">
    <thead className="bg-[#b5d1f8] text-[#1d3557]">
      <tr>
           <th className=" px-0 md:px-4 py-2 text-center">Name</th>
           <th className="px-0 md:px-4 text-center">Email</th>
           <th className="px-0 md:px-4 text-center">Status</th>
            <th className="px-0 md:px-4 text-center">Role</th>
           <th className="px-0 md:px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers && filteredUsers.map((user) => (
        <tr key={user.id} className="text-gray-700 bg-white hover:bg-gray-200 transition">
            <td className="px-0 md:px-4 py-2 text-[11px] sm:text-[15px] text-center ">{user.name}</td>
              <td className="px-0 md:px-4 py-2 text-[11px] sm:text-[11px]  text-center w-auto">{user.email}</td>
              <td className="px-0 md:px-4 py-2 text-[11px] sm:text-[11px] text-center  w-auto">{user.isActive ? "Active" : "Inactive"}</td>
               <td className="px-0 md:px-4 py-2 text-[11px] sm:text-[12px] text-center  w-auto">{user.role}</td>

             <td className="px-0 md:px-4 py-2 ">
            <div className="flex justify-center gap-1">
              <button
                onClick={() => handleEdit(user.id)} className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition"
              >
                <FaTrashAlt />
              </button>
            </div>
             </td>
        </tr>
      ))}
      {filteredUsers?.length === 0 && (
        <tr>
          <td colSpan="3"   className="    text-center py-2   md:py-4 text-gray-500">    No user present.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default AllUsers;
