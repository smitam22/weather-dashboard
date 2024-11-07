import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { fetchWeatherData, fetchCityCoordinates, fetchCurrentLocationWeather } from './utils/api';
import { act } from 'react';

// Define the type for your mock API functions (ensure it matches the real return type)
type WeatherData = {
  cityName: string;
  formattedDate: string;
  formattedTimeWithTimezone: string;
  sunrise: string;
  sunset: string;
  forecastData: Array<{
    date: string;
    temperature: string;
    humidity: string;
    description: string;
    icon: string;
  }>;
};

jest.mock('./utils/api', () => ({
  fetchWeatherData: jest.fn() as jest.Mock,  
  fetchCityCoordinates: jest.fn() as jest.Mock,
  fetchCurrentLocationWeather: jest.fn() as jest.Mock,
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls before each test
  });

  test('should fetch weather data when search button is clicked', async () => {
    const mockWeatherData: WeatherData = {
      cityName: 'Test City',
      formattedDate: 'Thu, Nov 07',
      formattedTimeWithTimezone: '11.14 AM IST',
      sunrise: '06:00 AM',
      sunset: '06:00 PM',
      forecastData: [
        {
          date: '07-11-2024',
          temperature: '25.0',
          humidity: '70',
          description: 'Clear sky',
          icon: '01d',
        },
      ],
    };

    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);
    (fetchCityCoordinates as jest.Mock).mockResolvedValue({ lat: 12.9716, lon: 77.5946 });


    render(<App />);

    const searchInput = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    // Wrap fireEvent calls in act()
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Test City' } });
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('Thu, Nov 07')).toBeInTheDocument();
    });

    expect(fetchWeatherData).toHaveBeenCalledTimes(1);
    expect(fetchWeatherData).toHaveBeenCalledWith(12.9716, 77.5946);
  });

  test('should fetch weather data for current location when button is clicked', async () => {
    // Mock response for current location weather
    const mockCurrentLocationWeather: WeatherData = {
      cityName: 'Current Location',
      formattedDate: 'Thu, Nov 07',
      formattedTimeWithTimezone: '11.14 AM IST',
      sunrise: '06:00 AM',
      sunset: '06:00 PM',
      forecastData: [
        {
          date: '07-11-2024',
          temperature: '22.0',
          humidity: '65',
          description: 'Partly cloudy',
          icon: '02d',
        },
      ],
    };

    // Mock the current location API call
    (fetchCurrentLocationWeather as jest.Mock).mockResolvedValue(mockCurrentLocationWeather);
    (fetchCityCoordinates as jest.Mock).mockResolvedValue({ lat: 12.9716, lon: 77.5946 });

    render(<App />);

    // Use act to wrap any state-changing actions (like firing events)
  await act(async () => {
    fireEvent.click(screen.getByText('Current Location'));
  });

  
    expect(fetchCurrentLocationWeather).toHaveBeenCalledTimes(1);
  });

  // Other tests...
});
