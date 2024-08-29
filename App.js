import React, { useState } from 'react';
import WeatherChart from './WeatherChart';
import './style.css';
import getWeatherData from './weatherService';
function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getWeatherData(city);
        const formattedData = formatWeatherData(data);
        setWeatherData(formattedData);
    };

    const formatWeatherData = (data) => {
        const dailyData = {};

        data.list.forEach(entry => {
            const date = entry.dt_txt.split(' ')[0];
            if (!dailyData[date]) {
                dailyData[date] = { tempSum: 0, humiditySum: 0, windSpeedSum: 0, count: 0 };
            }
            dailyData[date].tempSum += entry.main.temp;
            dailyData[date].humiditySum += entry.main.humidity;
            dailyData[date].windSpeedSum += entry.wind.speed;
            dailyData[date].count += 1;
        });

        const labels = [];
        const temps = [];
        const humidities = [];
        const windSpeeds = [];

        for (const date in dailyData) {
            labels.push(date);
            const daily = dailyData[date];
            temps.push(daily.tempSum / daily.count); // Calculate average temperature
            humidities.push(daily.humiditySum / daily.count); // Calculate average humidity
            windSpeeds.push(daily.windSpeedSum / daily.count); // Calculate average wind speed
        }

        return { labels, temps, humidities, windSpeeds };
    };

    return (
        <div className="container">
            <h1>Weather Information</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">Enter City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <>
                    <div id="weather-info">
                        <div id="current-weather">
                            <h2>Weather information for {city}:</h2>
                            <p>Temperature: {Math.round(weatherData.temps[weatherData.temps.length - 1])}°C</p>
                            <p>Humidity: {weatherData.humidities[weatherData.humidities.length - 1]}%</p>
                            <p>Wind Speed: {Math.round(weatherData.windSpeeds[weatherData.windSpeeds.length - 1])} m/s</p>
                        </div>
                    </div>
                    <WeatherChart
                        labels={weatherData.labels}
                        temps={weatherData.temps}
                        humidities={weatherData.humidities}
                        windSpeeds={weatherData.windSpeeds}
                    />
                </>
            )}
        </div>
    );
}

export default App;
