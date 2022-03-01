//-- Funcion a utilizar en archivos .html
function home() {
    //-- Identificacion de imagenes
    let home = document.getElementById("inicio");

    //-- Audios a utilizar
    let homeAudio = document.getElementById("inAudio");

    home.onmouseover = () => {
        homeAudio.play();
    }

}