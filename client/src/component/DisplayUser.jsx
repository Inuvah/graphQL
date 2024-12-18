import { useQuery } from '@apollo/client'
import React from 'react'
import { gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser {
    user(id:"675cc356e210e1e5cdb9e26c"){
        name
        password
        id
      purchase {
        name
        amount
        date
        id
        userId
    }
  }
  }
`
export const DisplayUser = () => {
    const {loading, error, data} = useQuery(GET_USER);
    let count = 0;
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error : {error.message}</p>;
  return(
    <>
    
    {data.user.purchase.map((purchases, index) => (
        <div key={data.user.purchase[index].id} className="flex-center-row-gapped">
        <div>
        <p>{data.user.purchase[index].name}</p>
        </div>
        <div>
        <p>{data.user.purchase[index].date}</p>
        </div>
        <div className="amount">{data.user.purchase[index].amount}.dkk</div>
        <button onClick={() => console.log(data.user.purchase[0].name)}>delete</button>
    </div>
    ))}
    </>
  );
}
