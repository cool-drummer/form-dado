const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.post('/api/data', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al guardar datos');
    } else {
      res.send('Datos guardados correctamente');
    }
  });
});

app.listen(3000, () => console.log('Backend corriendo en el puerto 3000'));
