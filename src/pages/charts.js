import React, { useState } from "react";
import { useSelector } from "react-redux";
import TokenSelection from "../components/tokensSelection";
import TokenCharts from "../components/tokenCharts";

export default () => {
  const chainName = useSelector((state) => state.chains.selected);
  const platforms = useSelector((state) => state.platforms.platformsByChain[chainName]);
  const isLoadingPlatforms = useSelector((state) => state.platforms.loading);
  const tokens = useSelector((state) => state.tokens.tokensByChain[chainName]);
  const isLoadingTokens = useSelector((state) => state.tokens.loading);

  const [selectedToken, setSelectedToken] = useState(null);

  const renderCharts = () => {
    if (!!tokens && tokens.length > 0) {
      filterTokensValues = tokens.map((t) => ({ value: t.symbol, label: t.symbol }));
    }

    return (
      <>
        <TokenSelection tokens={filterTokensValues} onChange={(t) => setSelectedToken(t.value)} />

        <TokenCharts symbol={selectedToken} />
      </>
    );
  };

  let filterTokensValues = [];

  return (
    <div className="page charts-page">
      {isLoadingPlatforms || isLoadingTokens ? <div>Loading ....</div> : renderCharts()}
    </div>
  );
};
