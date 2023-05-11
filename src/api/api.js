import axios from "axios";

const apiKey = "KdWbJl3HtoLg2hIO6pkyMaS9I8dFajKn";

const getData = async (url, callback, errorCallback) => {
  try {
    const response = await axios.get(url);
    callback(response);
  } catch (error) {
    console.log("error = " + error);
    errorCallback(error);
  }
};

export const getMostPopular = (path, callback, errorCallback) => {
  const newPath = path + apiKey;
  getData(newPath, callback, errorCallback);
};
