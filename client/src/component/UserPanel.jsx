import React from 'react'

export const UserPanel = (props) => {
  return (

    <div className='flex-center-row lightGray'>
        <button onClick={()=>{props.setShowLogin("show")}}>Login</button>
        <button onClick={()=>{props.setShowRegister("show")}}>Register</button>
        <p>{props.userName}</p>
    </div>
  )
}
export default UserPanel;