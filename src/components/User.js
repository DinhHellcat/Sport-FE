import React from "react";
import { useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const { tokens } = location.state || {}; // Retrieve tokens passed from Login.js

  return (
    <div>
      <h1>User Page</h1>
      <p>Welcome to your account!</p>
      <h2>Tokens:</h2>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};

export default User;
