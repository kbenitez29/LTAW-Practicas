//-- Modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Puerto del servidor
const PUERTO = 9090;

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    //let page = pagina_main;

    //-- Obtiene los distintos campos (recursos)(req.url) de la URL (parse) de la solicitud
    let myURL = url.parse(req.url, true);
    console.log('Recurso solicitado:', myURL.pathname);

    //-- Variable para alamcenar el archivo solicitado
    let file = ''

    //-- Recurso raiz, devuelve el main 
    if (url.pathname == '/') {
        file += 'main.html'
    // Si no es recurso raiz devuelve la ruta que se pida
    } else{
        console.log(url.pathname)
        file += url.pathname
    }

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    // if (url.pathname != '/') {
    //     code = 404;
    //     code_msg = "Not Found";
    //     page = pagina_error;
    // }

  

    //-- Realizar la lectura asíncrona de los ficheros solicitados por cliente
    // la lectura se da en data y si hay error en err
    fs.readFile(file,(err, data) => {
          //-- Generar la respusta en función de las variables
        //-- code, code_msg y page
        res.statusCode = code;
        res.statusMessage = code_msg;
        res.setHeader('Content-Type','text/html');
        res.write(file);
        res.end();

    
    });
});

//-- Arrancar el servidor
server.listen(PUERTO);

console.log("La casa del móvil escuchando en puerto: " + PUERTO);