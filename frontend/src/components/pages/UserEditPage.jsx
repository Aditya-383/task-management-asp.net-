import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: "",
    isActive: true,  
  });
  const [error, setError] = useState(null);
  console.log("location",location)
  const userId = location.state.userId; 
  

console.log("userId",userId)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.patch(
        `https://localhost:7100/api/User/${userId}`,
        {
          ...userData,
           isActive:( userData.isActive === "true"), 
           },
        {
           headers: { Authorization: `Bearer ${jwt}` },
        }
      );

        console.log("User updated:", response.data);
        navigate("/Allusers"); 
       alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("User update failed");
    }
  };

 
  return (
    <div className="p-20  bg-[#eef2f8] h-screen">

      <h2 className="text-[44px] mt-10 font-[500] text-left text-[#1d3557]">Edit User</h2>
    <div className="grid rounded-[15px] bg-[#eaecef] shadow shadow-[#1d3557]  "> 
     
      <form onSubmit={handleUpdate} className="grid gap-5  items-center  p-10">
        <div>
          <label htmlFor="name" className="block text-sm text-[#1d3557]">
            Update name:
          </label>
          <input type="text" name="name" value={userData.name} placeholder="Entr your name"onChange={handleChange} className="border  py-2 rounded-[15px] px-4 w-full"
          />
        </div>
        


        <div>
          <label htmlFor="isActive" className="block text-sm text-[#1d3557] ">
            Active:
          </label>
          <select name="isActive" value={userData.isActive.toString()}  onChange={handleChange} className="border  py-2 rounded-[15px] px-4"
          >
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <div className="flex items-center justify-center rounded-[30px]">

        <button type="submit" className="bg-[#1d3557] w-[500px] cursor-pointer  hover:bg- text-white px-6 py-2 rounded-[30px]"
        >
          Update User
        </button>
        </div>
      </form>
      <button onClick={()=>{
            navigate(`/allusers`)
          }}     className="max-w-auto py-3 px-6   text-[#1d3557] font-[400] rounded-[30px]      mt-8 cursor-pointer "
          >
            back
          </button>
    </div>
    </div>
  );
};

export default UserEditPage;
