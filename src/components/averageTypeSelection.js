import React from "react";
import Select from "react-select";
import { AVERAGE_TYPE } from "../types";

const averagesStyle = {
  control: (styles) => styles,
  option: (style, { data }) => {
    return {
      ...style,
    };
  },
  input: (styles) => {
    return {
      ...styles,
    };
  },
  singleValue: (styles) => ({
    ...styles,
  }),
};

const averages = [];
for (const av in AVERAGE_TYPE)
  averages.push({ value: AVERAGE_TYPE[av].value, label: AVERAGE_TYPE[av].label });

export default ({ onChange }) => {
  return (
    <Select
      className="average-selection"
      options={averages}
      defaultValue={{ value: AVERAGE_TYPE.hourly.value, label: AVERAGE_TYPE.hourly.label }}
      onChange={onChange}
      styles={averagesStyle}
    />
  );
};
