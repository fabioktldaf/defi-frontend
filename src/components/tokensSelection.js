import React from "react";
import Select from "react-select";

const tokensStyle = {
  control: (styles) => styles,
  option: (style, { data }) => {
    return {
      ...style,
      display: "flex",
      alignItems: "center",
      ":before": {
        content: `''`,
        background: `url('/images/tokens/${data?.value.toLowerCase()}.png')`,
        backgroundSize: "cover",
        width: "2em",
        height: "2em",
        marginRight: "1em",
      },
    };
  },
  input: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  singleValue: (styles) => ({
    ...styles,
    paddingLeft: "3em",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    boxShadow: "0 0 5px #aaa",
    borderRadius: "5em",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    ":before": {
      content: `''`,
      display: "flex",
      alignItems: "center",
      background: `url('/images/tokens/${data?.value.toLowerCase()}.png')`,
      backgroundSize: "cover",
      width: "2em",
      height: "2em",
      marginRight: "0.4em",
    },
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ":hover": {
      cursor: "pointer",
    },
  }),
};

export default ({ tokens, isMulti, onChange }) => {
  return (
    <Select
      className="tokens-selection"
      options={tokens}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      onChange={onChange}
      styles={tokensStyle}
    />
  );
};
