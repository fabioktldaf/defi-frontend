import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";

export default ({ isOpen, onToggle }) => {
  return (
    <div className={classNames("sidebar", isOpen ? "" : "sidebar-closed")}>
      <nav>
        <ul>
          <li>
            <Link to="#" onClick={onToggle}>
              {isOpen ? (
                <>
                  <AiIcons.AiOutlineMenuFold className="btn-toggle" />
                  <span>Close</span>
                </>
              ) : (
                <AiIcons.AiOutlineMenuUnfold className="btn-toggle" />
              )}
            </Link>
          </li>
          <li>
            <Link to="/">
              <AiIcons.AiOutlineHome />
              {isOpen && <span>Home</span>}
            </Link>
          </li>
          <li className="horizontal-row "></li>
          <li>
            <Link to="/bsc">
              <img src="/images/bsc.png" alt="binance smart chain" />
              {isOpen && <span>BSC</span>}
            </Link>
          </li>
          <li>
            <Link to="/ethereum">
              <img src="/images/ethereum.png" alt="ethereum blockchain" />
              {isOpen && <span>Ethereum</span>}
            </Link>
          </li>
          <li>
            <Link to="/polygon">
              <img src="/images/polygon.png" alt="polygon blockchain" />
              {isOpen && <span>Polygon</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
