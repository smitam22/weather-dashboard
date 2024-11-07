import React, { useState, useEffect } from 'react';
import SearchBar from './components/common/searchBar';
import WeatherDetails from '../src/components/weatherDetails';
import Loader from '../src/components/common/loader';
import { fetchWeatherData, fetchCityCoordinates, fetchCurrentLocationWeather } from './utils/api';
import Button from './components/common/button';
import '../src/components/weatherDetails.css';

const App: React.FC = () => {

  // State variables for managing the application state
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');

  // Function to handle search based on city name input
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const coordinates = await fetchCityCoordinates(cityName);
      const forecast = await fetchWeatherData(coordinates.lat, coordinates.lon);
      setCity(coordinates.city);
      setWeatherData(forecast);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError('City not found or API error occurred');
    }
  };

  // Function to fetch weather data based on the user's current location
  const handleCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentLocationWeather();
      setWeatherData(data);
      setCity(''); // Reset the city state when using current location
      setLoading(false);
    } catch (error) {
      setError('Unable to fetch location or API error occurred');
      setLoading(false);
    }
  };

  // Determine which city name to display - either the city from API or user input
  const displayedCity = city ? city : weatherData?.cityName || '';

  return (
    <div className="app">
      <header>
        <h1 className='text-center p-5'>Weather Dashboard</h1>
      </header>
      <div className='d-flex justify-content-between m-5 mt-0'>
        <SearchBar
          inputValue={cityName}
          setInputValue={setCityName}
          onSearch={handleSearch}
          inputPlaceholder="Enter city name"
          searchButtonText="Search"
        />
        <Button onClick={handleCurrentLocation} label={'Current Location'}></Button>
      </div>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {weatherData && !loading &&
        <WeatherDetails
          forecastData={weatherData.forecastData}
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
          city={displayedCity}
          date={weatherData.formattedDate} />}
    </div>
  );
};

export default App;
