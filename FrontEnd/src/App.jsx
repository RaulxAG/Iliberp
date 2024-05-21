import { useState } from 'react'

import TramitarPedido  from './Pages/TramitarPedido'
import Tienda  from './Pages/Tienda'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import FormInicio from './Pages/FormsInicio'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormInicio />} ></Route>
          <Route path='/tienda' element={<Tienda />} ></Route>
          <Route path='/tramitar-pedido' element={<TramitarPedido />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
