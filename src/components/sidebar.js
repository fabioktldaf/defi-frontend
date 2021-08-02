import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import AnimatedButton from "./animatedButton";

import configData from "../configData";

export default ({ isOpen, onToggle }) => {
  return (
    <div className={classNames("sidebar", isOpen ? "" : "sidebar-closed")}>
      <nav>
        <ul>
          <li onClick={onToggle}>
            <AnimatedButton className="sidebar-icon" icon="toggle-menu" status={!isOpen ? 0 : 1} />
            {isOpen && <span>Close</span>}
          </li>

          {configData.pages.map(({ text, href, icon }, index) => (
            <li key={index}>
              <Link to={href}>
                {icon}
                {isOpen && <span>{text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
