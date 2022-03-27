//-- Modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Puerto del servidor
const PUERTO = 9090;

// Leemos los ficheros de forma sincrona

// Página principal
const main = fs.readFileSync('main.html','utf-8');

// Página error
const error = fs.readFileSync('error.html','utf-8');

// Páginas de productos
const apple = fs.readFileSync('apple.html','utf-8');
const samsung = fs.readFileSync('samsung.html','utf-8');
const huawei = fs.readFileSync('huawei.html','utf-8');

// Páginas de login
const login = fs.readFileSync('login.html','utf-8');
const login_resp = fs.readFileSync('login-resp.html','utf-8');
const login_error = fs.readFileSync('login-error.html','utf-8');
const unlogged = fs.readFileSync('unloged.html','utf-8');

// Páginas de procesamiento del pedido
const order = fs.readFileSync('order.html','utf-8');
const order_resp = fs.readFileSync('order-resp.html','utf-8');

// Ficheros JSON y lectura
const FICHERO_JSON = "tienda.json";

//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "tienda-modificacion.json"

//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

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
    'ico'  : 'image/x-icon',
    'MP3'  : 'audio/mpeg3',
    'mp3'  : 'audio/mpeg3',
}


//-- Crear la cookie del producto 
//-- si se añade al carrito
function make_cookie_cart(req, res, product) {

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Establece cookie si el nombre es "cart"
        if (nombre.trim() === 'cart') {
            res.setHeader('Set-Cookie', element + ':' + product);
        }
      });
  
    }
}

//-- Analizar la cookie y devolver productos del 
//-- carrito si existe, o null en caso contrario
function get_cart(req){

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
    
    //-- Hay cookie
    if (cookie){
        
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
  
      //-- Definir las variables relacionadas a los productos y carrito
      let cart;
      let apple = '';
      let samsung = '';
      let huawei = '';

      let nApple = 0;
      let nSamsung = 0;
      let nHuawei = 0;
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {

        //-- Obtener los nombre y los valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Si el nombre es cart
        if (nombre.trim() === 'cart') {

          products = valor.split(',');

          products.forEach((product) => {

            //-- Definimos los productos de cada marca y su cantidad en el carrito
            if (product == 'apple'){

              if (nApple == 0) {
                apple = 'Iphone 13 Pro';
              }

              nApple += 1;
            } else if (product == 'samsung'){

              if (nSamsung == 0){

                samsung = 'Samsung Galaxy S22';
              }

              nSamsung += 1;
            } else if (product == 'huawei'){

              if (nHuawei == 0){

                huawei = 'Huawei Mate 40 Pro';
              }

                nHuawei += 1;
            }
          });
  
          //-- Informacion a mostrar en el carrito
          if (nApple != 0) {

            apple += ': ' + nApple;
          }
          if (nSamsung != 0) {

            samsung += ': ' + nSamsung;
          }
          if (nHuawei != 0) {

            huawei += ': ' + nHuawei;
          }

          cart = apple + '<br>' + samsung + '<br>' + huawei;
        }
      });
  
      //Si esta vacío se devuelve null
      return cart || null;
    }
  }

//-- Analizar la cookie y devolver el nombre del
//-- usuario si existe, o null en caso contrario
function get_user(req) {

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      //-- Variable para guardar el usuario
      let user;
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'user') {
          user = valor;
        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return user || null;
    }
}



//-- Creacion del servidor
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valor de la respuesta por defecto
    let code = 200;

    //-- Obtiene los distintos campos (recursos)(req.url) de la URL (parse) de la solicitud
    let myUrl = url.parse(req.url, true);
    console.log('Ruta: ', myUrl.pathname);
    console.log("Método: " + req.method);
    console.log("Parametros: " + myUrl.searchParams);

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

        //-- El recurso solicitado se encuentra en la carpeta sound
        }else if(resSplit[1] == 'sound'){
            
            //-- Se recompone la ruta del archivo para la lectura asincrona
            file += 'sound/' + resSplit[2];
            console.log('Recurso solicitado:', resSplit[2]);

        //-- El recurso no se encuentra dentro de ninguna carpeta
        } else{
            file += resSplit[1];
            console.log('Recurso solicitado:', file);
        }
        
    }

    //-- Separa la extension del recurso solicitado
    let mimeSel = file.split(".")[1]

    //-- Definimos la seleccion del tipo mime a utilizar en funcion de la extension del recurso (archivo) solicitado
    let mimeType = mime[mimeSel]
    

    //-- Realizar la lectura asíncrona de los ficheros solicitados por el cliente
    //-- la lectura se da en 'data' y si hay error en 'err'
    fs.readFile(file,(err, data) => {

        //-- Hay error en lectura del archivo, no existe o el archivo a acceder es 'error.html'
        if ((err) || (file == 'error.html')){

            //-- Leemos y cargamos el archivo 'error.html' como respuesta de forma sincrona
            data = fs.readFileSync("error.html");
            
            //-- Cabeceras de error, pagina desconocida
            res.writeHead(404, {'Content-Type': 'text/html'});
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