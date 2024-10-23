const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/transactions', require('./routes/transactions'));
app.use('/categories', require('../routes/categories'));

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database sync failed:', err));
