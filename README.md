# Cryptocurrency Stats API

## Overview

The Cryptocurrency Stats API is a Node.js-based backend service that provides cryptocurrency data, such as price and market statistics. It also calculates deviations in prices over time. Data is fetched regularly from the CoinGecko API and stored in a MongoDB database.

## Features

- Fetches and serves cryptocurrency data (price, market cap, 24-hour changes).
- Calculates and serves deviation statistics for cryptocurrency prices.
- Runs automated background tasks to update data every 2 hours.

## Prerequisites

Before using the API, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud-based like MongoDB Atlas)

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd cryptocurrency-stats-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the project root directory.
   - Add the following:
      ```
      MONGODB_URI=<your-mongodb-uri>
      PORT=<port-number>
      ```

4. Run the server:

   ```
   npm run dev
   ```

   The API will be available at `http://localhost:8000`.

## Endpoints

### 1. /api/stats

- Method: GET
- Description: Retrieves the latest cryptocurrency stats.
- Response Example:
   ```
   {
      "name": "Bitcoin",
     "data": {
         "price": 94316,
         "marketCap": 1867534767052.2166,
         "change24h": 0.9657249162588066
     },
     "timestamp": "2025-01-10T17:36:11.674Z"
   }
   ```

### 2. /api/deviation

- Method: GET
- Description: Retrieves the percentage deviation in cryptocurrency prices compared to previous data.
- Response Example:
   ```
   {
     "name": "Bitcoin",
     "deviation": 218.38137876842382
   }
   ```

## Background Process

The API uses Agenda to run a background job every 2 hours. This job fetches the latest cryptocurrency prices and updates the MongoDB database. You don’t need to trigger this manually.

## Technologies Used

- Node.js: Backend runtime environment
- Express.js: Server framework
- MongoDB: Database
- Agenda: Job scheduler
- Axios: HTTP client
- CoinGecko API: Source of cryptocurrency data
