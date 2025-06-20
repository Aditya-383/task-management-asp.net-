import React from 'react';
import { Dropdown, Space } from 'antd';
import { ChevronDownIcon } from 'lucide-react';


const ProjectDropDown = ({ assignedUsers }) => {
    console.log("assignedUsers",assignedUsers)
//   const menuItems = assignedUsers?.map((user, index) => ({
//     label: user.assignedUsers
//   }));
//   const itemList = [...new Set( menuItems.map(item => item.label?.map(subItem => subItem)).flat()
//   )]


//   console.log("itemList",itemList,menuItems)

  return (
    <Dropdown
      overlay={
        <div className='bg-blue-200 px-4  rounded-[15px] '> 
           {assignedUsers?.map((item) => (   
            <div  className="px-4 py-2 cursor-pointer hover:bg-blue-400">
              {item.name}
            </div>
          ))}
        </div>
      }
    >
      <a onClick={(e) => e.preventDefault()} className='flex justify-center items-center cursor-pointer max-w-20 rounded-[5px] border border-indigo-200  px-1'>
        <Space className='flex'>
            
              <ChevronDownIcon className="w-6 h-5 text-blue-600" />

        
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProjectDropDown;
