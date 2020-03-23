const express = require('express');
const server = express();
const bodyParser = require ('body-parser');
server.use(bodyParser.json());
const arrayToDo = [
    {
        "id": 1,
        "title": "Hacer Actividad API REST",
        "completed": false
    }
];

server.get('/items', (req, res) => {
    res.json(`eso que pediste es ${JSON.stringify(arrayToDo)}`);

})

server.post('/items', (req, res) => {
    const newitem = req.body;
    arrayToDo.push(newitem);
    res.json(`ya guardamos el coso nuevo ${JSON.stringify(newitem)}`);
    console.log (arrayToDo);
})



server.listen(3000, () => {
    console.log('servidor en marcha');
});
