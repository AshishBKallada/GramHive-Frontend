import React from 'react'
import Header from '../../Components/Admin/Header/Header'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import PostReports from '../../Components/Admin/Reports/Post/PostReports'

function PostReportsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
        <Header />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <PostReports  />
        </div>
      </div>
    </div>
  )
}

export default PostReportsPage
