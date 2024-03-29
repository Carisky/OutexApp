require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.server_port;
const knexConfig = require('./knexfile');
const Knex = require('knex');

const { Model } = require('objection');

const knex = Knex(knexConfig.development);
Model.knex(knex);

const UserController = require('./routes/UserController.js');
const WorkoutController = require('./routes/WorkoutController.js');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/', UserController);
app.use('/', WorkoutController);

app.get('/', (req, res) => {
  res.send('Server UP');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}/`);
});
