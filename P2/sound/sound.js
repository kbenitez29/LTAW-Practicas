//-- Funcion a utilizar en archivos .html
function sound() {
    console.log("Ejecutando Javascript...");

    //-- Identificacion de imagenes
    let apple = document.getElementById("apLogo");
    let samsung = document.getElementById("samLogo");
    let huawei = document.getElementById("huLogo");
    let money = document.getElementById("error");
    let ring = document.getElementById("contacto");
    let login = document.getElementById("login");

    //-- Audios a utilizar
    let appleAudio = document.getElementById("apAudio");
    let samsungAudio = document.getElementById("samAudio");
    let huaweiAudio = document.getElementById("huAudio");
    let moneyAudio = document.getElementById("monAudio");
    let ringAudio = document.getElementById("ringAudio");
    let loginAudio = document.getElementById("loginAudio");


    //-- Elementos HTML para mostrar informacion
    const display1 = document.getElementById("display1");

    //-- Caja de busqueda definida en main
    const caja = document.getElementById("busqueda");


    apple.onmouseover = () => {
        appleAudio.play();
    }

    samsung.onmouseover = () => {
        samsungAudio.play();
    }

    huawei.onmouseover = () => {
        huaweiAudio.play();
    }

    money.onmouseover = () => {
        moneyAudio.play();
    }

    ring.onmouseover = () => {
        ringAudio.play();
    }

    login.onmouseover = () => {
        loginAudio.play();
    }
    

    //-- Retrollamda del boton de Ver productos
    caja.oninput = () => {

        //-- Crear objeto para hacer peticiones AJAX
        const m = new XMLHttpRequest();

        //-- Función de callback que se invoca cuando
        //-- hay cambios de estado en la petición
        m.onreadystatechange = () => {

            //-- Petición enviada y recibida. Todo OK!
            if (m.readyState==4) {

                //-- Solo la procesamos si la respuesta es correcta
                if (m.status==200) {

                    //-- La respuesta es un objeto JSON
                    let productos = JSON.parse(m.responseText)

                    console.log(productos);

                    //-- Borrar el resultado anterior
                    display1.innerHTML = "";

                    //--Recorrer los productos del objeto JSON
                    for (let i=0; i < productos.length; i++) {

                        //-- Añadir cada producto al párrafo de visualización
                        display1.innerHTML += productos[i];

                        //-- Separamos los productos por linea'
                        if (i < productos.length-1) {
                        display1.innerHTML += '<br>';
                        }
                    }

                } else {
                    //-- Hay un error en la petición
                    //-- Lo notificamos en la consola y en la propia web
                    console.log("Error en la petición: " + m.status + " " + m.statusText);
                    display1.innerHTML += '<p>ERROR</p>'
                }
            }
        }

        console.log(caja.value.length);

        //-- La peticion se realia solo si hay al menos 3 carácteres
        if (caja.value.length >= 3) {

        //-- Configurar la petición de forma asincrona
        m.open("GET","/productos?param1=" + caja.value, true);

        //-- Enviar la petición!
        m.send();
        
        } else {
            display1.innerHTML="";
        }
    }

}