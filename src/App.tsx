import React, { useState } from 'react';
import SearchBar from './components/common/searchBar';
import WeatherDetails from './components/weatherDetails';
import { fetchWeatherData, fetchCityCoordinates, fetchCurrentLocationWeather } from './utils/api';
import Button from './components/common/button';
import '../src/components/weatherDetails.css';
import WeatherCardLoader from './components/weatherCardLoader';
import MovingCloud from './components/common/movingCloud/movingCloud';
import { useWindowSize } from './utils/hooks';

const App: React.FC = () => {

  // State variables to manage the application state
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');

  const screenSize = useWindowSize();
  // Function to handle the search functionality
  const handleSearch = async () => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return; // Stop further execution if city name is empty
    }
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
      setError('City not found. Please enter correct city name');
    }
  };

  // Function to handle fetching weather data for the current location
  const handleCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentLocationWeather();
      setWeatherData(data);
      setCity('');
      setLoading(false);
    } catch (error) {
      setError('Unable to fetch location or API error occurred');
      setLoading(false);
    }
  };

  // Determine the city name to display (either fetched city or data from API)
  const displayedCity = city ? city : weatherData?.cityName || '';


  return (
    <div className="app">
      <header>
        <h1 className="text-center p-5">Weather Dashboard</h1>
      </header>

      <div className="d-flex justify-content-between m-5 mt-0">
        <SearchBar
          inputValue={cityName}
          setInputValue={setCityName}
          onSearch={handleSearch}
          inputPlaceholder="Enter city name"
          searchButtonText="Search"
        />
        {screenSize.width > 641 ? (
          <Button onClick={handleCurrentLocation} label="Current Location" />
        ) : (
          <Button onClick={handleCurrentLocation} icon="fa fa-location-arrow"  tooltipText="Current Location" />
        )}
      </div>

      {error && <div className="error-msg">{error}</div>}
      {!loading && !weatherData && !error && (
        <MovingCloud></MovingCloud>
      )}

      {loading && <WeatherCardLoader />}

      {weatherData && !loading && !error && (
        <WeatherDetails
          forecastData={weatherData.forecastData}
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
          city={displayedCity}
          date={weatherData.formattedDate}
        />
      )}
    </div>
  );
};

export default App;
