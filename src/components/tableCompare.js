import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import configData from "../configData";
import { AVERAGE_TYPE } from "../types";
import AverageTypeSelection from "./averageTypeSelection";
import TokensSelection from "./tokensSelection";

const buildRowPlatforms = (tokenSymbol, averages, averageType, numberOfPlatforms) => {
  if (!tokenSymbol || !averages || !averageType || !numberOfPlatforms)
    return { lending: null, borrowing: null };

  const averagesToken = averages[averageType].find((t) => t.symbol === tokenSymbol);
  if (!averagesToken) {
    console.log(`${tokenSymbol} has no market`);
    return { lending: null, borrowing: null };
  }

  const { platforms } = averagesToken;

  const lendingRates = [];
  const borrowingRates = [];
  for (const platform in platforms) {
    const supplyBase = +platforms[platform].supplyBase.toFixed(2);
    const supplyDistribution = +platforms[platform].supplyDistribution.toFixed(2);
    const supplyTotal = +(supplyBase + supplyDistribution).toFixed(2);

    lendingRates.push({
      platform,
      supplyBase,
      supplyDistribution,
      supplyTotal,
    });

    const borrowBase = +platforms[platform].borrowBase.toFixed(2);
    const borrowDistribution = +platforms[platform].borrowDistribution.toFixed(2);
    const borrowTotal = +(borrowBase - borrowDistribution).toFixed(2);

    borrowingRates.push({
      platform,
      borrowBase,
      borrowDistribution,
      borrowTotal,
    });
  }

  let orderedLendingRates = lendingRates.sort((a, b) => (a.supplyTotal > b.supplyTotal ? 1 : -1));
  let orderedBorrowingRates = borrowingRates.sort((a, b) =>
    a.borrowTotal > b.borrowTotal ? 1 : -1
  );

  if (orderedLendingRates.length < numberOfPlatforms) {
    const emptyCells = Array.from(Array(numberOfPlatforms - orderedLendingRates.length).keys()).map(
      (i) => ({ empty: true })
    );
    orderedLendingRates = [...emptyCells, ...orderedLendingRates];
  }

  if (orderedBorrowingRates.length < numberOfPlatforms) {
    const emptyCells = Array.from(
      Array(numberOfPlatforms - orderedBorrowingRates.length).keys()
    ).map((i) => ({ empty: true }));
    orderedBorrowingRates = [...orderedBorrowingRates, ...emptyCells];
  }

  return {
    lending: orderedLendingRates,
    borrowing: orderedBorrowingRates,
    lastPrice: averages[AVERAGE_TYPE.hourly.value].find((t) => t.symbol === tokenSymbol).lastPrice,
  };
};

const buildTableData = (platforms, tokens, averages, averageType) => {
  if (!platforms || !tokens || !averages) return null;

  const header = {
    token: "Token",
    lending: platforms.map((_, index) => platforms.length - index),
    borrowing: platforms.map((_, index) => index + 1),
  };

  const rows = tokens.map((token) => {
    const { lending, borrowing, lastPrice } = buildRowPlatforms(
      token.symbol,
      averages,
      averageType,
      platforms.length
    );

    return {
      name: token.name,
      symbol: token.symbol,
      image: configData.urls.tokenImage(token.symbol.toLowerCase()),
      address: token.address,
      lastPrice,
      lending,
      borrowing,
    };
  });

  return { header, rows };
};

export default () => {
  const tableRef = useRef(null);

  const chainName = useSelector((state) => state.chains.selected);
  const platforms = useSelector((state) => state.platforms.platformsByChain[chainName]);
  const tokens = useSelector((state) => state.tokens.tokensByChain[chainName]);
  const averages = useSelector((state) => state.averages.averagesByChain[chainName]);

  const [filterTokens, setFilterTokens] = useState([]);
  const [averageType, setAverageType] = useState(AVERAGE_TYPE.hourly.value);

  const tableData = buildTableData(platforms, tokens, averages, averageType);

  const platformsBaseToken =
    platforms?.length > 0 && tokens?.length > 0
      ? platforms.reduce((result, platform) => {
          result[platform.name] = platform.baseToken.toLowerCase();
          return result;
        }, {})
      : {};

  useEffect(() => {
    if (!tableRef.current) return;

    const leftOffset =
      (tableRef.current.offsetWidth - tableRef.current.parentElement.offsetWidth) / 2;

    tableRef.current.parentElement.scrollLeft = leftOffset;
  }, [tableRef, tableData]);

  console.log("tableData ", tableData);

  const renderTableHeader = (header) => (
    <tr>
      {header.lending.map((h, index) => (
        <th className="col-rate" key={index}>
          {h == 1 ? "Best Lending Rate" : ""}
        </th>
      ))}
      <th className="col-token">{header.token}</th>
      {header.borrowing.map((h, index) => (
        <th className="col-rate" key={index}>
          {h == 1 ? "Best Borrow Rate" : ""}
        </th>
      ))}
    </tr>
  );

  const renderRow = (row) => {
    return (
      <>
        {row.lending.map((l, index) => {
          const platformLogo = platformsBaseToken[l.platform];
          return (
            <td key={index}>
              {l.empty ? (
                <div className="cell-platform empty"></div>
              ) : (
                <div className="cell-platform">
                  <div className="rate">{l.supplyTotal} %</div>
                  <img className="logo" src={`/images/tokens/${platformLogo}.png`} />
                  <div className="name">{l.platform}</div>
                </div>
              )}
            </td>
          );
        })}
        <td>
          <div className="cell-token">
            <img className="logo" src={row.image} />
            <div className="symbol">{row.symbol}</div>
            <div className="price">$ {row.lastPrice}</div>
          </div>
        </td>
        {row.borrowing.map((l, index) => {
          const platformLogo = platformsBaseToken[l.platform];
          return (
            <td key={index}>
              {l.empty ? (
                <div className="cell-platform empty"></div>
              ) : (
                <div className="cell-platform">
                  <div className="rate">{l.borrowTotal} %</div>
                  <img className="logo" src={`/images/tokens/${platformLogo}.png`} />
                  <div className="name">{l.platform}</div>
                </div>
              )}
            </td>
          );
        })}
      </>
    );
  };

  const renderRows = (rows) =>
    rows
      .filter((row) => row.lending && row.borrowing)
      .filter((row) =>
        !filterTokens || filterTokens?.length === 0
          ? true
          : filterTokens.find((ft) => ft.value === row.symbol)
      )
      .map((row, index) => <tr key={index}>{renderRow(row)}</tr>);

  const renderTable = (tableData) =>
    !tableData ? null : (
      <table ref={tableRef}>
        <thead>{renderTableHeader(tableData.header)}</thead>
        <tbody>{renderRows(tableData.rows)}</tbody>
      </table>
    );

  let filterTokensValues = [];

  if (!!tokens && tokens.length > 0) {
    filterTokensValues = tokens.map((t) => ({ value: t.symbol, label: t.symbol }));
  }

  return (
    <div className="table-compare">
      <div className="controls">
        {averages && <div>Last update was {averages.lastUpdate}</div>}
        <div>
          Filter by Tokens
          <TokensSelection
            tokens={filterTokensValues}
            isMulti={true}
            onChange={(values) => setFilterTokens(values)}
          />
        </div>
        <div>
          Average Rates Type
          <AverageTypeSelection onChange={(average) => setAverageType(average.value)} />
        </div>
      </div>
      <div className="table-container">{renderTable(tableData)}</div>
    </div>
  );
};
