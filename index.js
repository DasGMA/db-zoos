const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
      res.status(201).json(zoos);
  })
  .catch(error => {
      res.status(500).json(error);
  })
});

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  // Using knex
  db('zoos')
    .select()
    .where('id', id)
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo).into('zoos')
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(error => res.status(500).json(error))
});

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  // Using Knex
  db('zoos')
    .where({id})
    .del()
    .then( zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const name = req.body;
  // Using Knex
  db('zoos')
    .where({id})
    .update(name)
    .then( zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});



// Bears CRUD operations goes here

server.get('/api/bears', (req, res) => {
  db('bears').then(bears => {
      res.status(201).json(bears);
  })
  .catch(error => {
      res.status(500).json(error);
  })
});

server.get('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  // Using knex
  db('bears')
    .select()
    .where('id', id)
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.post('/api/bears', (req, res) => {
  const bear = req.body;
  db.insert(bear).into('bears')
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(error => res.status(500).json(error))
});

server.delete('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  // Using Knex
  db('bears')
    .where({id})
    .del()
    .then( bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

server.put('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  const name = req.body;
  // Using Knex
  db('bears')
    .where({id})
    .update(name)
    .then( bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
