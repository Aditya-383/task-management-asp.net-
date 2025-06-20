import React from 'react'
import UserSideBar from "../userSideBar";

const UserHome = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-30">

      <div>
        <UserSideBar/>
      </div>
      
      <div className="grid grid-cols-1 items-center justify-center mt-60">
          <h2 className="text-[#1d3557] text-[56px] ">Welcome to User Dashboard</h2>
      </div>
      
    </div>
  )
}

export default UserHome
