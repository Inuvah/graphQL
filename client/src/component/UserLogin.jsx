import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

const GET_USER = gql`
  query GetUser {
    users {
        name
        password
        id
  }
  }
`

export const UserLogin = (props) => {

 const {loading, error, data} = useQuery(GET_USER);
      let input;
      const [name, setName] = useState("");
      const [password, setPassword] = useState("");
      const [id, setId] = useState("");
      if(loading) return 'Submitting...'
      if(error) return 'Submission error!';
    return (
     <>
      <div className='input flex-center-col space'>
          <form onSubmit={e => {
              e.preventDefault();
              console.log(name, password, data)
              {data.users.map((user) => {
                if(user.name === name && user.password === password){
                    setId(user.id)
                    props.setCurrentUserId(user.id);
                    props.setUserName(user.name)
                    console.log("logged in" + " " + user.id)
                }
              })}
              
          }}>
             {/*User name*/}
             <div className='spacer flex-center-col'>
             <div><label className='label-style'>User Name:</label></div>
             <div className='spacer-small'>
                 <input 
                     value={name}
                     onChange={e => setName(e.target.value)}
                     className="input-style"
                 />
             </div>
             </div>
             {/*password*/}
              <div className='spacer flex-center-col'>
                 <div><label htmlFor="" className='label-style'>Password:</label></div>
                 <div className='spacer-small'>
                     <input 
                         value={password}
                         onChange={e => setPassword(e.target.value)}
                         className="input-style"
                     />
                 </div>
              </div>
             <div className='flex-center spacer'>
                 <div><button type='submit' className="input-style">Login</button></div>
             </div>
          </form>
      </div>
      </>
    );
}
export default UserLogin;