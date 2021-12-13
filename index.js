const customExpress = require('./config/customExpress.js');
const connection = require('./infra/connection.js');
const Tables = require('./infra/tables.js');

connection.connect(error => {
  if (error) return console.log('Error ao conectar', error);
  console.log('Conectado com sucesso');
  Tables.init(connection);

  const app = customExpress();
  app.listen(3000, () => console.log('Servidor rodando'));
});
