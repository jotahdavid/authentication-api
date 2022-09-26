const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ hello: 'world ' }));

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
