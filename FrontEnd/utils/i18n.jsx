// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Home
            // Raul's traductions
            "destacados": "Featured Products",
            "recientes": "Recents Messages",

            "noMensajes": "You have no pending conversations",
            
            "reportar": "Report Incident",
              "sistemas": "Systems",
              "web": "Web",
              "telefonia": "Telephony",
              "ciberseguridad": "Cibersecurity",
              "mantenimiento": "Maintenance",
              "programacion": "Programming",
            
            "tickets": "Tickets in Progress",
              "noIncidencias": "No incidents in progress, Congrats!",
              "descripcion": "Description",
              "observaciones": "Observations",
              "estado": "State",
              "prioridad": "Priority",
              "fecha": "Date",
              "categoria": "Category",
                "taller": "Workshop",
              "eliminar": "Delete",
              "guardar": "Save Changes",
              "editar": "Edit",

          // Incidents
            // Raul's traductions
            "reportarInc": "Report an incident",
            "motivo": "Reason of your incident",
            "errorMotivo": "You need to indicate the reason.",
            "errorCategoria": "Choose a category",
            "descripcionInc": "Description of your incident:",
            "textoEnviar": "Send",
            "textoVaciar": "Reset",

          // Chat
            // Raul's traductions
            "nuevo": "New Chat",
              "contacto": "Select a contact",
              "iniciar": "Start chat",
              "seleccionar": "Select",
              "filtroRecientes": "Newests",
              "filtroAntiguos": "Oldests",
              "buscar": "Search . . .",
            "filtrar": "Filter",
            "info": "Select a Chat to see the messages or start a new one.",
            "anterior": "Load previous page",
            "escribeMensaje": "Write a message . . .",


          // 404
            // Raul's traductions
            "noEncontrado": "PAGE NOT FOUND",

          // FormInicio
            // Judith's translations
            "crearCuenta": "Create Account",
            "iniciarSesion": "Log In",
            "noCuenta": "Don't have an account? Sign up",
            "registrarse": "Sign Up",
            "usuario": "Username",
            "contrasena": "Password",
            "olvidarContrasena": "Forgot your password?",
            "nombreComun": "First Name",
            "apellido": "Last Name",
            "telefono": "Phone",
            "email": "Email",
            "dni": "ID",
            "registrarme": "Register",
        
        // Tienda
            // Judith's translations
            "tienda": "Store",
            "filtrarPor": "Filter by:",
            "precio": "Price",
            "min": "Min",
            "max": "Max",
            "categoria": "Category",
            "portatiles": "Laptops",
            "teclados": "Keyboards",
            "ratones": "Mice",
            "monitores": "Monitors",
            "todos": "All",
            "ordenarPor": "Sort by:",
            "nombreAZ": "Name (A-Z)",
            "nombreZA": "Name (Z-A)",
            "precioAsc": "Price Ascending",
            "precioDesc": "Price Descending",

          //Carrito
              // Judith's translations
              "total": "Total",
              "tramitar": "Process order",

          //Tramitar pedido
              // Judith's translations
              "calleError": "You must provide the street",
              "numberError": "You must provide the number, floor, or door",
              "numberErrorPattern": "Invalid format, only numbers and letters",
              "pronvinciaError": "You must provide the province",
              "provincia": "Province",
              "localidad": "City",
              "codigoPostal": "Postal Code",
              "codigoPostalError": "You must provide the postal code",
              "resumenPedido": "Order Summary",
              "numero": "Number, floor, door...",
              "calle": "Street",
              "nombre": "Name",
              "pedidoInfo": "Shipping Information",
              "cantidad":"Quantity",
              "precioTotal":"Price",
              "precioTotalPedido":"Total order price:",
              "siguiente": "Next",
              "anterior": "Back",
              "codigoPostalErrorPattern": "The postal code must be 5 digits",
              "verCarrito": "View Cart",

          //Pdf pedido
              // Judith's translations
              "productos":"Products",
              "datosEnvio": "Shipping address details",
              "pedido":"Order",
              // Las demas palabras como cantidad, precio... ya esta declaradas arriba

          //Producto
              // Judith's translations
              "especificaciones":"Specifications",
          
          //Productos
              // Judith's translations
              "verMas":"See more",

          //Compra con éxito
              // Judith's translations
              "susPedidos":"Your Orders",
              "pedidoDel":"Order from  ",
              "customer": "Client",
              "fecha": "Date",
              "estado": "Status",
              "subtotal": "Subtotal",
              "iva": "Tax",
              "detallePedido": "Order Details",
              "articulo": "Item",
              "unidades": "Units",
              "direccion": "Address"
          
        }
      },
      es: {
        translation: {
          // Inicio
            // Traducciones Raul
            "destacados": "Productos Destacados",
            "recientes": "Mensajes Recientes",

            "noMensajes": "No tienes conversaciones pendientes",
            
            "reportar": "Reportar Incidencia",
              "sistemas": "Sistemas",
              "web": "Web",
              "telefonia": "Telefonía",
              "ciberseguridad": "Ciberseguridad",
              "mantenimiento": "Mantenimiento",
              "programacion": "Programación",

            "tickets": "Tickets en Curso",
              "noIncidencias": "No hay incidencias en curso, ¡Felicidades!",
              "descripcion": "Descripcion",
              "observaciones": "Observaciones",
              "estado": "Estado",
              "prioridad": "Prioridad",
              "fecha": "Fecha",
              "categoria": "Categoria",
                "taller": "Taller",
              "eliminar": "Eliminar",
              "guardar": "Guardar Cambios",
              "editar": "Editar",
          
          // Incidencias
            //Traducciones Raul
            "reportarInc": "Reportar una incidencia",
            "motivo": "Motivo de tu incidencia",
            "errorMotivo": "Debes indicar el motivo",
            "errorCategoria": "Selecciona una categoría",
            "descripcionInc": "Descripción de tu incidencia:",
            "textoEnviar": "Enviar",
            "textoVaciar": "Vaciar",
          
          // Chat
            // Raul's traductions
            "nuevo": "Nuevo Chat",
              "contacto": "Selecciona un contacto",
              "iniciar": "Empezar chat",
              "seleccionar": "Select",
              "filtroRecientes": "Recientes",
              "filtroAntiguos": "Antiguos",
              "buscar": "Buscar . . .",
            "filtrar": "Filtrar",
            "info": "Selecciona un Chat para ver los mensajes o inicia uno nuevo.",
            "anterior": "Cargar página anterior",
            "escribeMensaje": "Escribe un mensaje . . .",

          // 404
            // Traducciones Raul
            "noEncontrado": "PÁGINA NO ENCONTRADA",

          // FormInicio
            // Traducciones Judith
            "crearCuenta": "Crear cuenta",
            "iniciarSesion": "Iniciar Sesión",
            "noCuenta": "¿Aún no tienes cuenta? Regístrate",
            "registrarse": "Regístrate",
            "usuario": "Usuario",
            "contrasena": "Contraseña",
            "olvidarContrasena": "¿Has olvidado tu contraseña?",
            "nombreComun": "Nombre",
            "apellido": "Apellido",
            "telefono": "Teléfono",
            "email": "Email",
            "dni": "DNI",
            "registrarme": "Registrarme",

          //Tienda
              // Traducciones Judith
              "tienda": "Tienda",
              "filtrarPor": "Filtrar por:",
              "precio": "Precio",
              "min": "Min",
              "max": "Max",
              "categoria": "Categoría",
              "portatiles": "Portátiles",
              "teclados": "Teclados",
              "ratones": "Ratones",
              "monitores": "Monitores",
              "todos": "Todos",
              "ordenarPor": "Ordenar por:",
              "nombreAZ": "Nombre (A-Z)",
              "nombreZA": "Nombre (Z-A)",
              "precioAsc": "Precio Ascendente",
              "precioDesc": "Precio Descendente",

          //Carrito
              // Traducciones Judith
              "total": "Total",
              "tramitar": "Tramitar pedido",
          
          //Tramitar pedido
              // Traducciones Judith
              "calleError": "Debes indicar la calle",
              "numeroError": "Debes indicar el número, piso o portal",
              "numeroErrorPattern": "Formato inválido, solo números y letras",
              "provinciaError": "Debes indicar la provincia",
              "provincia": "Provincia",
              "localidad": "Localidad",
              "codigoPostal": "Código Postal",
              "codigoPostalError": "Debes indicar el código postal",
              "resumenPedido": "Resumen del Pedido",
              "numero": "Número, piso, portal...",
              "calle": "Calle",
              "nombre": "Nombre",
              "pedidoInfo": "Información de Envío",
              "cantidad": "Cantidad",
              "precioTotal": "Precio",
              "precioTotalPedido": "Precio total del pedido:",
              "siguiente": "Siguiente",
              "anterior": "Anterior",
              "codigoPostalErrorPattern": "El código postal debe tener 5 dígitos",
              "verCarrito": "Ver Carrito",

          //Pdf pedido
              // Traducciones Judith
              "productos":"Productos",
              "datosEnvio":"Datos dirección de envío",
              "pedido":"Pedido",
              // Las demas palabras como cantidad, precio... ya esta declaradas arriba

          //Producto
              // Traducciones Judith
              "especificaciones":"Especificaciones",
          
          //Productos
              // Traducciones Judith
              "verMas":"Ver más",

          //Compra con éxito
              // Traducciones Judith
              "susPedidos":"Sus pedidos",
              "pedidoDel":"Pedido del ",
              "cliente": "Cliente",
              "fecha": "Fecha",
              "estado": "Estado",
              "subtotal": "Subtotal",
              "iva": "IVA",
              "detallePedido": "Detalle del Pedido",
              "articulo": "Artículo",
              "unidades": "Unidades",
              "direccion": "Dirección"

        }
      }
    }
  });

export default i18n;