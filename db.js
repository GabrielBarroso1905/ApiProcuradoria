require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mssql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectOptions: {
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
  }
});

// Teste de conexão
sequelize
  .authenticate()
  .then(async () => {
    console.log('Conexão bem-sucedida.');

    // Listar tabelas
    const [results, metadata] = await sequelize.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'TB_BEM'");

    console.log('Tabelas encontradas:');
    results.forEach(row => {
      console.log(row.TABLE_NAME);
    });

  })
  .catch(err => {
    console.error('Erro ao conectar:', err);
  });

module.exports = sequelize;
