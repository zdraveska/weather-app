# Weather App - NodeJS onboarding

A simple web application that allows users to **log in**, **view weather data** for multiple cities, and **sort strings**. It’s built with **Node.js**, **Express**, and **Vanilla JavaScript**, featuring token-based authentication and public/private route separation.

This project was developed as part of my onboarding to gain hands-on experience with Node.js and Express.

---

## Project Structure

```txt
├── public
│   ├── css
│   │   └── style.css
│   ├── index.html
│   ├── js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── sorting.js
│   │   └── weather.js
│   ├── login.html
│   ├── sorting.html
│   └── weather.html
└── src
    ├── app.js
    ├── config.js
    ├── controllers
    │   ├── auth.controller.js
    │   ├── datetime.controller.js
    │   ├── sort.controller.js
    │   └── weather.controller.js
    ├── errors
    │   └── api-error.js
    ├── middleware
    │   ├── auth.js
    │   └── error-handler.js
    └── routes
        ├── private.js
        └── public.js
├── eslint.config.js
├── package-lock.json
├── package.json
├── .env

```

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/zdraveska/node-onboarding-weather-app.git
cd node-onboarding-weather-app
```

### 2. Install dependencies

```
npm install
```

### 3. Set environment variables

Create a .env file in the root directory:

```
PORT=8141
JWT_SECRET=yourSecretHere
WEATHER_API_KEY=yourOpenWeatherAPIKey
WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
```

To obtain an API key, [create a free OpenWeather account](https://openweathermap.org/) and generate your key at https://home.openweathermap.org/api_keys.

### 4. Run the server

```
npm run start
```

or

```
npm run dev
```

The server will be running at: http://localhost:8141

## API Endpoints

### Public API Endpoints (`/api/public`)

- **POST `/login`**  
  Authenticate and receive a JWT token.

- **GET `/datetime`**  
  Retrieve the current server date and time.

- **POST `/sort`**  
  Submit an array of strings to be sorted and receive the sorted result.

---

### Private API Endpoints (`/api/private`)

- **GET `/weather`**  
  Fetch weather information for predefined cities.  
  _Requires a valid Bearer token in the `Authorization` header._
