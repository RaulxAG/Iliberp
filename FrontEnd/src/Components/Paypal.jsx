//Paypal
import ReactDOM from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export default function PayPalComponent({monto}) {
    const navigate = useNavigate();

    const finalizarPedido = () => {
        const pedido = {
            cliente_id: 1,  // Cambiar por el id cuando se loguee
            direccion: direccion,  // Crear el string de la calle
            lineas: carrito.map(producto => ({
                articulo_id: producto.id,
                unidades: producto.cantidad
            }))
        };
    
        fetch('http://localhost:8000/makeOrderJSON/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Pedido creado exitosamente. ID del pedido: ' + data.pedido_id);
            } else {
                alert('Error al crear el pedido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return(
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
                style={{
                    layout: 'vertical',  
                    color: 'white',       
                    shape: 'pill',       
                    label: 'paypal',    
                    tagline: false       
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value:  monto.toString(), 
                                },
                            },
                        ],
                    });
                }}
                onApprove={() => {
                    navigate("/compraExito");
                    finalizarPedido()
                }}
            />
        </PayPalScriptProvider>
    )
}
