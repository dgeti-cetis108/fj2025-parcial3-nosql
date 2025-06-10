/* 
 * toma en cuenta que estoy trabajando en un archivo playground
 * de la extensión de MongoDB para Visual Studio Code.
 * 
 * crea 1 documento en una colección de MongoDB "libros"
 * dentro de la base de datos llamada "biblioteca".
 * 
 * Crea un índice único en el campo "id".
 * 
 * el documento debe contener los siguientes campos:
 * id (numerico consecutivo), titulo, edicion, genero_literario,
 * numero_de_paginas, idioma, autores, editorial
 * 
 * toma en cuenta que los campos autores y editorial
 * deben ser referencias a los documentos de las colecciones
 * existentes vinculando los documentos por medio del id
 * este documento debe tener al menos 2 autores y una editorial
 * utiliza lookup para obtener los datos de los autores y la editorial
 */

// Selecciona la base de datos
use('biblioteca');

// Crea un índice único en el campo "id"
db.libros.createIndex({ id: 1 }, { unique: true });

// Inserta un documento en la colección "libros"
db.libros.insertOne({
    id: 1,
    titulo: "Cien Años de Soledad",
    edicion: "Primera",
    genero_literario: "Realismo Mágico",
    numero_de_paginas: 417,
    idioma: "Español",
    autores: [1, 2], // Referencias a los autores
    editorial: 1 // Referencia a la editorial
});

use('biblioteca');
db.libros.find({});

// Realiza un lookup para obtener los datos de los autores y la editorial
use('biblioteca');
db.libros.aggregate([
    {
        $match: { id: 1 }
    },
    {
        $lookup: {
            from: "autores",
            localField: "autores",
            foreignField: "id",
            as: "autores_info"
        }
    },
    {
        $lookup: {
            from: "editoriales",
            localField: "editorial",
            foreignField: "id",
            as: "editorial_info"
        }
    },
    {
        $project: {
            _id: 0,
            id: 1,
            titulo: 1,
            edicion: 1,
            genero_literario: 1,
            numero_de_paginas: 1,
            idioma: 1,
            autores: {
                $map: {
                    input: "$autores_info",
                    as: "autor",
                    in: { $concat: ["$$autor.nombre", " ", "$$autor.apellidos"] }
                }
            },
            editorial: { $arrayElemAt: ["$editorial_info.nombre", 0] }
        }
    }
]).toArray();
