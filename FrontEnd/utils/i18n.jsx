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
        }
      }
    }
  });

export default i18n;