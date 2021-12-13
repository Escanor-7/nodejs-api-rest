const Service = require('../models/services.js');

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Service.list(res);
  });

  app.post('/atendimentos', (req, res) => {
    const resp = (req.body);
    Service.create(resp, res);
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Service.idSearch(id, res);
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Service.alter(id, values, res);
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    Service.delete(id, res);
  })
}