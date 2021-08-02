import classNames from "classnames";

export default ({ icon, status, className }) => (
  <div className={classNames("animated-button", className)}>
    <div className={classNames(icon, `status-${status}`)}></div>
  </div>
);
