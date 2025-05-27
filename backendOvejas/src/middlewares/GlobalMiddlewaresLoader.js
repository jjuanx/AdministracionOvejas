// src/middlewares/GlobalMiddlewaresLoader.js
import express from 'express';
import helmet  from 'helmet';
import cors    from 'cors';
// import morgan from 'morgan';      // (opcional) logs HTTP

/**
 * Carga todos los middlewares que deben estar presentes
 * en *cada* petición entrante.
 */
export default function loadGlobalMiddlewares(app) {
  // 1. Seguridad HTTP Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: false   // permite servir ficheros estáticos si montas /public
    })
  );

  // 2. CORS (si en producción solo quieres un origen, cámbialo aquí)
  app.use(cors());

  // 3. Lectura de JSON y formularios
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 4. (opcional) Logger de peticiones
  // if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

  // 5. (opcional) Carpeta de estáticos
  // app.use('/public', express.static('public'));
}
