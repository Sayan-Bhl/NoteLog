const connectToMongo = require('./db');
var bodyParser = require('body-parser');
const express = require('express');
const { path } = require('express/lib/application');
cors = require('cors');
require('dotenv/config');

connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`NoteLog-backend listening on port ${port}`);
})

