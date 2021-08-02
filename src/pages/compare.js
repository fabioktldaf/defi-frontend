import { useEffect } from "react";
import { useSelector } from "react-redux";

export default () => {
  const chainName = useSelector((state) => state.chains.selected);
  const isLoadingPlatforms = useSelector((state) => state.platforms.loading);
  const platforms = useSelector((state) => state.platforms.platformsByChain[chainName]);

  return (
    <div className="page">
      {chainName}
      {isLoadingPlatforms ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {platforms &&
            platforms.length > 0 &&
            platforms.map(({ name, active, baseToken }, index) => (
              <li key={index}>{`${name} ${baseToken} ${active}`}</li>
            ))}
        </ul>
      )}
    </div>
  );
};
