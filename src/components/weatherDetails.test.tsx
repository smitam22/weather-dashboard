import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetails from './weatherDetails';

const mockForecastData = [
  {
    date: '2024-11-08',
    temperature: 22,
    description: 'Clear sky',
    icon: '01d',
    humidity: 45,
  },
  {
    date: '2024-11-09',
    temperature: 18,
    description: 'Partly cloudy',
    icon: '02d',
    humidity: 50,
  },
];

describe('WeatherDetails Component', () => {
  test('renders weather details for the first forecast', () => {
    render(
      <WeatherDetails
        forecastData={mockForecastData}
        sunrise="06:15 AM"
        sunset="05:45 PM"
        city="New York"
        date="2024-11-08"
        time="12:00 PM"
      />
    );

    // Check if the main temperature is rendered
    expect(screen.getByText('22°')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();

    // Check if the humidity, sunrise, and sunset are rendered
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('06:15 AM')).toBeInTheDocument();
    expect(screen.getByText('Sunrise')).toBeInTheDocument();
    expect(screen.getByText('05:45 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunset')).toBeInTheDocument();
  });

  test('renders additional weather cards for the forecast data', async () => {
    render(
      <WeatherDetails
        forecastData={mockForecastData}
        city="New York"
        date="2024-11-08"
      />
    );

  
    // Use findByText for async checks
    const tempElement = await screen.findByText('18°C'); // Use await within async function
    expect(tempElement).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  });

  test('does not render anything if forecast data is empty', () => {
    render(<WeatherDetails forecastData={[]} />);

    // Check if the component does not render any content
    expect(screen.queryByText('New York')).not.toBeInTheDocument();
    expect(screen.queryByText('22°')).not.toBeInTheDocument();
  });
});
