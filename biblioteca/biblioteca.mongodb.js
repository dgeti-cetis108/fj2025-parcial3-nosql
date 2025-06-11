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

// Crea una consulta para obtener todos los libros de una editorial en particular utilizando el nombre de la editorial

// Crea una consulta para obtener todos los libros que no esten editados en español