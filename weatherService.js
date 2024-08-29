import axios from 'axios';

const API_KEY = '114f826277e3a23a7df45121d804a160'; // Replace with your OpenWeatherMap API key

const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};

export default getWeatherData;
