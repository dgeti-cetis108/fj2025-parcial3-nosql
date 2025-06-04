/* crea 3 documentos en una colección de MongoDB "editoriales"
 * dentro de una base de datos llamada "biblioteca".
 * Crea un índice único en el campo "id" para asegurar unicidad
 * cada documento debe contener los siguientes campos:
 * id (numerico consecutivo), nombre, domicilio, email, sitio_web
 * toma en cuenta que estoy trabajando en un archivo playground
 * de la extensión de MongoDB para Visual Studio Code, asi que 
 * no utilices connect, si no use('biblioteca')
 */
use('biblioteca');

db.editoriales.createIndex({ id: 1 }, { unique: true });

db.editoriales.insertMany([
    {
        id: 1,
        nombre: "Editorial Alfa",
        domicilio: "Calle 123, Ciudad A",
        email: "contacto@alfa.com",
        sitio_web: "https://www.alfa.com"
    },
    {
        id: 2,
        nombre: "Editorial Beta",
        domicilio: "Avenida 456, Ciudad B",
        email: "info@beta.com",
        sitio_web: "https://www.beta.com"
    },
    {
        id: 3,
        nombre: "Editorial Gamma",
        domicilio: "Boulevard 789, Ciudad C",
        email: "editorial@gamma.com",
        sitio_web: "https://www.gamma.com"
    }
]);