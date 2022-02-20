//-- Modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Puerto del servidor
const PUERTO = 9090;

//-- Tipos de cuerpo presentes(mime) para indicar en la cabecera
const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'js'   : 'text/javascript',
    'otf'  : 'application/x-font-opentype',
    'jpg'  : 'image/jpeg',
    'png'  : 'image/png',
    'gif'  : 'image/gif',
    'ico'  : 'image/x-icon'
}

//-- Creacion del servidor
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    //let code_msg = "OK";
    //let page = pagina_main;

    //-- Obtiene los distintos campos (recursos)(req.url) de la URL (parse) de la solicitud
    let myUrl = url.parse(req.url, true);
    console.log('Recurso solicitado:', myUrl.pathname);

    //-- Variable para alamcenar el archivo solicitado
    let file = ''

    //-- Recurso raiz, devuelve el main 
    if (myUrl.pathname == '/') {
        file += 'main.html'
    // Si no es recurso raiz devuelve la ruta que se pida
    } else{
        //-- Separa el recurso por / y coge el primer elemento
        file += myUrl.pathname
        console.log('Recurso:',file)
    }

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    // if (url.pathname != '/') {
    //     code = 404;
    //     code_msg = "Not Found";
    //     page = pagina_error;
    // }

    //-- Definimos la seleccion del tipo mime a utilizar en funcion del recurso (archivo) solicitado
    mimeSel = file.split(".")[1]
    mimeType = mime[mimeSel]

    //-- Realizar la lectura asíncrona de los ficheros solicitados por cliente
    // la lectura se da en data y si hay error en err
    fs.readFile(file,(err, data) => {

        //--Si hay error en lectura del archivo o no existe
        // if (err){
        //     data = 'error.html'
        //     code = 404;
        //     res.writeHead(code, {'Content-Type' : mimeType});
            

        //}else{
            //--Si no hay nigun error
            
            //-- Generar la respusta en función de las variables
            //-- code, code_msg y page
            //res.statusCode = code;
            //res.statusMessage = code_msg;
            res.setHeader('Content-Type', mimeType);
           
        //}
        res.write(data);
        res.end();

    });
});

//-- Arrancar el servidor
server.listen(PUERTO);

console.log("La casa del móvil escuchando en puerto: " + PUERTO);