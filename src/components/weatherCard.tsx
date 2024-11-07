import React from 'react';

interface WeatherCardProps {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number; // Added humidity prop
}

const WeatherCard: React.FC<WeatherCardProps> = ({ date, temperature, description, icon, humidity }) => {
  return (
    <div className="weather-card d-flex flex-column justify-content-center align-items-center text-center">
      <span className='weather-date'>{date}</span>
      <div className='d-flex align-items-center'>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
        <div className='d-flex flex-column'>
          <span className='card-temp'>
            {temperature}°C
          </span>
          <span className='temp-desc'>{description}</span>

        </div>
      </div>
      <div className='weather-humidity d-flex mt-2'>
        <div>Humidity:</div>
        <div className='humidity-temp'>{humidity}%</div>
         </div>

    </div>
  );
};

export default WeatherCard;
