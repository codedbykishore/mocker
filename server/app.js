const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use('/api/', limiter);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Software Mocker API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tests', require('./routes/test.routes'));
app.use('/api/sessions', require('./routes/session.routes'));
app.use('/api/results', require('./routes/result.routes'));

module.exports = app;
