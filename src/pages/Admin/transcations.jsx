import React from 'react'
import Transactions from '../../Components/Admin/Transactions/Transactions'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import Header from '../../Components/Admin/Header/Header'

function TransactionsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
        <Header />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Transactions  />
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
