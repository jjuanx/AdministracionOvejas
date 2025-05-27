import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import UserController from '#src/controllers/UserController.js';

/**
 * Registra la estrategia Bearer.
 *  - `UserController.findByToken(token)` debe devolver el usuario o `null`.
 *  - Si devuelve `null`, rechazamos la autenticación.
 */
export function initPassport () {
  passport.use(new BearerStrategy(async (token, done) => {
    try {
      const user = await UserController.findByToken(token);
      if (!user) return done(null, false, { message: 'Token inválido' });
      return done(null, user, { scope: 'all' });
    } catch (err) {
      return done(err);           // error real => 500
    }
  }));
}

/**
 * Middleware de inicialización (opcional, para no repetir en cada router).
 */
export const passportInitMiddleware = passport.initialize();
