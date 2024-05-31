// import { useNavigate } from "react-router-dom";

export async function registerJSON(data, navigate) {
    // const navigate = useNavigate();

    try {
        const response = await fetch(`http://127.0.0.1:8000/registerJSON/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.usuario,
                password: data.password,
                full_name: data.nombre_completo,
                phone: data.telefono,
                email: data.email,
            }),
        });

        if (!response.ok) {
            return response.json().then(errorData => {
                alert("Ha habido un error: " + errorData.error);
            });
        } else {
            alert("Usuario registrado exitosamente");
            navigate("/inicio");
        }

    } catch (error) {
        console.error('Error:', error);
    }
}