import React from 'react';
import WeatherCard from './weatherCard';
import humidityIcon from '../assets/air.png';
import sunriseIcon from '../assets/sunrise.png';
import sunsetIcon from '../assets/sunset.png';

interface WeatherDetailsProps {
  forecastData: Array<{
    date: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
  }>;
  sunset?: string;
  sunrise?: string;
  city?: string;
  date?: string;
  time?: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ forecastData, sunset, sunrise, city, date, time }) => {
  return (
    <div className="weather-details my-2 mx-4 ">
      {forecastData.length > 0 && (
        <div className="first-weather-card d-flex">
          <div className='left-sec d-flex align-items-center first-sec-info flex-wrap'>
            <div className='date-time-temp p-3'>
              <div className='today-date'>{date}</div>
              <div className='d-flex align-items-end'>
                <span className='today-temp'>{forecastData[0].temperature}°</span>
                <span className='temp-unit'>C</span>
              </div>
            </div>

            <div className='weather-desc'>
              <img src={`https://openweathermap.org/img/wn/${forecastData[0].icon}@2x.png`} alt="Weather icon" />
              <div className='text-center'>{forecastData[0].description}</div>
            </div>
            <h2 className='city-name'>{city}</h2>
          </div>
          <div className='other-info-sec d-flex justify-content-between align-items-center'>
            <div className=' d-flex humidity'>
              <img src={humidityIcon} alt='humidity' className='right-icons'></img>
              <div className='d-flex flex-column icon-info'>
                <span className='info-value'>{forecastData[0].humidity}%</span>
                <span>Humidity</span>
                </div>
              </div>
              <div className=' d-flex humidity'>
              <img src={sunriseIcon} alt='sunrise' className='right-icons'></img>
              <div className='d-flex flex-column icon-info'>
                <span className='info-value'>{sunrise}</span>
                <span>Sunrise</span>
                </div>
              </div>
              <div className=' d-flex humidity'>
              <img src={sunsetIcon} alt='sunset' className='right-icons'></img>
              <div className='d-flex flex-column icon-info'>
                <span className='info-value'>{sunset}</span>
                <span>Sunset</span>
                </div>
              </div>
           
          </div>
        </div>
      )}
      <div className='d-flex flex-wrap justify-content-between mt-3 gap-3'>
        {forecastData.slice(1).map((data, index) => (
          <WeatherCard
            key={index}
            date={data.date}
            temperature={data.temperature}
            description={data.description}
            icon={data.icon}
            humidity={data.humidity}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
