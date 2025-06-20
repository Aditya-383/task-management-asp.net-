import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaUserEdit, FaSignOutAlt, FaPlus, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [close, setClose] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setClose(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePage = (page) => {
    switch (page) {
      case "userHome": navigate("/userHome");
        break;
      case "userTask": navigate("/userTask");
        break;
      case "updateProfile": navigate("/updateProfile");
        break;
      case "logout":
        localStorage.removeItem('role');
        localStorage.removeItem('token');
      default:
        navigate("/");
    }
  };

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <div className="relative bg-[#acc7df] text-[#1d3557] p-6 sm:p-8 md:p-12 shadow-md border border-[#acc7df] rounded-tr-[7px] w-[100vw] lg:w-[300px]">
      <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-[500] pb-6">User Dashboard</h2>

      {close ? (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 lg:hidden text-[20px] font-bold text-red-900"
        >
          <FaTimes />
        </button>
      ) : (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 lg:hidden text-[20px] font-bold text-green-950"
        >
          <FaPlus />
        </button>
      )}

      {close && (
        <nav className="flex flex-col h-auto lg:h-screen gap-4 mt-4">
          <button
            onClick={() => handlePage("userHome")}
            className="text-left hover:bg-[#dcecf4] px-2 py-1 rounded cursor-pointer flex items-center gap-2"
          >
            <FaHome /> Home
          </button>

          <button
            onClick={() => handlePage("userTask")}
            className="text-left hover:bg-[#dcecf4] px-2 py-1 rounded cursor-pointer flex items-center gap-2"
          >
            <FaTasks /> Get Task
          </button>

          <button
            onClick={() => handlePage("updateProfile")}
            className="text-left hover:bg-[#dcecf4] px-2 py-1 rounded cursor-pointer flex items-center gap-2"
          >
            <FaUserEdit /> Profile
          </button>

          <button
            onClick={() => handlePage("logout")}
            className="text-left hover:bg-[#dcecf4] px-2 py-1 rounded cursor-pointer flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
