import React, { useState } from "react";
import { DisplayUser } from "./component/DisplayUser";
import { AddPurchase } from "./component/AddPurchase";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { graphql } from 'graphql';
import UserLogin from "./component/UserLogin";
import UserAuthentication from "./component/UserAuthentication";
import UserPanel from "./component/UserPanel";

const client = new ApolloClient({
  uri: "http://localhost:7000/graphql",
  cache: new InMemoryCache(),
});
  

export const Layout = () => {
  const [showLogin, setShowLogin] = useState("hide");
  const [showRegister, setShowRegister] = useState("hide");
  const [amount, setAmount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("67626ed3e6858de0cf824fa3");
  const [userName, setUserName] = useState("");
  function handleInputChange(event) {
    setAmount(event.target.value);
  }
  return (
    <>
    <div>
      <UserPanel setShowLogin={setShowLogin} setShowRegister={setShowRegister} userName={userName} currentUserId={currentUserId}/>
    </div>
    <div className={showLogin}>
      <UserLogin setCurrentUserId={setCurrentUserId} setUserName={setUserName}/>
    </div>
    <div className={showRegister}>
      <UserAuthentication />
    </div>
      
      <div className="user-wrapper">user</div>
      <div className="input-wrapper flex-center-col">
        <div className="input flex-center-col">
          <AddPurchase />
        </div>
        <div className="input-submit-wrapper flex-right">
          <div className="input-submit flex-center-col">
            <button className="input-style" onClick={()=>{console.log(currentUserId)}}>Overall spending</button>
          </div>
        </div>
        <div className="history-wrapper">
          <div className="history">
           <DisplayUser currentUserId={currentUserId} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;


