import express from 'express'
import cors from 'cors'
import loadOvejaRoutes from './routes/ovejaRoute';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

loadOvejaRoutes(app)

// Inicializar Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});
const db = admin.firestore();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Administración de Ovejas OK');
});

// Montar rutas de ovejas (las definiremos a continuación)
app.use('/ovejas', require('./routes/ovejaRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend escuchando en http://localhost:${PORT}`)
);
