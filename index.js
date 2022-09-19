//console.log("Hola mundo");
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Bienvenido <br> Hello World! ');
});

app.listen(3000, () => {
    console.log('Server is running');
});