import React, { useContext, useState, useEffect } from "react";
import { CurrentThemeContext } from "../context/currentTheme";
import { ThemesContext } from "../context/themes";
import { getThemes, getUser } from "../api";

const Themes = () => {
  const { populateEditForm } = useContext(CurrentThemeContext);
  const { themes, fetchUserThemes } = useContext(ThemesContext);

  useEffect(() => {
    fetchUserThemes();
  }, []);

  return (
    <div style={{ border: "1px solid black", padding: "10px", width: "400px" }}>
      Themes
      {(themes &&
        themes.map((theme) => (
          <p onClick={() => populateEditForm(theme)}>{theme.themeName}</p>
        ))) ||
        (themes && themes.error)}
    </div>
  );
};

export default Themes;
