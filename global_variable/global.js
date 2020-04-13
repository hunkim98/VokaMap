import React, { createContext, Component } from "react";

export const BooleanContext = createContext();

class BooleanContextProvider extends React.Component {
  state = {
    step1: false,
    step2: false,
  };
  render() {
    return (
      <BooleanContext.Provider
        value={{ ...this.state }}
      ></BooleanContext.Provider>
    );
  }
}

export default BooleanContextProvider;
