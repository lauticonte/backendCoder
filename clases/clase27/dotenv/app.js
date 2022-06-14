const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();
app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});