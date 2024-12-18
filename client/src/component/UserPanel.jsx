import React from 'react'

export const UserPanel = (props) => {
  return (
    
    <div className='flex-center-row lightGray'>
        <button onClick={()=>{props.setShowLogin("show")}}>Login</button>
        <p>{props.userName}</p>
    </div>
  )
}
export default UserPanel;