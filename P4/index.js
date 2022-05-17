const electron = require('electron');
const QRCode = require('qrcode');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const nUsu = document.getElementById("nUsu");

const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");

//-- Direccion Ip
const info4 = document.getElementById("info4");

const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const info7 = document.getElementById("info7");

//-- Mostrar codigo QR
const qr = document.getElementById("qr");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;

info5.textContent = process.arch;
info6.textContent = process.platform;
info7.textContent = process.cwd();


btn_test.onclick = () => {
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Que tengas un bonito día :D");
}

//-- Mensaje recibido del proceso MAIN, numero de usuarios
electron.ipcRenderer.on('sendUsers', (event, message) => {
    console.log("Recibido: " + message);
    nUsu.textContent = message;
  });


//-- Mensaje recibido del proceso MAIN, direccion ip NO LA MUESTRA NO SE PORQUE ERRORR!!!!!
electron.ipcRenderer.on('sendIp', (event, message) => {
    console.log("Recibida IP: " + message);
    info4.textContent = message;
    
    //-- Generación del código QR en funcion de la URL

    url = message + "/index.html"
    QRCode.toDataURL(url, function (err, url) {
        qr.src = url;
        console.log("IP QR: " + url);
    });

  });

//-- Mensaje recibido del proceso MAIN, recepcion de mensajes
electron.ipcRenderer.on('sendMssg', (event, message) => {
    console.log("Recibido: " + message);
    display.innerHTML += message + '<br>';
    //display.scrollTop = mensaje.scrollHeight;
  });