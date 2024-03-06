import React, { useState } from 'react'

const ShowHide = () => {

    const [show, setShow] = useState(true);
    
    const handleClick = (event) => {
        setShow(!show)
    }


  return (
    <div>
      <button onClick={handleClick}></button>
      {show ? "Hide" : "Show"}
      
    </div>
  )
}

export default ShowHide
