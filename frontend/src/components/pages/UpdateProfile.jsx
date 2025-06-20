import React from 'react'
import UserSideBar from "../userSideBar";

const UpdateProfile = () => {
  return (
    <div className="flex gap-30">

      <div>
        <UserSideBar/>
      </div>
      
      <div className="grid grid-cols-1 justify-center mt-60">
          <h2 className="text-pink-800 text-[56px] ">Work in Pending</h2>
      </div>
      
    </div>
  )
}

export default UpdateProfile
