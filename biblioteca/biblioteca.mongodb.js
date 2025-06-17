// un estudiante llega a la biblioteca y quiere buscar
// un libro pero solo conoce el nombre del autor.
// realiza una consulta para encontrar todos los libros
// que coincidan con el nombre del autor buscado

// lookup, unwind y match
const autor_buscado = "allende";

use('biblioteca');
db.libros.aggregate([
    {
        $lookup: {
            from: "autores",
            localField: "autores",
            foreignField: "id",
            as: "autores_info"
        }
    },
    {
        $unwind: "$autores_info"
    },
    {
        $match: {
            $or: [
                { "autores_info.nombre": { $regex: autor_buscado, $options: "i" } },
                { "autores_info.apellidos": { $regex: autor_buscado, $options: "i" } }
            ]
        }
    }
    // TODO: agregar $project para mostrar solamente el id, titulo y nombre completo de autor
]);

// Crea una consulta para obtener todos los libros de un genero literario específico
use('biblioteca');
const genero = "Realismo Mágico";
db.libros.find({genero_literario: genero});

// Crea una consulta para obtener todos los libros de una editorial en particular utilizando el nombre de la editorial
use('biblioteca');
const editorial = "Editorial Alfa";
const editorial_id = db.editoriales.findOne(
    { nombre: editorial },
    { _id: 0, id: 1 }
)?.id;
db.libros.find({editorial: editorial_id});

// modo mongodb con aggregation
use('biblioteca');
const editorial_buscada = "Editorial Alfa";
db.libros.aggregate([
    {
        $lookup: {
            from: "editoriales",
            localField: "editorial",
            foreignField: "id",
            as: "editorial_info"
        }
    },
    {
        $match: {
            "editorial_info.nombre": editorial_buscada
        }
    }
]);



// Crea una consulta para obtener todos los libros que no esten editados en español
use('biblioteca');
db.libros.find({ idioma: { $ne: "Español" } });
