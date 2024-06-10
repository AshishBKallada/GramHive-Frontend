import React from 'react';
import MessageList from '../../Components/User/messages/Messages';
import Sidebar from '../../Components/User/Sidebar/Sidebar';
import Chat from '../../Components/User/Chat/Chat';
import SidebarTest from '../../Components/User/Sidebar/SidebarTest';

function Messages() {
  return (
    <div className='flex gap-2 w-full'>
      <div className='w-1/4 ml-3 float-left fixed'>
      <SidebarTest />
      </div>
      <div className="float-left w-[25%] h-screen ml-[300px]">
      <MessageList />
      </div>
      <div className='w-3/4'>
      <Chat />
      </div>
           
    

    </div>
  );
}

export default Messages;
