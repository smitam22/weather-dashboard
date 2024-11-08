# Weather Dashboard App

## Overview
The Weather Dashboard is a React-based application that provides weather information for a specific city or the user\u2019s current location. It leverages external APIs to fetch and display weather data in a user-friendly manner.

## Features
- **City Search**: Enter a city name to get current weather information.
- **Current Location**: Fetch weather data based on the user's current location.
- **Loading Animation**: Displays a loader while fetching data.
- **Error Handling**: Shows error messages for incorrect city names or API issues.
- **Animated Cloud**: A visually appealing cloud image that moves continuously in the background.

## Technologies Used
- **React**: For building the UI.
- **TypeScript**: Ensures type safety and better development practices.
- **CSS**: Custom styling for enhanced visuals.
- **APIs**: Fetches city coordinates and weather data.
- **JavaScript**: Used for animations and utility functions.

## Components
### `SearchBar`
- A reusable component for entering a city name and starting the search.
  - **Props**:
    - `inputValue`: Current input field value.
    - `setInputValue`: Function to update input.
    - `onSearch`: Function to handle search action.
    - `inputPlaceholder`: Placeholder text for the input.
    - `searchButtonText`: Text for the search button.

### `WeatherDetails`
- Displays detailed weather data.
- Accepts weather data as props and renders it in a structured format.

### `Button`
- A reusable button component.
  - **Props**:
    - `onClick`: Function executed when the button is clicked.
    - `label`: Button text.

### `WeatherCardLoader`
- A loader component shown while weather data is being fetched.

## Running the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git


2. Navigate to the project directory:
   ```bash
    cd weather-dashboard

3. Install dependencies:
   ```bash
    npm install

4. Start the development server:
   ```bash
   npm start


## Deployment

 For deployment, build the project using:
 
  ```bash
  npm run build


