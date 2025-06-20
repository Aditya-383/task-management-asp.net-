import React from 'react';
import { Dropdown, Space } from 'antd';
import { ChevronDownIcon } from 'lucide-react';


const DropDown = ({ assignedUsers }) => {
    // console.log("assignedUsers",assignedUsers)
  const menuItems = assignedUsers?.map((user, index) => ({
    key: index.toString(),
    label: user.assignedUsers
  }));
  const itemList = [...new Set( menuItems.map(item => item.label?.map(subItem => subItem.name)).flat()
  )]


  console.log("itemList",itemList,menuItems)

  return (
    <Dropdown
      overlay={
        <div className='bg-blue-200 px-4  rounded-[15px] '> 
           {itemList?.map((item) => (   
            <div  className="px-4 py-2 cursor-pointer hover:bg-blue-400">
              {item}
            </div>
          ))}
        </div>
      }
    >
      <a onClick={(e) => e.preventDefault()} className='flex justify-center pt-2 border border-indigo-100 items-center cursor-pointer max-w-25 rounded-[5px]  bg-white'>
        <Space className='flex'>
           <ChevronDownIcon className="w-6 h-5 text-blue-600" />
      
        
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
