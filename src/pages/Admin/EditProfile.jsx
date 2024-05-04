import React from 'react'
import EditProfile from '../../Components/User/EditProfile/EditProfile'
import Sidebar from '../../Components/User/Sidebar/Sidebar'


function EditUserProfile() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
            </div>

            <div style={{ marginLeft: '350px',marginTop:'100px' }}>
                <EditProfile />
            </div>
        </>
    )
}

export default EditUserProfile
