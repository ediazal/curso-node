const mongoose = require('mongoose');
require('dotenv').config()
// Configuración de conexión de base de datos

mongoose.connect(process.env.DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.info('Conexión realizada con MongoDB'))
  .catch(error => {
    console.error('Error de conexión con MongoDB: ', error.message)
    process.exit(0)
  })

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Desconexión realizada con MongoDB')
    process.exit(0)
  })
})

module.exports = mongoose;
