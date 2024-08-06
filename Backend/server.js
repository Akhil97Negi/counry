const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/router/authRoute');
const countryRoutes = require('./src/router/countryRoute');
const favoriteRoutes = require('./src/router/favroiteRoute');
const historyRoutes = require('./src/router/historyRoute');
const authenticate = require('./src/middleware/authenticate');
const connectToDB = require('./src/config/db'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/favorites', authenticate, favoriteRoutes);
app.use('/api/history', authenticate, historyRoutes);

const url = process.env.DB_URL;

app.listen(process.env.PORT, async () => {
  await connectToDB(url); // Use the environment variable for the DB URL
  console.log(`Server running on port ${process.env.PORT}`);
});
