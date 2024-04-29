import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const fecha = new Date();
  const opcionesDeFecha = { day: '2-digit', month: 'long', year: 'numeric' };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFecha);

  useEffect(() => {
    // Actualiza la hora actual cada segundo
    const intervalID = setInterval(() => setCurrentTime(new Date()), 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXVsYXJyb3lvODk2QGdtYWlsLmNvbSIsImp0aSI6Ijc2NTJmYzU5LTI4MDYtNDEyZS1hZGU3LWI5MDI0YzE4MzZjNiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzE0MzMwMTg3LCJ1c2VySWQiOiI3NjUyZmM1OS0yODA2LTQxMmUtYWRlNy1iOTAyNGMxODM2YzYiLCJyb2xlIjoiIn0.GWuYHUqQw0OQq2fzp8mG0Eygl9MmWMf_Ex34CkwFulE';
        const response = await axios.get(
          `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/18003?api_key=${apiKey}` // 18022 atarfe
        );

        const { datos } = response.data;
        const dataResponse = await axios.get(datos);
        setWeatherData(dataResponse.data[0]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Obtener la hora actual en formato 'hh:mm'
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Obtener la descripción del estado del cielo para la hora actual
  let description = '';
  if (weatherData) {
    const currentPeriod = weatherData.prediccion.dia[0].estadoCielo.find(period => period.periodo === formattedTime.split(':')[0]);
    if (currentPeriod) {
      description = currentPeriod.descripcion;
    }
  }

  return (
    <div>
      <h2>Información Meteorológica</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <p>{weatherData && weatherData.nombre}, {weatherData && weatherData.provincia}</p>
          <p>{description}</p>
          <p>{formattedTime}</p>
          <p>{fechaFormateada}</p>
        </>
      )}
    </div>
  );
};