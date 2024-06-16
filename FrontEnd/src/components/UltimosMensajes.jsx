import { useEffect, useState } from "react";
import CardMensaje from "./CardMensaje";

export default function UltimosMensajes({ page, selected, query, t, user_logued_id }) {
    const [ mensajes, setMensajes ] = useState();
    const [ loading, setLoading ] = useState(true);

    const obtenerChats = async () => {
        try {
            const response = await fetch(`https://iliberp.work.gd/empleados/getChatsJSON/${user_logued_id}/`, {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();

                // Actualizar el estado con los datos recibidos
                setMensajes(responseData.chats);
                setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        obtenerChats();
    }, []);

    return (
        <>
            {loading && (
                <div className="w-100 d-flex align-items-center justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && mensajes.map((mensaje, index) => (
                <CardMensaje key={index} mensaje={mensaje} page={page} selected={selected} query={query}/>
            ))}

            {!loading && mensajes.length === 0 && (
                <h5>{t('noMensajes')}</h5>
            )}
        </>
    );
}