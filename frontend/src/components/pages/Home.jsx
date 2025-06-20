import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";



const Home = () => {
  useEffect(()=>{
    console.log("object")
  },[])

  return (
    <div className="flex flex-col lg:flex-row gap-30">

      <div>
        <Sidebar/>
      </div>
      
      <div className="grid grid-cols-1 items-center justify-center ">
          <h2 className="text-[#1d3557] text-[44px] md:text-[56px] ">Welcome to Admin Dashboard</h2>
      </div>
      
    </div>
  );
};

export default Home;