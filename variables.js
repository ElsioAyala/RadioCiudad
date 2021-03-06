const style = document.documentElement.style;

/*style.setProperty('--background-page', 'url(./img/022.jpg)');*/

function responsiveMedia (mq, img) {
    let breakpoint = window.matchMedia(mq);

    const responsive=(e)=>{
        if(e.matches){
            style.setProperty('--background-page', `url(./img/0${img}escritorio.jpg)`);
        }else{
            style.setProperty('--background-page', `url(./img/0${img}movil.jpg)`);
        }
    }
    /*breakpoint.addListener(responsive);*/
    responsive(breakpoint);

}
function generarAletorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/*responsiveMedia("(min-width: 900px)", generarAletorio(8,8), "02.jpeg");*/

let fecha = new Date();

let hora = fecha.getHours();

if (hora >= 6 && hora <= 18) {
    responsiveMedia("(min-width: 900px)", generarAletorio(5,5));
}else if(hora >= 19 && hora <= 21){
    responsiveMedia("(min-width: 900px)", generarAletorio(8,8));
}else{
    responsiveMedia("(min-width: 900px)", generarAletorio(6,7));
}