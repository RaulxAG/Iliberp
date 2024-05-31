import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Incidencias from './Pages/Incidencias';
import Mensajeria from './Pages/Mensajeria';
import WeatherComponent from './components/Tiempo';
// import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />

        <Route path="/incidencias" element={<Incidencias />} />

        <Route path="/mensajeria" element={<Mensajeria />} />
        <Route path="/mensajeria/:chat_id" element={<Mensajeria />} />

        <Route path="/tiempo" element={<WeatherComponent />} />

      </Routes>
    </Router>
  </React.StrictMode>,
)
