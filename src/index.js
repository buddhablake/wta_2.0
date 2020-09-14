import React from "react";
import ReactDOM from "react-dom";
import { ResultsProvider } from "./context/results";
import { CurrentThemeProvider } from "./context/currentTheme";
import { ThemesProvider } from "./context/themes";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CurrentThemeProvider>
      <ThemesProvider>
        <ResultsProvider>
          <App />
        </ResultsProvider>
      </ThemesProvider>
    </CurrentThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
