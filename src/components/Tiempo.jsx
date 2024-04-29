import React, { useState, useEffect } from 'react';
import moment from 'moment';

const WeatherComponent = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      
      function success(pos) {
        const crd = pos.coords;
      
        console.log("Tu ubicación actual es:");
        console.log(`Latitud : ${crd.latitude}`);
        console.log(`Longitud: ${crd.longitude}`);
        console.log(`Más o menos ${crd.accuracy} metros.`);
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
      

};

export default WeatherComponent;