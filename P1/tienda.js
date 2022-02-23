// FALLA EL CSS EN OTROS NAVEGADORES QUE NO SEAN FIREFOX NOSE XQ


//-- Modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Puerto del servidor
const PUERTO = 9090;

//-- Tipos de cuerpo presentes (mime) para indicar en la cabecera
const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'js'   : 'text/javascript',
    'otf'  : 'application/x-font-opentype',
    'jpg'  : 'image/jpeg',
    'JPG'  : 'image/jpeg',
    'PNG'  : 'image/png',
    'png'  : 'image/png',
    'gif'  : 'image/gif',
    'ico'  : 'image/x-icon'
}

//-- Creacion del servidor
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valor de la respuesta por defecto
    let code = 200;

    //-- Obtiene los distintos campos (recursos)(req.url) de la URL (parse) de la solicitud
    let myUrl = url.parse(req.url, true);
    console.log('Ruta: ', myUrl.pathname);

    //-- Variable para alamcenar el archivo solicitado
    let file = '';

    //-- Solicita el recurso raiz, devuelve el main 
    if (myUrl.pathname == '/') {
        file += 'main.html';

    //-- No es recurso raiz, devuelve la ruta solicitada
    }else{

        //-- Separa el recurso por '/' 
        let resSplit = myUrl.pathname.split("/");

        //-- El recurso solicitado se encuentra en la carpeta image
        if (resSplit[1] == 'image'){

            //-- Se recompone la ruta del archivo para la lectura asincrona
            file += 'image/' + resSplit[2];
            console.log('Recurso solicitado:', resSplit[2]);

        //-- El recurso no se encuentra dentro de ninguna carpeta
        } else{
            file += resSplit[1];
            console.log('Recurso solicitado:', file);
        }
        
    }

    //-- Definimos la seleccion del tipo mime a utilizar en funcion del recurso (archivo) solicitado
    mimeSel = file.split(".")[1]
    mimeType = mime[mimeSel]
    

    //-- Realizar la lectura asíncrona de los ficheros solicitados por el cliente
    //-- la lectura se da en 'data' y si hay error en 'err'
    fs.readFile(file,(err, data) => {

        //-- Hay error en lectura del archivo, no existe o el archivo a acceder es 'error.html'
        if ((err) || (file == 'error.html')){

            //-- Leemos y cargamos el archivo 'error.html' como respuesta de forma sincrona
            data = fs.readFileSync("error.html");
         
            res.writeHead(404, {'Content-Type' : mimeType});
            console.log('Tipo mime:' , mimeType)
            console.log("Respuesta: 404 Not found\n");
            
        }else{
            //-- No hay ningun error
            res.writeHead(code,{'Content-Type' : mimeType});
            console.log('Tipo mime:' , mimeType)
            console.log("Respuesta: 200 OK\n");
        }

        //-- Devuelve al cliente los recursos solcitados
        res.write(data);
        res.end();
    });
});

//-- Arrancar el servidor
server.listen(PUERTO);

console.log("La casa del móvil escuchando en puerto: " + PUERTO);