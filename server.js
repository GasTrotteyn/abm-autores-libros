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
        nombre: "Ursula",
        apellido: "Lopez",
        libros: [
            { id: 1, titulo: "La mano izquierda de la oscuridad" },
            { id: 2, titulo: "La rueda celeste" }
        ]
    },
    {
        id: 2,
        nombre: "Tolkien",
        apellido: "Perez",
        libros: [
            { id: 1, titulo: "El señor de los anillos: La comunidad" },
            { id: 2, titulo: "El señor: Las dos torres" },
            { id: 3, titulo: "El señor: El retorno del rey" }
        ]
    }
];

server.get('/autores', (req, res) => {
    res.json(autores);
});


/////POST /autores- Si ya existe un autor con mismo nombre y apellido,devuelve 409  ////
////- De lo contrario agrega el nuevo autor y devuelve 201 con el JSON correspondiente al autor/////

server.post('/autores', (req, res) => {
    const nuevoAutor = req.body;
    let autor = autores.find(element => element.nombre === nuevoAutor.nombre); //&& element.apellido === nuevoAutor.apellido);
    if (autor) {
        res.status(409).send('ese autor ya existe');
    } else {
        autores.push(nuevoAutor);
        res.status(201).json(nuevoAutor);
        console.log(autores);
    };
})

//////// GET /autores/:id- Si el autor no existe devuelve 404  //////
//////// - De lo contrario devuelve 200 con el autor correspondiente  ///////


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


//////////// /autores/:id/libros/:idLibro- DELETE: eliminar el libro con el id indicado del autor  ///////////////

server.delete('/autores/:id/libros/:idLibro', (req, res) => {
    const idAutorRequerido = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutorRequerido);
    if (autor) {
        const libros = autor.libros;
        let libroRequerido = parseInt(req.params.idLibro);
        const libro = libros.find(obra => obra.id === libroRequerido);
        if (libro) {
            index = libros.indexOf(libro);
            libros.splice(index, 1);
            res.status(200).send(`se ha eliminado ${JSON.stringify(libro.titulo)} del autor ${JSON.stringify(autor.nombre)}`);
        };
        res.status(404).send(`libro inexistente`);
    };
    res.status(404).send(`autor inexistente`);
});

//////////// /autores/:id/libros/:idLibro- PUT: modifica el libro con el id indicado del autor  ///////////////

server.put('/autores/:id/libros/:idLibro', (req, res) => {
    const idAutorRequerido = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutorRequerido);
    if (autor) {
        const libros = autor.libros;
        let libroRequerido = parseInt(req.params.idLibro);
        const libro = libros.find(obra => obra.id === libroRequerido);
        if (libro) {
            index = libros.indexOf(libro);
            libros.splice(index, 1);
            libros.push(req.body);
            res.status(200).send(`se ha remplazado ${JSON.stringify(libro.titulo)} por ${JSON.stringify(req.body.titulo)}`);
        };
        res.status(404).send(`libro inexistente`);
    };
    res.status(404).send(`autor inexistente`);
});

