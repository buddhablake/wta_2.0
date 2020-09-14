import React, { createContext, useState } from "react";
import { getThemes, getUser } from "../api";

export const ThemesContext = createContext();

export const ThemesProvider = (props) => {
  const [themes, setThemes] = useState();

  //if user exists and on initial visit we want to grab the users exisiting themes from the db
  const fetchUserThemes = async () => {
    const user = await getUser();
    const res = await getThemes(user);
    setThemes(res);
  };

  //if user adds new themes we want to update the themes rray to reflect the new theme

  const updateThemes = (newTheme) => {
    setThemes((themes) => [...themes, newTheme]);
  };

  //if user edits/updated a theme we also want to update the themes array

  return (
    <ThemesContext.Provider value={{ themes, fetchUserThemes, updateThemes }}>
      {props.children}
    </ThemesContext.Provider>
  );
};
