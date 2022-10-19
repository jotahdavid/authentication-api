require('dotenv/config');

const express = require('express');
require('express-async-errors');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
