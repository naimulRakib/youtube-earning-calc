// src/utils/weatherApi.ts

export interface WeatherData {
  temperature: number;      // Air temp (2m)
  humidity: number;         // Relative humidity
  windSpeed: number;        // Wind speed (10m)
  windDirection: number;    // Wind direction
  rain: number;             // Precipitation amount
  cloudCover: number;       // % of sky covered (affects photosynthesis)
  dewPoint: number;         // Critical for predicting dew formation (fungus risk)
  evapotranspiration: number; // ET0 - How much water the crop is losing
  soilMoistureSurface: number; // 0-1cm depth
  soilMoistureRoot: number;    // 3-9cm depth (Root zone)
  soilTemp: number;            // Soil temperature (0cm)
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    // We are adding:
    // - et0_fao_evapotranspiration: To calculate irrigation needs
    // - dew_point_2m: To predict fungal spore germination
    // - soil_moisture_3_to_9cm: Deeper moisture for roots
    // - cloud_cover: To estimate sunlight
    const params = [
      "temperature_2m",
      "relative_humidity_2m",
      "rain",
      "wind_speed_10m",
      "wind_direction_10m",
      "cloud_cover",
      "dew_point_2m",
      "et0_fao_evapotranspiration",
      "soil_moisture_0_to_1cm",
      "soil_moisture_3_to_9cm",
      "soil_temperature_0cm"
    ].join(",");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${params}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather API Failed");

    const data = await res.json();
    const current = data.current;

    return {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      rain: current.rain,
      cloudCover: current.cloud_cover,
      dewPoint: current.dew_point_2m,
      evapotranspiration: current.et0_fao_evapotranspiration,
      soilMoistureSurface: current.soil_moisture_0_to_1cm || 0,
      soilMoistureRoot: current.soil_moisture_3_to_9cm || 0,
      soilTemp: current.soil_temperature_0cm,
    };
  } catch (error) {
    console.error("Fetch Weather Error:", error);
    return null;
  }
}