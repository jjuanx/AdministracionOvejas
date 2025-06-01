import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import UserController from '../controllers/UsuarioController.js'

const initPassport = function () {
  passport.use(new BearerStrategy(
    async function (token, done) {
      try {
        const user = await UserController.findByToken(token)
        return done(null, user, { scope: 'all' })
      } catch (err) {
        return done(null, false, { message: err.message })
      }
    }
  ))
}

export { initPassport }
