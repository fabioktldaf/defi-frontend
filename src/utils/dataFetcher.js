import { loadChainsStart, loadChainsEnd, setChains } from "../redux/chainSlice";
import { loadPlatformsStart, loadPlatformsEnd, setPlatforms } from "../redux/platformSlice";
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
  await sleep(1000); //////////////////////////////////////
  dispatch(setPlatforms({ chainName, platforms }));
  dispatch(loadPlatformsEnd());

  return platforms;
};

export const loadTokens = (chainName) => {
  // to do...
};

export default {
  loadChains,
  loadPlatforms,
  loadTokens,
};
