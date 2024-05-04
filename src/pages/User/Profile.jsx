import React from 'react'
import Sidebar from '../../Components/User/Sidebar/Sidebar'
import Profile from '../../Components/User/Profile/Profile'

function UserProfile() {
  return (
    <div>
      <Sidebar />
      <div style={{marginLeft:'200px'}}>
      <Profile />
      </div>
    </div>
  )
}

export default UserProfile
