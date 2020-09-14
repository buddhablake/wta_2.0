import React, { createContext, useState } from "react";
import axios from "axios";

export const ResultsContext = createContext();

export const ResultsProvider = (props) => {
  const [results, setResults] = useState({});

  const getResults = async (url, words) => {
    const body = { url, words };

    const res = await axios.post(
      "https://gqxkqzdr7l.execute-api.us-west-1.amazonaws.com/Dev/",
      body
    );
    setResults(res.data);
  };

  return (
    <ResultsContext.Provider value={{ results, getResults }}>
      {props.children}
    </ResultsContext.Provider>
  );
};
