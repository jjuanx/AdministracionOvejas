import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename)

const loadRoutes = async function (app) {
  const files = fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')

  for (const file of files) {
    const fileURL = pathToFileURL(path.join(__dirname, file)).href
    const { default: loadFileRoutes } = await import(fileURL)
    loadFileRoutes(app)
  }
}

export default loadRoutes
