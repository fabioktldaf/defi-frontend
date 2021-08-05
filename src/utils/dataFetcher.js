import { loadChainsStart, loadChainsEnd, setChains } from "../redux/slices/chainSlice";
import { loadPlatformsStart, loadPlatformsEnd, setPlatforms } from "../redux/slices/platformSlice";
import { loadTokensStart, loadTokensEnd, setTokens } from "../redux/slices/tokenSlice";
import { loadAveragesStart, loadAveragesEnd, setAverages } from "../redux/slices/averagesSlice";
import {
  loadTokenHistoricalDataStart,
  loadTokenHistoricalEnd,
  setHistoricalData,
} from "../redux/slices/tokenHistoricalDataSlice";

import configData from "../configData";
import { sleep } from "../utils/tools";

export const loadChains = async (dispatch) => {
  dispatch(loadChainsStart());

  const response = await fetch(configData.urls.chains());
  const chains = await response.json();
  await sleep(1000); //////////////////////////////////////
  dispatch(setChains(chains));
  dispatch(loadChainsEnd());

  return chains;
};

export const loadPlatforms = async (dispatch, chainName) => {
  dispatch(loadPlatformsStart());

  const response = await fetch(configData.urls.platforms(chainName));
  const platforms = await response.json();
  await sleep(100); //////////////////////////////////////
  dispatch(setPlatforms({ chainName, platforms }));
  dispatch(loadPlatformsEnd());

  return platforms;
};

export const loadTokens = async (dispatch, chainName) => {
  dispatch(loadTokensStart());

  const response = await fetch(configData.urls.tokens(chainName));
  const tokens = await response.json();
  await sleep(100); //////////////////////////////////////
  dispatch(setTokens({ chainName, tokens }));
  dispatch(loadTokensEnd());
};

export const loadAverages = async (dispatch, chainName) => {
  dispatch(loadAveragesStart());
  const response = await fetch(configData.urls.averages(chainName));
  const averages = await response.json();

  await sleep(100); //////////////////////////////////////
  dispatch(setAverages({ chainName, averages }));
  dispatch(loadAveragesEnd);
};

export const loadTokenHistoricalData = async (dispatch, chainName, symbol) => {
  dispatch(loadTokenHistoricalDataStart());
  const response = await fetch(configData.urls.tokenHistoricalData(chainName, symbol));
  const historicalData = await response.json();

  await sleep(100);
  dispatch(setHistoricalData({ chainName, symbol, historicalData }));

  dispatch(loadTokenHistoricalEnd());
};

export default {
  loadChains,
  loadPlatforms,
  loadTokens,
  loadAverages,
  loadTokenHistoricalData,
};
