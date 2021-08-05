import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTokenHistoricalData } from "../utils/dataFetcher";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#000000", "#0000ff", "#d2691e", "#ff7f50", "#faebd7", "#a52a2a"];

export default ({ symbol }) => {
  const chainName = useSelector((state) => state.chains.selected);
  const historicalData = useSelector(
    (state) =>
      state.tokenHistoricalData.historicalDataByChainAndToken[
        `${chainName}-${symbol?.toLowerCase()}`
      ]
  );

  const dispatch = useDispatch();
  let platforms = [];

  useEffect(() => {
    if (chainName && symbol) loadTokenHistoricalData(dispatch, chainName, symbol?.toLowerCase());
  }, [chainName, symbol]);

  useEffect(() => {
    setTokenData(buildTokenData());
  }, [historicalData]);

  const buildTokenData = () => {
    if (!historicalData || historicalData.length === 0) return null;

    platforms = Object.keys(historicalData.hourlyValues[0]);

    const hourlySupplyTotal = [];
    const hourlyBorrowTotal = [];

    historicalData.hourlyValues.forEach((hd, index) => {
      const hourlySupplyTotalItem = {
        hour: new Date(new Date().getTime() - (24 - index) * 3600000).getHours().toString() + ":00",
      };
      const hourlyBorrowTotalItem = {
        hour: new Date(new Date().getTime() - (24 - index) * 3600000).getHours().toString() + ":00",
      };

      platforms.forEach((platform) => {
        const { supplyBase, supplyDistribution, borrowBase, borrowDistribution } = hd[platform];

        hourlySupplyTotalItem[platform] = +(supplyBase + supplyDistribution).toFixed(2);
        hourlyBorrowTotalItem[platform] = +(borrowBase + borrowDistribution).toFixed(2);
      });

      hourlySupplyTotal.push(hourlySupplyTotalItem);
      hourlyBorrowTotal.push(hourlyBorrowTotalItem);
    });

    const dailySupplyTotal = [];
    const dailyBorrowTotal = [];

    historicalData.dailyValues.forEach((hd, index) => {
      const dailySupplyTotalItem = { day: hd.date };
      const dailyBorrowTotalItem = { day: hd.date };

      platforms.forEach((platform) => {
        const { supplyBase, supplyDistribution, borrowBase, borrowDistribution } =
          hd.platforms[platform];

        dailySupplyTotalItem[platform] = +(supplyBase + supplyDistribution).toFixed(2);
        dailyBorrowTotalItem[platform] = +(borrowBase + borrowDistribution).toFixed(2);
      });

      dailySupplyTotal.push(dailySupplyTotalItem);
      dailyBorrowTotal.push(dailyBorrowTotalItem);
    });

    return {
      hourlySupplyTotal,
      hourlyBorrowTotal,
      dailySupplyTotal,
      dailyBorrowTotal,
    };
  };

  const [tokenData, setTokenData] = useState(buildTokenData());

  const renderChart = (title, data, lineType, dataKey) => {
    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data}>
            {platforms.map((platform, index) => (
              <Line type={lineType} dataKey={platform} stroke={colors[index]} key={index} />
            ))}

            <CartesianGrid sroke="#ccc" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="charts">
      {tokenData &&
        tokenData.hourlySupplyTotal &&
        renderChart("APY Supply last 24 hours", tokenData.hourlySupplyTotal, "monotone", "hour")}

      {tokenData &&
        tokenData.hourlyBorrowTotal &&
        renderChart("APY Borrow last 24 hours", tokenData.hourlyBorrowTotal, "monotone", "hour")}

      {tokenData &&
        tokenData.dailySupplyTotal &&
        renderChart("APY Supply last n days", tokenData.dailySupplyTotal, "monotone", "date")}

      {tokenData &&
        tokenData.dailyBorrowTotal &&
        renderChart("APY Borrow last n days", tokenData.dailyBorrowTotal, "monotone", "date")}
    </div>
  );
};
