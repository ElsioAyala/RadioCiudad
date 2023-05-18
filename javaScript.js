let allProgramas = [];
let currentTime = () => new Date;
const programElement = document.getElementById('programContainerElement');
let chargeProgram = false;
const live = document.getElementById('live')
const glide__slides = document.querySelector('.glide__slides')

let setTimeProgram = t => {
    const time = new Date();
    time.setHours(t.substr(0,2));
    time.setMinutes(t.substr(3));
    time.setSeconds(00);
    return time.getTime();
}


const filter = (programs) => {
    let day = currentTime().getDay()
    allProgramas = programs.filter(program => program.days.includes(`${day}`))
}

const loadProgram = async () => {
    const response = await fetch("./programas.json");
    const program = await response.json();
    allProgramas = [...program];
    filter(allProgramas)
    showP(allProgramas)
    /*lista = document.querySelectorAll(".marquee-content")
    lista.forEach(li =>{
        console.log(li.lastElementChild)
    })
    console.log("ULTIMO", lista)*/
}


const waiting = (objProgram) =>{
    let end = setTimeProgram(objProgram.ends)
    end += 30000
    setTimeout(()=>{
        let glide = document.querySelectorAll('.glide__slide')
        glide.forEach( ele => ele.remove())
        showP(allProgramas)
    }, (end  - currentTime()))

}

const showP = (programs) => {
    
    const fragment = document.createDocumentFragment();
    let position = 0
    let status
    let i = 0
    programs.forEach((program, index) => {
        let inicio = ''
        let fin = ''
        let dia = ''
        if( program.name === 'Espacio Publicitario' || program.name === 'Radio Ciudad' || program.name === 'Radio Ciudad Music')dia = ''
        else if(program.days.length >= 4)dia = 'Lu a Vie'
        else if ( program.days[0] === '5')dia = 'Sáb'
        else if ( program.days[0] === '6')dia = 'Dom'
        
       

        if(Math.sign(program.start.substr(0,1)) === 0)inicio = program.start.substr(1,1)
        else inicio = program.start.substr(0,2)
        if(Math.sign(program.start.substr(3,1)) !== 0) inicio += program.start.substr(2,3)
        

        
        if(Math.sign(program.ends.substr(0,1)) === 0) fin = program.ends.substr(1,1)
        else fin = program.ends.substr(0,2)
        if(Math.sign(program.ends.substr(3,1)) !== 0) fin += program.ends.substr(2,3)
        if (program.ends === "24:00") fin = "0"
        

        console.log(inicio)
        if (currentTime() >=  setTimeProgram(program.start) && currentTime() <= setTimeProgram(program.ends)) waiting(program), status = "live" /*position = index*/
        const listSlide = document.createElement('li')
        listSlide.setAttribute('class', 'glide__slide')
        console.log(program)

      

        /**** Inicio Extraer Imagen/es y Nombre/s del locutor/es ****/
      

        let fullName = "";
        let img = "";
        let gif = "";
        let jpg = "";
        program.locutor.forEach((locutor) => {
            gif = `<img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Avatar ${locutor.avatar}" />`
            jpg = `<source type="image/webp" srcset="./img/${locutor.avatar.slice(0, -4)}.webp">
                    <source type="image/jpeg" srcset="./img/${locutor.avatar}">
                    <img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Foto ${locutor.fullName}"/>`
            img += `
            <a href="https://www.facebook.com/${locutor.profileFacebook}" target="_blank" title="Ver perfil de Facebook"> 
                <picture>
                ${locutor.avatar === "autoDj.gif" ? gif : jpg}
                </picture>
            </a>`
            
            fullName += locutor.fullName + " & " 
        })
        /**** Fin Extraer Imagen/es y Nombre/s del locutor/es ****/

        const horario = `${dia} ${inicio}h a ${fin}h -`

        const player = `
            <video autoplay controls style="height: 40px; width: 100%;">
                <source src="http://stream.zeno.fm/afnx6011qtzuv" type="audio/aac">
            </video>
        `


        let structure = `
            <h3 class="live-radio__title ${status === 'live' ? 'animation' : 'tag'}" id="live">${status === 'live' ? 'EN VIVO': status === 'continuation'? 'A Continuación': status === 'later' ? 'Luego' : ''}</h3>
            <div class="live-radio__aire" id="programContainerElement">
                <div class="containImg" id="containImg">${img}</div>
                <div class="live-radio__aire--description" id="info">

                <div class="marquee" id="marquee">
                <ul class="marquee-content">

                    <li class="nombre" id="nombre">${program.name}<li>

                </ul>
                </div>

                    <p class="conductor" id="conductor">${dia === '' ? '' : horario } ${fullName.slice(0, -2)}</p>
                </div>
            </div>      
                  
        `
        
        if (status === 'live'){
            position = i
            status = 'continuation'
        }else if (status === 'continuation'){
            status = 'later'
        }
        
        
       
       
        if(program.name !== 'Espacio Publicitario' && program.name !== 'Radio Ciudad Music'){
            listSlide.innerHTML = structure
            fragment.appendChild(listSlide)
            i += 1
        }
        
        if((program.name === 'Espacio Publicitario' && status === 'continuation') || (program.name === 'Radio Ciudad Music' && status === 'continuation') ){
            listSlide.innerHTML = structure
            fragment.appendChild(listSlide)
            i += 1
        }

        
       
        
       
        
    })


    
    try {
        document.querySelector('.cargando').remove()
      } catch (error) {
        console.error(error);
      }
    glide__slides.appendChild(fragment)
    console.log("")
    let glideProgram = new Glide('.glide', {
        startAt: position 
    }).mount()
        marquee();

    
}

const marquee = () => {

    

    //detectar el ancho del texto
    let element = document.getElementById('nombre');
    let elementStyle = window.getComputedStyle(element);
    let elementAncho = elementStyle.getPropertyValue('width');

    let elements = document.querySelectorAll("#nombre")
    let contents = document.querySelectorAll(".marquee-content")
  
    /*console.log('ancho del texto', elements);*/

    /**Ancho del contenedor */
    let marqueeElement = document.getElementById('marquee');
    let marqueeElementStyle = window.getComputedStyle(marqueeElement);
    let marqueeElementAncho = marqueeElementStyle.getPropertyValue('width');
    console.log("ancho del elemento ", marqueeElementAncho )

    /**contenedor main */

    elements.forEach((element, index) => {
        let ancho = window.getComputedStyle(element).getPropertyValue('width');
        console.log("ancho del texto", ancho)

        if (+ancho.slice(0, -2) > +marqueeElementAncho.slice(0, -2)){
            let diferencia = `${marqueeElementAncho.slice(0, -2) - elementAncho.slice(0, -2)}px`
            contents[index].animate([
                { transform: 'translateX(0)'},
                { transform: `translateX(${marqueeElementAncho.slice(0, -2) - ancho.slice(0, -2) }px)`},
                { transform: 'translateX(0)'}
              ],{
                // opciones de sincronización
                duration: 15000,
                iterations: Infinity,
              })

            contents[index].firstElementChild.style.paddingRight = '10px'
            contents[index].firstElementChild.style.paddingLeft = '10px'
              
          }else{
        
          }

          
        if(element.firstChild.data === "Radio Ciudad Music"){
            console.log("Elements Encontado", element.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.style.border = "none")
        }
    })

    

}


const currentDay = i => {
    for (const key in allProgramas[i].days) {
        if (allProgramas[i].days[key] == currentTime().getDay()) {
            return true
        }
    }
    return false
}

let publi = false;


const loadMedia = () => {
   console.log("load Media")
    if (chargeProgram === false){
        loadProgram();
    }
  
}

window.onload = loadMedia;
