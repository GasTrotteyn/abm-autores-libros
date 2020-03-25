const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }));

server.listen(3000, () => {
    console.log('server running');
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

////////////////////          MIDDLEWARES            //////////////////////

function estaAutor(req, res, next) {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        req.autorEncontrado = autor;
        next();
    };
    res.status(404).send(`autor inexistente`);
}

function estaLibro(req, res, next) {
    const libros = req.autorEncontrado.libros;
    let libroRequerido = parseInt(req.params.idLibro);
    const libro = libros.find(obra => obra.id === libroRequerido);
    if (libro) {
        req.libroEncontrado = libro;
        next();
    };
    res.status(404).send(`libro inexistente`);
}

/////////////// GET TODOS LOS AUTORES //////////////

server.get('/autores', (req, res) => {
    res.json(autores);
});

/////POST /autores- Si ya existe un autor con mismo nombre y apellido,devuelve 409  ////
////- De lo contrario agrega el nuevo autor y devuelve 201 con el JSON correspondiente al autor/////

server.post('/autores', (req, res) => {
    const nuevoAutor = req.body;
    let autor = autores.find(element => element.nombre === nuevoAutor.nombre && element.apellido === nuevoAutor.apellido);
    if (autor) {
        res.status(409).send('ese autor ya existe');
    } else {
        autores.push(nuevoAutor);
        res.status(201).json(nuevoAutor);
    };
})

//////// GET /autores/:id- Si el autor no existe devuelve 404  //////
//////// - De lo contrario devuelve 200 con el autor correspondiente  SEGUIR ACA   ///////

server.get('/autores/:id', estaAutor, (req, res) => {
    res.json(req.autorEncontrado);
})

//////////////// DELETE /autores/:id - Si el autor no existe devuelve 404 ////////////////
////////////// - De lo contrario elimina el autor y devuelve 204   ////////////////

server.delete('/autores/:id', estaAutor, (req, res) => {
    let index = autores.indexOf(req.autorEncontrado);
    autores.splice(index, 1);
    res.status(204).send();
});

///////   PUT /autores/:id - Si el autor no existe devuelve 404 ////////////////
///////  - De lo contrario modifica el autor y devuelve 200 con el autor correspondiente /////////////

server.put('/autores/:id', estaAutor, (req, res) => {
    let index = autores.indexOf(req.autorEncontrado);
    autores.splice(index, 1);
    const nuevoBody = req.body;
    autores.push(nuevoBody);
    res.status(200).send(`listo, sacamos a ${req.autorEncontrado.nombre} y pusimos a ${nuevoBody.nombre}`);
}
);

///// GET /autores/:id/libros- Si el autor no existe devuelve 404 //////////////
///// - si el autor no tiene ningún libro devuelve 200 con un array vacío /////////
///// Caso contrario devuelve 200 con la lista de libros del autor   ///////////////////

server.get('/autores/:id/libros', estaAutor, (req, res) => {
    const libros = req.autorEncontrado.libros;
    res.json(libros);
}
);

///// POST /autores/:id/libros - Si el autor no existe devuelve 404 ////////
/////- De lo contrario agrega el libro al autor y devuelve 201 con el libro agregado ///////////////////////////

server.post('/autores/:id/libros', estaAutor, (req, res) => {
    libroInsertado = req.body;
    let libro = req.autorEncontrado.libros.find(element => element.id === libroInsertado.id)
    if (!libro) {
        req.autorEncontrado.libros.push(libroInsertado);
        res.status(201).send(`listo, ${libroInsertado.titulo} se agregó a ${req.autorEncontrado.nombre}`);
    } res.status(409).send('ese libro ya existe');
});

/////  GET /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 //////////////
/////  - si el libro no existe devuelve 404 ////////////////
/////  - Caso contrario devuelve 200 con el libro correspondiente ///////////////

server.get('/autores/:id/libros/:idLibro', estaAutor, estaLibro, (req, res) => {
    res.json(req.libroEncontrado);
});

///// DELETE /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 //////////////
///// - Si el libro no existe devuelve 404 /////////////////
///// - De lo contrario elimina el libro y devuelve 204 ///////////////

server.delete('/autores/:id/libros/:idLibro', estaAutor, estaLibro, (req, res) => {
    index = req.autorEncontrado.libros.indexOf(req.libroEncontrado);
    req.autorEncontrado.libros.splice(index, 1);
    res.status(204).send();
});

///// PUT /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 ///////////////
///// - Si el libro no existe devuelve 404 ///////////
///// - De lo contrario modifica el libro y devuelve 200 con el libro modificado  ///////////////

server.put('/autores/:id/libros/:idLibro', estaAutor, estaLibro, (req, res) => {
    index = req.autorEncontrado.libros.indexOf(req.libroEncontrado);
    req.autorEncontrado.libros.splice(index, 1);
    req.autorEncontrado.libros.push(req.body);
    res.status(200).send(`se ha remplazado ${JSON.stringify(req.libroEncontrado.titulo)} por ${JSON.stringify(req.body.titulo)}`);
});