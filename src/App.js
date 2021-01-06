import React from 'react'
import { connect, useUserSuppliedConnect } from "./web3/userSupplied";

function App() {
  const { userSupplied } = useUserSuppliedConnect()

  return (
    <div className="w-full">
      <button type="button" onClick={() => connect()} className="px-4 py-1 m-8 bg-gray-300 rounded" >Connect to Web3 Account</button>
    </div>
  );
}

export default App;
