const style = document.documentElement.style;

/*style.setProperty('--background-page', 'url(./img/022.jpg)');*/

const loadBing = async () => {
    const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=es-ES')
    const data = await response.json()
    console.log("DATA BING:", data)
}


function responsiveMedia (mq, img) {
    let breakpoint = window.matchMedia(mq);

    const responsive=(e)=>{
        if(e.matches){
            style.setProperty('--background-page', `url(./img/0${img}escritorio.jpg)`);
            /*style.setProperty('--background-page', `url(https://www.bing.com/th?id=OHR.PWPeaceDoves_ES-ES8238945414_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp)`);*/

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



let fecha = new Date();

let hora = fecha.getHours();

if (hora >= 6 && hora <= 18) {
    
    responsiveMedia("(min-width: 900px)", generarAletorio(5,5));
    loadBing()
}else if(hora >= 19 && hora <= 21){
    responsiveMedia("(min-width: 900px)", generarAletorio(8,8));
}else{
    responsiveMedia("(min-width: 900px)", generarAletorio(6,7));
}