const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }));

server.listen(3000, () => {
    console.log('servidor andando');
});
let autores = [
    {
        id: 1,
        nombre: "Ursula K. Le Guin",
        libros: [
            { id: 1, titulo: "La mano izquierda de la oscuridad" },
            { id: 2, titulo: "La rueda celeste" }
        ]
    },
    {
        id: 2,
        nombre: "J.R.R. Tolkien",
        libros: [
            { id: 1, nombre: "El señor de los anillos: La comunidad" },
            { id: 2, nombre: "El señor: Las dos torres" },
            { id: 3, nombre: "El señor: El retorno del rey" }
        ]
    }
];

server.get('/autores', (req, res) => {
    res.json(autores);
});

server.post('/autores', (req, res) => {
    const nuevoAutor = req.body;
    autores.push(nuevoAutor);
    res.json('Autor agregado');
    console.log(autores);
})

server.get('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    //autor = autores[idAutor-1];/// así sería si el id estuviese ordenado y completo, pero si te borran un item, te cambia todo el orden 
    let autor = autores.find(element => element.id === idAutor);
    res.json(autor);
})

server.delete('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    let index = autores.indexOf(autor);
    autores.splice(index, 1);
    ///res.status(200).send(`Listo, al tal ${autor.nombre} ya lo borramos`);
    res.status(204).send(`Listo, al tal ${autor.nombre} ya lo borramos`);
});

server.put('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    let index = autores.indexOf(autor);
    autores.splice(index, 1);
    const nuevoBody = req.body;
    autores.push(nuevoBody);
    res.status(200).send(`listo, sacamos a ${autor.nombre} y pusimos a ${nuevoBody.nombre}`);
    //console.log(autores); ////esta va como piña///
});

///////////// autores/:id/libros- GET: devuelve todos los libros de un autor ///////////////////

server.get('/autores/:id/libros', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    const libros = autor.libros;
    res.json(libros);
});

///////////// autores/:id/libros- POST: agrega un nuevo libro al autor ///////////////////////////

server.post('/autores/:id/libros', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    libroInsertado = req.body;
    autor.libros.push(libroInsertado);
    res.status(201).send(`listo, ${libroInsertado.titulo} se agregó a ${autor.nombre}`);
});

///////////// /autores/:id/libros/:idLibro- GET: devuelve el libro con el id indicado del autor ///////////////

server.get('/autores/:id/libros/:idLibro', (req, res) => {
    const idAutorRequerido = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutorRequerido);
    if (autor) {
        const libros = autor.libros;
        let libroRequerido = parseInt(req.params.idLibro);
        const libro = libros.find(obra => obra.id === libroRequerido);
        if (libro) {
            res.json(libro);
        };
        res.status(400).send(`libro inexistente`);
    };
    res.status(400).send(`autor inexistente`);
});



