class Tables {
  init(connection) {
    this.connection = connection;

    this.createServices();
  }

  createServices() {
    const sql = 'CREATE TABLE IF NOT EXISTS Services (id in NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, data datetime NOT NULL, createDate datetime NOT NULL, status varchar(20) NOT NULL, observation text, PRIMARY KEY(id))';

    this.connection.query(sql, (error) => {
      if(error) console.log('Erro ao criar tabela');

      console.log('Tabela criado com sucesso');

    });
  }
}

module.exports = new Tables;