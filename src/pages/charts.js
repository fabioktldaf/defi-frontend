import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TokenSelection from "../components/tokensSelection";
import TokenCharts from "../components/tokenCharts";

export default () => {
  const { chainName, baseToken } = useSelector((state) => {
    return {
      chainName: state.chains.selected,
      baseToken: state.chains.chains.find((c) => c.name === state.chains.selected)?.baseToken,
    };
  });
  const tokens = useSelector((state) => state.tokens.tokensByChain[chainName]);
  const isLoadingTokens = useSelector((state) => state.tokens.loading);

  const [selectedSymbol, setSelectedSymbol] = useState(null);

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setSelectedSymbol(baseToken);
    }
  }, [tokens]);

  const renderCharts = () => {
    const filterTokensValues =
      !tokens || tokens.length == 0
        ? []
        : tokens.map((t) => ({ value: t.symbol, label: t.symbol }));

    const defaultToken = filterTokensValues.find((t) => t.value === baseToken);

    return (
      <>
        {filterTokensValues && (
          <TokenSelection
            tokens={filterTokensValues}
            onChange={(t) => setSelectedSymbol(t.value)}
            defaultValue={defaultToken}
          />
        )}

        <TokenCharts symbol={selectedSymbol} />
      </>
    );
  };

  return (
    <div className="page charts-page">
      {isLoadingTokens ? <div>Loading ....</div> : renderCharts()}
    </div>
  );
};
