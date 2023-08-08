const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = requre ('body-parser');
const cors = require ('cors');
const dotenv = require ('dotenv');
const App = express();

const PORT = process.env.PORT || 8070;

App.use(cors());
App.use(bodyParser.json());