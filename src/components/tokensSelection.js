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
  input: (styles, state) => {
    const selectedTokens = state.getValue();
    const symbol = selectedTokens && selectedTokens.length > 0 ? selectedTokens[0].value : null;
    const background = symbol ? `url('/images/tokens/${symbol.toLowerCase()}.png')` : "";

    return {
      ...styles,
      ":before": {
        content: `''`,
        display: "inline-block",
        background,
        backgroundSize: "cover",
        width: "2em",
        height: "2em",
      },
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

let __tokens;
export default ({ tokens, isMulti = false, onChange, defaultValue }) => {
  __tokens = tokens;

  return (
    <Select
      className="tokens-selection"
      options={tokens}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      onChange={onChange}
      styles={tokensStyle}
      defaultValue={defaultValue}
    />
  );
};
