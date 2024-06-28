import React from 'react'
import EditProfile from '../../Components/User/Profile/EditProfile'
import SidebarTest from '../../Components/User/Sidebar/SidebarTest'


function EditUserProfile() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <SidebarTest />
            </div>

            <div style={{ marginLeft: '350px',marginTop:'100px' }}>
                <EditProfile />
            </div>
        </>
    )
}

export default EditUserProfile
