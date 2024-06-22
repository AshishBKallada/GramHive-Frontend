import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import PostReports from '../../Components/Admin/Reports/Post/PostReports'

function PostReportsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className='bg-black' style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
        <h1 className='text-gray-300 ml-12 mt-4 text-4xl font-bold'>Post Reports</h1>
        <div className='mt-4' style={{ flex: 1, overflowY: 'auto' }}>
          <PostReports />
        </div>
      </div>
    </div>
  )
}

export default PostReportsPage
