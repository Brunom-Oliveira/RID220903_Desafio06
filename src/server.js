require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./db');

const port = process.env.PORT || 3000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao conectar no MongoDB:', error.message);
    process.exit(1);
  });
