const moment = require('moment');
const connection = require('../infra/connection.js');

class Service {
  create(service, res) {
    const createData = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const dateIsValid = moment(data).isSameOrBefore(createData);
    const clientIsValid = service.cliente.length >= 5;

    const validations = [
      {
        name: 'data',
        valid: dateIsValid,
        message: 'Data deve ser maior ou igual a data atual'
      },
      {
        name: 'cliente',
        valid: clientIsValid,
        message: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]

    const errors = validations.filter(field => !field.valid);

    const existingErrors = errors.length;

    if (existingErrors) {
      res.status(400).json(errors);
    } else {
      const serviceDated = { ...service, createData, data };

      const sql = 'INSERT INTO Services SET ?';

      connection.query(sql, serviceDated, (error, result) => {
        if (error) res.status(400).json(error);
        res.status(201).json(service);
      })
    }
  }

  list(res) {
    const sql = 'SELECT * FROM Services';

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    })
  }

  idSearch(id, res) {
    const sql = `SELECT * FROM Services WHERE id=${id}`;

    connection.query(sql, (error, results) => {
      const service = results[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(service);
      }
    })
  }

  alter(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }
    const sql = 'UPDATE Services SET ? WHERE id=?';

    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({...values, id});
      }
    })
  }

  delete(id, res) {
    const sql = 'DELETE FROM Services WHERE id=?';

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    })
  }
}

module.exports = new Service;