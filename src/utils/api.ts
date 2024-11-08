// API key for OpenWeatherMap service
const API_KEY = '71f0da039d6465d39a698ed67eca80aa';

// Function to fetch city coordinates based on the city name input
export const fetchCityCoordinates = async (cityName: string) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
  const data = await response.json();
  if (!data.length) throw new Error('City not found');
  return { lat: data[0].lat, lon: data[0].lon, city: data[0].name };
};


// Function to fetch weather data based on latitude and longitude
export const fetchWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();
  const cityName = data.city.name;

  // Get the city's time zone offset (in seconds)
  const timezoneOffset = data.city.timezone;

  // Format the current date (e.g., "Thu, Nov 07")
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-IN', {
    weekday: 'short', // Day (e.g., 'Thu')
    year: 'numeric',
    month: 'short', // Month (e.g., 'Nov')
    day: '2-digit', // Day (e.g., '07')
  });

// Explicitly type timeOptions
const timeOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true, // Use 12-hour format
};
  
  const formattedTime = currentDate
    .toLocaleString('en-IN', timeOptions)
    .replace(':', '.'); // Replaces ':' with '.' to match "11.14 AM"

  // Manually add the time zone abbreviation (for India, it's 'IST')
  const timezone = 'IST'; // You can modify this for other time zones if needed
  const formattedTimeWithTimezone = `${formattedTime} ${timezone}`;

  // Format sunrise and sunset times
 
  const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });



  const days: string[] = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const formattedDay = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;
    days.push(formattedDay);
  }

  const forecastData = data.list
    .filter((item: any) => {
      const forecastDate = item.dt_txt.split(' ')[0];
      const formattedForecastDate = forecastDate.split('-').reverse().join('-');
      return days.includes(formattedForecastDate);
    })
    .map((item: any) => {
      const formattedDate = item.dt_txt.split(' ')[0].split('-').reverse().join('-');
      return {
        date: formattedDate,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    });

  const averageWeatherData = days.map((day) => {
    const dayData = forecastData.filter((item: any) => item.date === day);

    const averageTemperature = dayData.reduce((acc: number, item: any) => acc + item.temperature, 0) / dayData.length;
    const averageHumidity = dayData.reduce((acc: number, item: any) => acc + item.humidity, 0) / dayData.length;

    const description = dayData[0]?.description || 'No data';
    const icon = dayData[0]?.icon || '01d';

    return {
      date: day,
      temperature: averageTemperature.toFixed(1),
      humidity: averageHumidity.toFixed(1),
      description: description,
      icon: icon,
    };
  });


  return {
    cityName,
    formattedDate, // Returns date
    formattedTimeWithTimezone, // Returns current time with timezone"
    sunrise, // returns sunrise time for presentday
    sunset, // returns sunset time for presentday
    forecastData: averageWeatherData
  };
};

// Function to fetch weather data based on the user's current location using geolocation
export const fetchCurrentLocationWeather = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherData(latitude, longitude);
      resolve(data);
    }, reject);
  });
};
