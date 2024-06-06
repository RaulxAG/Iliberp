import { useState } from 'react'

import TramitarPedido  from './Pages/TramitarPedido'
import Tienda  from './Pages/Tienda'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import FormInicio from './Pages/FormsInicio'
import CompraExito from './Pages/CompraExito'
import Pdfpedido from './Pages/Pdfpedido'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormInicio />} ></Route>
          <Route path='/tienda' element={<Tienda />} ></Route>
          <Route path='/tramitar-pedido' element={<TramitarPedido />}></Route>
          <Route path='/compraExito' element={<CompraExito />}></Route>
          <Route path='/descargarInfoPedido' element={<Pdfpedido />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
