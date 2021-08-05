import { useSelector } from "react-redux";
import TableCompare from "../components/tableCompare";

export default () => {
  const chainName = useSelector((state) => state.chains.selected);
  const isLoadingPlatforms = useSelector((state) => state.platforms.loading);
  const platforms = useSelector((state) => state.platforms.platformsByChain[chainName]);

  return (
    <div className="page compare-page">
      {isLoadingPlatforms ? <div>Loading...</div> : <TableCompare />}
    </div>
  );
};
