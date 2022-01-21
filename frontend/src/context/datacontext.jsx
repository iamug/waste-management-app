import React, { Component } from "react";

const DataContext = React.createContext();

class DataProvider extends Component {
  // Context state
  //   constructor(props) {
  //     super(props);
  //   }

  state = {
    data: null,
    setData: this.setData,
  };

  // Method to update state
  setData = (data) => {
    this.setState({ data });
  };

  render() {
    const { children } = this.props;
    // const { data } = this.state;
    // const { setData } = this;

    return (
      <DataContext.Provider value={this.state}>{children}</DataContext.Provider>
    );
  }
}

export default DataContext;

export { DataProvider };

export const DataConsumer = DataContext.Consumer;
