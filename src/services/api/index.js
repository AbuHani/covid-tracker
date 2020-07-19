import axios from "axios";

const COVID_API = process.env.REACT_APP_COVID_API;
const DISEASE_API = process.env.REACT_APP_DISEASE_API;

export const getHistoricalData = async (days) => {
  try {
    const {
      data
    } = await axios.get(`${DISEASE_API}/covid-19/historical/all?lastdays=${days}`);
    const dates = Object.keys(data['cases']);
    data['dates'] = dates;

    return data;

  } catch (error) {
    console.log(error);
  }
}

export const getCountries = async () => {
  try {
    const {
      data
    } = await axios.get(`${COVID_API}/countries`);

    return data;

  } catch (error) {
    console.log(error);
  }
};

export const getSummary = async () => {
  try {
    const {
      data
    } = await axios.get(`${COVID_API}/summary`);

    return data;

  } catch (error) {
    console.log(error);
  }
};
