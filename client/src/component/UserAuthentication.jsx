import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

const ADD_PURCHASE = gql`
    mutation MUTATE_ADD($name: String!, $password: String!){
        addUser(name: $name, password: $password) {
            name
            password
        }
    }
`;

const GET_USER = gql`
  query GetUser {
    user {
        name
        id
  }
  }
`
export const UserAuthentication = () => {
     const {UserLoading, UserError, UserData} = useQuery(GET_USER);
     let input;
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [addPurchase, { data, loading, error }] = useMutation(ADD_PURCHASE);
     if(loading) return 'Submitting...'
     if(error) return 'Submission error!';
   return (
    <>
     <div className='input flex-center-col space'>
         <form onSubmit={e => {
             e.preventDefault();
             console.log(name, password)
             addPurchase({variables: {name: name, password: password}});
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
                <div><button type='submit' className="input-style">Register</button></div>
            </div>
         </form>
     </div>
     </>
   );
}

export default UserAuthentication;