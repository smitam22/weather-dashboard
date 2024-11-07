import React, { useState, useEffect } from 'react';
import SearchBar from './components/common/searchBar';
import WeatherDetails from './components/weatherDetails';
import { fetchWeatherData, fetchCityCoordinates, fetchCurrentLocationWeather } from './utils/api';
import Button from './components/common/button';
import '../src/components/weatherDetails.css';
import WeatherCardLoader from './components/weatherCardLoader';
import cloudImage from './assets/cloud.png';

const App: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');

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

  const displayedCity = city ? city : weatherData?.cityName || '';

  useEffect(() => {
    // JavaScript logic to make the cloud image move continuously
    const cloudImageElement = document.getElementById('cloudImage') as HTMLImageElement;
    if (cloudImageElement) {
      let position = -cloudImageElement.width; // Start off-screen to the left
      const speed = 1;  // Adjust speed of movement
      const animateCloud = () => {
        position += speed;
        if (position > window.innerWidth) {
          position = -cloudImageElement.width;
        }
        cloudImageElement.style.transform = `translateY(-50%) translateX(${position}px)`;
        requestAnimationFrame(animateCloud);
      };
      animateCloud(); // Start the animation
    }
  }, []);

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
        <Button onClick={handleCurrentLocation} label="Current Location" />
      </div>

      {error && <div className="error-msg">{error}</div>}
      {!loading && !weatherData && !error && (
        <div className="moving-cloud">
          <img
            id="cloudImage"
            src={cloudImage}
            alt="Moving Cloud"
            style={{ height: '200px', position: 'absolute', top: '50%' }}
          />
        </div>
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
