/* crea 5 documentos en una colección de MongoDB "autores"
 * dentro de una base de datos llamada "biblioteca".
 * Crea un índice único en el campo "id" para asegurar unicidad
 * El documento debe contener los siguientes campos:
 * id (numerico consecutivo y único), 
 * nombre, apellidos, nacionalidad
 * toma en cuenta que estoy trabajando en un archivo playground
 * de la extensión de MongoDB para Visual Studio Code, asi que 
 * no utilices connect, si no use('biblioteca')
 */
use('biblioteca');

db.autores.createIndex({ id: 1 }, { unique: true });

db.autores.insertMany([
    { id: 1, nombre: "Gabriel", apellidos: "García Márquez", nacionalidad: "Colombiana" },
    { id: 2, nombre: "Isabel", apellidos: "Allende", nacionalidad: "Chilena" },
    { id: 3, nombre: "Jorge Luis", apellidos: "Borges", nacionalidad: "Argentina" },
    { id: 4, nombre: "Mario", apellidos: "Vargas Llosa", nacionalidad: "Peruana" },
    { id: 5, nombre: "Octavio", apellidos: "Paz", nacionalidad: "Mexicana" }
]);