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
    let page = pagina_main;

    //-- Obtiene los distintos campos de url
    let myURL = url.parse(req.url, true);
    console.log('Recurso:', myURL.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

//-- Arrancar el servidor
server.listen(PUERTO);

console.log("La casa del móvil escuchando en puerto: " + PUERTO);