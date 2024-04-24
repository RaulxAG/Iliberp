import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Incidencias from './Pages/Incidencias';
import Mensajeria from './Pages/Mensajeria';
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
      </Routes>
    </Router>
  </React.StrictMode>,
)
