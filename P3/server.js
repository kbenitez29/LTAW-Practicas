//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const fs = require('fs');

const PUERTO = 9090;

//-- Numero de usuarios conectados
let nUser = 0;

//-- Fecha y hora actual
function now(){
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();
  var h = hoy.getHours();
  var m = hoy.getMinutes();
  var s = hoy.getSeconds();
  return  h+':'+m+':'+s +  ' --> '+ dd+'/'+mm+'/'+yyyy;
}

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  let entry = fs.readFileSync('public/main.html', 'utf-8');
  res.send(entry);
  console.log("Punto de entrada 'main.html'");
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  //-- Nuevo usuario conectado
  nUser += 1; 

  //-- Mensaje de bienvenida usuario personalizada
  socket.send("Bienvenido a la sala de chat!");

   //-- Mensaje de bienvenida usuario general
   io.send(">> Nuevo usuario conectado");


  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA USER -->'.yellow, socket.id );

    //-- Desconexion de usuario
    nUser -= 1;

     //-- Mensaje de desconexión
    io.send(">> Usuario desconectado");
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {

    //-- Se recibe peticion de comando
    if (msg.startsWith('/')){
      console.log("Comando Recibido!".green);
      if (msg == '/help'){
        socket.send("Comandos disponibles<br>" +
                ">> <b>'/help'</b>: Mostrar los comandos soportados<br>" +
                ">> <b>'/list'</b>: Mostrar el numero de usuarios conectados<br>" +
                ">> <b>'/hello'</b>: El servidor devuelve un saludo<br>" +
                ">> <b>'/date'</b>: Mostrar la fecha actual<br>");
        console.log('/help');

      } else if (msg == '/list'){
          socket.send(">> Numero de usuarios conectados: " + nUser);
          console.log('/list');

      } else if (msg == '/hello'){
          socket.send(">> Hola amigo, espero que tengas un bonito día :)");
          console.log('/hello');

      } else if (msg == "/date"){
          socket.send('>> Hoy es: '+ now());
          console.log('/date');

      } else{
        console.log("Comando no reconocido!".red)
      }

    } else {

      console.log("Mensaje Recibido! --> " + msg.blue);

      //-- Mensaje normal, se reenvia a todos los clientes conectados
      io.send(msg);
    }
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
