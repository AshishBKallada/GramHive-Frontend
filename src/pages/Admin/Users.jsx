import React from 'react';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import Header from '../../Components/Admin/Header/Header';
import UserTable from '../../Components/Admin/UserTable/UserTable';

function Users() {

   

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
        <Header />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <UserTable  />
        </div>
      </div>
    </div>
  );
}

export default Users;
