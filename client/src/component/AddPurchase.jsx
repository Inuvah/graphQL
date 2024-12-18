import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react'

const ADD_PURCHASE = gql`
    mutation MUTATE_ADD($name: String!, $amount: Int!, $date: String!, $userId: String!){
        addPurchase(name: $name, amount: $amount, date: $date, userId: $userId) {
            name
            amount
            date
            userId
        }
    }
`;

export const AddPurchase = () => {
    let input;
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [userId, setUserId] = useState("675cc356e210e1e5cdb9e26c");
    const [addPurchase, { data, loading, error }] = useMutation(ADD_PURCHASE);
    if(loading) return 'Submitting...'
    if(error) return 'Submission error!';
  return (
    <div className='flex-center-col'>
        <form className='flex-center-col spacer' onSubmit={e => {
            e.preventDefault();
            console.log(name, amount, date, typeof(amount))
            addPurchase({variables: {name: name, amount: amount, date: date, userId: userId}});
        }}>
            <input 
                className="input-style spacer-small"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                className="input-style spacer-small"
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value))}
            />
            <input 
                className="input-style spacer-small"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
        <button type='submit'>Submit</button>
        </form>
    </div>
  );
}
