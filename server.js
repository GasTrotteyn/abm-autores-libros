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
        //console.log(autores);
    };
})

//////// GET /autores/:id- Si el autor no existe devuelve 404  //////
//////// - De lo contrario devuelve 200 con el autor correspondiente  SEGUIR ACA   ///////

server.get('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        res.json(autor);
    };
    res.status(404).send(`autor inexistente`);
})

//////////////// DELETE /autores/:id - Si el autor no existe devuelve 404 ////////////////
////////////// - De lo contrario elimina el autor y devuelve 204   ////////////////

server.delete('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        let index = autores.indexOf(autor);
        autores.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`autor inexistente`);
    }
});

///////   PUT /autores/:id - Si el autor no existe devuelve 404 ////////////////
///////  - De lo contrario modifica el autor y devuelve 200 con el autor correspondiente /////////////

server.put('/autores/:id', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        let index = autores.indexOf(autor);
        autores.splice(index, 1);
        const nuevoBody = req.body;
        autores.push(nuevoBody);
        res.status(200).send(`listo, sacamos a ${autor.nombre} y pusimos a ${nuevoBody.nombre}`);
    }
    res.status(404).send();
    //console.log(autores); ////esta va como piña///
});

///// GET /autores/:id/libros- Si el autor no existe devuelve 404 //////////////
///// - si el autor no tiene ningún libro devuelve 200 con un array vacío /////////
///// Caso contrario devuelve 200 con la lista de libros del autor   ///////////////////

server.get('/autores/:id/libros', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        const libros = autor.libros;
        res.json(libros);
    }
    res.status(404).send('autor inexistente');
});

///// POST /autores/:id/libros - Si el autor no existe devuelve 404 ////////
/////- De lo contrario agrega el libro al autor y devuelve 201 con el libro agregado ///////////////////////////

server.post('/autores/:id/libros', (req, res) => {
    const idAutor = parseInt(req.params.id);
    let autor = autores.find(element => element.id === idAutor);
    if (autor) {
        libroInsertado = req.body;
        autor.libros.push(libroInsertado);
        res.status(201).send(`listo, ${libroInsertado.titulo} se agregó a ${autor.nombre}`);
    }
    res.status(404).send('autor inexistente');
});

/////  GET /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 //////////////
/////  - si el libro no existe devuelve 404 ////////////////
/////  - Caso contrario devuelve 200 con el libro correspondiente ///////////////

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
        res.status(404).send(`libro inexistente`);
    };
    res.status(404).send(`autor inexistente`);
});

///// DELETE /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 //////////////
///// - Si el libro no existe devuelve 404 /////////////////
///// - De lo contrario elimina el libro y devuelve 204 ///////////////

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
            res.status(204).send();
        };
        res.status(404).send(`libro inexistente`);
    };
    res.status(404).send(`autor inexistente`);
});

///// PUT /autores/:id/libros/:idLibro - Si el autor no existe devuelve 404 ///////////////
///// - Si el libro no existe devuelve 404 ///////////
///// - De lo contrario modifica el libro y devuelve 200 con el libro modificado  ///////////////

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