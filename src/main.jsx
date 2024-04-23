import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Incidencias from './Pages/Incidencias';
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
      </Routes>
    </Router>
  </React.StrictMode>,
)
