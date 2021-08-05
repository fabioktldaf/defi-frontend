import React, { useState } from "react";
import { useSelector } from "react-redux";
import TokensSelection from "../components/tokensSelection";

export default () => {
  const chainName = useSelector((state) => state.chains.selected);
  const tokens = useSelector((state) => state.tokens.tokensByChain[chainName]);
  const averages = useSelector((state) => state.averages.averagesByChain[chainName]);

  const [token1, setToken1] = useState(null);
  const [token2, setToken2] = useState(null);

  const tokensForSelection =
    tokens && tokens.length > 0 ? tokens.map((t) => ({ value: t.symbol, label: t.symbol })) : null;

  const findBestMatch = (symbol1, symbol2, historicalValues) => {
    const token1 = historicalValues.find((hv) => hv.symbol === symbol1);
    const token2 = historicalValues.find((hv) => hv.symbol === symbol2);

    if (!token1 || !token1.platforms || !token2 || !token2.platforms) return null;

    const bestMatch = {
      platform: null,
      supply: 0,
      borrow: 0,
      diff: Number.MAX_SAFE_INTEGER,
    };

    for (const platformName in token1.platforms) {
      if (!token2.platforms[platformName]) continue;

      const { supplyBase, supplyDistribution } = token1.platforms[platformName];
      const { borrowBase, borrowDistribution } = token2.platforms[platformName];

      const diff = +(borrowBase - borrowDistribution - supplyBase - supplyDistribution).toFixed(2);

      if (diff < bestMatch.diff) {
        bestMatch.platform = platformName;
        bestMatch.supply = +(supplyBase + supplyDistribution).toFixed(2);
        bestMatch.borrow = +(borrowBase - borrowDistribution).toFixed(2);
        bestMatch.diff = diff;
      }
    }

    return bestMatch;
  };

  const formatBestMatchResult = (bestMatch) =>
    `${bestMatch.platform} with a supply apy of ${bestMatch.supply}% and a borrow apy of ${bestMatch.borrow}%. The result is an apy of ${bestMatch.diff}%`;

  const renderBestMatchs = () => {
    const hourly = findBestMatch(token1.value, token2.value, averages.hourly);
    const daily = findBestMatch(token1.value, token2.value, averages.daily);
    const weekly = findBestMatch(token1.value, token2.value, averages.weekly);
    const monthly = findBestMatch(token1.value, token2.value, averages.monthly);

    return (
      <table>
        <thead>
          <tr>
            <th>Last</th>
            <th>Platform</th>
            <th>Apy {token1.value} (Collateral) Apy</th>
            <th>Apy {token2.value} (Borrowing) </th>
            <th>Result Apy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hour</td>
            <td>{hourly.platform}</td>
            <td>{hourly.supply}%</td>
            <td>{hourly.borrow}%</td>
            <td>{(hourly.borrow - hourly.supply).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>24 Hours</td>
            <td>{daily.platform}</td>
            <td>{daily.supply}%</td>
            <td>{daily.borrow}%</td>
            <td>{(daily.borrow - daily.supply).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>7 days</td>
            <td>{weekly.platform}</td>
            <td>{weekly.supply}%</td>
            <td>{weekly.borrow}%</td>
            <td>{(weekly.borrow - weekly.supply).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>30 Days</td>
            <td>{monthly.platform}</td>
            <td>{monthly.supply}%</td>
            <td>{monthly.borrow}%</td>
            <td>{(monthly.borrow - monthly.supply).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="page best-match-page">
      {tokensForSelection && (
        <div className="pair-tokens-selection">
          <div className="token-selection">
            Collateral
            <TokensSelection
              tokens={tokensForSelection}
              onChange={(values) => {
                console.log(values);
                setToken1(values);
              }}
            />
          </div>
          <div className="and-separator"> & </div>
          <div className="token-selection">
            Borrowing
            <TokensSelection tokens={tokensForSelection} onChange={(values) => setToken2(values)} />
          </div>
        </div>
      )}
      {token1 && token2 && <div className="result">{renderBestMatchs()}</div>}
    </div>
  );
};
