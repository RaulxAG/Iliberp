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
            // Traducciones Raul
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

        }
      },
      es: {
        translation: {
          // Inicio
            // Raul's traductions
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
        }
      }
    }
  });

export default i18n;