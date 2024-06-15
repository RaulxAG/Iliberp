import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu'

export default function CompraExito() {
    const [pedidos, setPedidos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener datos del localStorage
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        // Verificar que todos los datos necesarios estén presentes
        if (username && userId && token) {
            setUser({ username, userId, token });
        } else {
            console.error("Error: No se pudieron recuperar los datos del usuario del localStorage.");
            navegate('/');
        }
    }, []);

    useEffect(() => {
        // Verificar que user esté definido
        user &&
            fetch(`http://localhost:8000/getOrdersJSON/?cliente=${user.userId}`)
                .then(response => response.json())
                .then(data => setPedidos(data))
                .catch(error => console.error('Error al coger pedidos', error));
        
    }, [user]);

    return (
        <section className='containerPrincipal mainMensajeria'>
            <Menu selected="tienda" username={user ? user.username : "Invitado"}></Menu>
            <section className="contenedor box overflow-hidden">
                <h2 className='tittle'>Pedidos de Judith</h2>
                <div className='barScroll box mt-5 overflow-y-auto d-flex flex-column gap-4 ' >
                    {pedidos.map(pedido => (
                        <div key={pedido.id} className='box'>
                            <h2 className='tittle'>Pedido del {pedido.fecha}</h2>
                            <p className='mt-4'><strong>Cliente:</strong> {pedido.cliente}</p>
                            <p><strong>Fecha:</strong> {pedido.fecha}</p>
                            <p><strong>Dirección:</strong> {pedido.direccion}</p>
                            <p><strong>Estado:</strong> {pedido.estado}</p>
                            <p><strong>Subtotal:</strong> {pedido.subtotal}</p>
                            <p><strong>IVA:</strong> {pedido.IVA}</p>
                            <p><strong>Total:</strong> {pedido.total}</p>
                            <h3 className='h3'>Detalle del Pedido:</h3>
                            <ul>
                                {pedido.lineas.map((linea, index) => (
                                    <li key={index}>
                                        <strong>Artículo:</strong> {linea.articulo}, <strong>Unidades:</strong> {linea.unidades}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </section>

        
    );
}

