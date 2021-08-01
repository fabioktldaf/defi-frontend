import React, { Link } from "react-router-dom";
import Wallet from "../components/wallet";

export default () => {
  return (
    <div class="header">
      <img src="/logo.svg" alt="logo" className="logo" />
      <span className="website-name">Website Name</span>
      <Wallet />
    </div>
  );
};
