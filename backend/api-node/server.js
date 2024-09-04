const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const favoritesRoutes = require('./routes/favorites');
require('./database/migrations');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', favoritesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
