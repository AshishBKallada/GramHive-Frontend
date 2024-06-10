import React from 'react'

function Explore() {
  return (
    <div>
    <div className="float-left fixed">
      <SidebarTest />
    </div>

    <div style={{ marginLeft: "200px" }}>
      <ExploreGrid/>
    </div>
  </div>
  )
}

export default Explore
