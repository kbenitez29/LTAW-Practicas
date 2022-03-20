//-- Funcion a utilizar en archivos .html
function sound() {
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


}