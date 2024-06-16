import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Incidencias from './Pages/Incidencias';
import Mensajeria from './Pages/Mensajeria';
import WeatherComponent from './components/Tiempo';
import FormInicio from './Pages/Login';
import Tienda from './Pages/Tienda';
import TramitarPedido from './Pages/TramitarPedido';
import CompraExito from './Pages/CompraExito';
import Pdfpedido from './Pages/Pdfpedido';
import NotFound from './Pages/404';
// import App from './App.jsx'
import '../utils/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    
    <Router>
      <Routes>
        <Route path="/clientes/*" element={<NotFound />} />

        <Route path="/clientes/" element={<FormInicio />} />
        <Route path="/clientes/home" element={<Inicio />} />
        <Route path="/clientes/inicio" element={<Inicio />} />

        <Route path="/clientes/incidencias" element={<Incidencias />} />

        <Route path="/clientes/mensajeria" element={<Mensajeria />} />
        <Route path="/clientes/mensajeria/:chat_id" element={<Mensajeria />} />

        <Route path="/clientes/tiempo" element={<WeatherComponent />} />

        {/* JUDITH */}

        <Route path='/clientes/tienda' element={<Tienda />} ></Route>
        
        <Route path='/clientes/tramitar-pedido' element={<TramitarPedido />}></Route>
        
        <Route path='/clientes/compraExito' element={<CompraExito />}></Route>
        
        <Route path='/clientes/descargarInfoPedido' element={<Pdfpedido />}></Route>

      </Routes>
    </Router>
  </React.StrictMode>,
)
