import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tiempo() {
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
    <div className='w-100 h-100'>
      {loading ? (
        <div className='d-flex align-items-center justify-content-center h-100'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      
      ) : (
        <div className='d-flex flex-column justify-content-between h-100 p-3'>
          <div className='h-50'>
            <figure className="tiempo__logo d-flex">
                <img width={50} src="/assets/img/logo.png" alt="Logo" />
                <article className="d-none d-lg-block">
                    <p className="fs-3 m-0 fw-bold">ILIBERP</p>
                    <p className="m-0 text-start">Solutions</p>
                </article>
            </figure>
          </div>
          <div className='d-flex justify-content-between pb-4 h-50'>
            <article className='text-start'>
              <p className='fs-1 fw-bold m-0'>{formattedTime}</p>
              <p className='fs-5 m-0'>{fechaFormateada}</p>
            </article>
            
            <article className='text-end'>
              <p className='mt-4'>{weatherData && weatherData.nombre}, {weatherData && weatherData.provincia}</p>
              <p>{description}</p>
              
            </article>
          </div>
        </div>
      )}
    </div>
  );
}