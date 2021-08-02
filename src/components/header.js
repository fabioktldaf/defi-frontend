import React, { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Wallet from "../components/wallet";
import ChainSelection from "./chainSelection";

export default () => {
  const chainName = useSelector((state) => state.chains.selected);
  const isLoadingChains = useSelector((state) => state.chains.loading);
  const chains = useSelector((state) => state.chains.chains);

  return (
    <div className="header">
      <img src="/logo.svg" alt="logo" className="logo" />
      <span className="website-name">Website Name</span>
      {isLoadingChains ? (
        <div>Loading...</div>
      ) : (
        <ChainSelection
          selectedChain={chainName}
          chains={chains.map((chain) => ({ value: chain.name, label: chain.name.toUpperCase() }))}
        />
      )}
      <Wallet />
    </div>
  );
};
