import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../layout/header";
import Sidebar from "../components/sidebar";
import Home from "../pages/home";
import Bsc from "../pages/chains/bsc";
import Ethereum from "../pages/chains/ethereum";
import Polygon from "../pages/chains/polygon";

export default () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <Header />
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />
      <main>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/bsc" component={Bsc} />
          <Route path="/ethereum" component={Ethereum} />
          <Route path="/polygon" component={Polygon} />
        </Switch>
      </main>
    </Router>
  );
};
