import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { changeChain } from "../redux/slices/chainSlice";

import { loadPlatforms } from "../utils/dataFetcher";

const chainStyle = (selectedChain) => ({
  control: (styles) => styles,
  option: (style, { data }) => {
    return {
      ...style,
      display: "flex",
      alignItems: "center",
      ":before": {
        content: `''`,
        background: `url('/images/${data?.value}.png')`,
        backgroundSize: "cover",
        width: "2em",
        height: "2em",
        marginRight: "1em",
      },
    };
  },
  input: (styles, { data }) => {
    const image = data?.value;
    return {
      ...styles,
      ":before": {
        content: `''`,
        display: "inline-block",
        background: `url('/images/${selectedChain}.png')`,
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
});

export default ({ chains, selectedChain }) => {
  const dispatch = useDispatch();

  const handleChangeChain = async (e) => {
    const chainName = e.value;
    dispatch(changeChain(chainName));

    await loadPlatforms(dispatch, chainName);
  };

  return (
    <Select
      className="chain-selection"
      options={chains}
      onChange={handleChangeChain}
      defaultValue={chains[0]}
      styles={chainStyle(selectedChain)}
    />
  );
};
