import React, { useState } from 'react';
import './src/WidgetStyle.css';

const WeatherWidget = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = 'ebf52f5e2a54ca1daa14a95cbd9b661a'; 

    const fetchWeather = async () => {
        if (!location) {
            setError("Please enter a location.");
            return;
        }
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeather();
    };

    return (
        <div className="weather-widget">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                    placeholder="Enter a city, state."
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;
