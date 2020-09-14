import React, { useState, useContext } from "react";
import { ResultsContext } from "../../../context/results";
import { ThemesContext } from "../../../context/themes";
import { CurrentThemeContext } from "../../../context/currentTheme";
import { updateTheme } from "../../../api";
const EditForm = ({ currentTheme }) => {
  const { getResults } = useContext(ResultsContext);
  const { updateThemes } = useContext(ThemesContext);

  const [themeWords, setThemeWords] = useState(currentTheme.themeWords);
  const [values, setValues] = useState();

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const buildThemeWordsArray = () => {
    const themeWord = document.querySelector("#themeWords");
    setThemeWords((themeWords) => [...themeWords, themeWord.value]);
  };

  const deleteThemeWord = (index) => {
    themeWords.splice(index, 1);
    setThemeWords((themeWords) => [...themeWords]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTheme = {
      themeName: values.themeName,
      themeWords,
    };
    try {
      await updateTheme(
        currentTheme.userId,
        currentTheme.themeId,
        updatedTheme
      );
      updateThemes(updatedTheme);
      await getResults(values.url, themeWords);
      setValues(false);
      setThemeWords([]);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={values ? values.url : ""}
        />
        <input type="text" name="themeWords" id="themeWords" />
        <button
          disabled={themeWords.length >= 3 ? true : false}
          onClick={buildThemeWordsArray}
          type="button"
        >
          Add
        </button>
        <div>
          {themeWords.map((word, index) => (
            <p
              onClick={() => {
                deleteThemeWord(index);
              }}
            >
              {word}
            </p>
          ))}
        </div>
        <input
          type="text"
          name="themeName"
          onChange={handleChange}
          value={values ? values.themeName : currentTheme.themeName}
        />
        <input
          type="submit"
          value="Save theme and scan results"
          disabled={!values || !values.themeName ? true : false}
        />
      </form>
    </div>
  );
};

export default EditForm;
