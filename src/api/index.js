import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import NewForm from "../components/Forms/components/NewForm";

const baseUrl = "https://da8fcqr6bl.execute-api.us-west-2.amazonaws.com/dev";

export const getThemes = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/user/${userId}`);
    return res.data.Items;
  } catch (error) {
    //return a better error
    return "error";
  }
};

export const postTheme = async (themeObject) => {
  try {
    const res = await axios.post(`${baseUrl}/new`, themeObject);
    return res.data;
  } catch (error) {
    //return a better error
    return "error";
  }
};

export const updateTheme = async (userId, themeId, updatedTheme) => {
  try {
    const res = await axios.put(
      `${baseUrl}/update/${userId}/${themeId}`,
      updatedTheme
    );
    return res.data;
  } catch (error) {
    //return an error
    return "error";
  }
};

export const deleteTheme = async (userId, themeId) => {
  try {
    const res = await axios.delete(`${baseUrl}/delete/${userId}/${themeId}`);
    return res.data;
  } catch (error) {
    //return an error
    return "error";
  }
};

export const getUser = () => {
  const userId = localStorage.getItem("user");
  if (userId === null) {
    const newUserId = uuidv4();
    localStorage.setItem("user", newUserId);
    return newUserId;
  } else {
    return userId;
  }
};
