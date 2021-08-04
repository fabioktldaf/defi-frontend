import Home from "./pages/home";
import Compare from "./pages/compare";
import Charts from "./pages/charts";
import BestMatch from "./pages/best-match";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as CgIcons from "react-icons/cg";

const urlDataRepo = "https://raw.githubusercontent.com/fabioktldaf/lending-platforms-data/master/";

export default {
  pages: [
    {
      text: "Home",
      href: "/",
      component: Home,
      icon: <AiIcons.AiOutlineHome />,
      exact: true,
    },
    {
      text: "Compare",
      href: "/compare",
      component: Compare,
      icon: <FaIcons.FaSortAmountUpAlt />,
    },
    {
      text: "Charts",
      href: "/charts",
      component: Charts,
      icon: <IoIcons.IoBarChartOutline />,
    },
    {
      text: "Best Match",
      href: "/best-match",
      component: BestMatch,
      icon: <CgIcons.CgSearchFound />,
    },
  ],
  urls: {
    chains: () => `${urlDataRepo}config/chains.json`,
    platforms: (chain) => `${urlDataRepo}config/${chain}/platforms.json`,
    tokens: (chain) => `${urlDataRepo}config/${chain}/tokens.json`,
    averages: (chain) => `${urlDataRepo}historical-values/${chain}/averages.json`,
    tokenImage: (tokenName) => `/images/tokens/${tokenName}.png`,
  },
};
