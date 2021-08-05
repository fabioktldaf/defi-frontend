import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadChains, loadPlatforms, loadTokens, loadAverages } from "../utils/dataFetcher";
import Header from "./header";
import Sidebar from "./sidebar";

import configData from "../configData";

export default () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const chains = await loadChains(dispatch);
      loadPlatforms(dispatch, chains[0].name);
      loadTokens(dispatch, chains[0].name);
      loadAverages(dispatch, chains[0].name);
    })();
  }, []);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <Header chains={[]} isLoadingChains={false} />
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />
      <main>
        <Switch>
          {configData.pages.map(({ href, exact = false, component }, index) => (
            <Route path={href} exact={exact} component={component} key={index} />
          ))}
        </Switch>
      </main>
    </Router>
  );
};
