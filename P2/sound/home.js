//-- Funcion a utilizar en archivos .html
function home() {
    //-- Identificacion de imagenes
    let home = document.getElementById("inicio");
    let money = document.getElementById("error");

    //-- Audios a utilizar
    let homeAudio = document.getElementById("inAudio");
    let moneyAudio = document.getElementById("monAudio");

    home.onmouseover = () => {
        homeAudio.play();
    }

    
    money.onmouseover = () => {
        moneyAudio.play();
    }

}