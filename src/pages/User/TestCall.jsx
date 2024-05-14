import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TestCall() {
    const [value,setValue ] = useState();
    const navigate = useNavigate();
  return (
    <div>
       <input style={{color:'red'}} type="text" onChange={(e)=>setValue(e.target.value)} />
       <button onClick={()=>navigate(`/room/${value}`)}>Click me</button>
    </div>
  )
}

export default TestCall
