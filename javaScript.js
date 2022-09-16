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
    /*console.log(allProgramas)*/
    /*programTimeMs(allProgramas)*/
    /*currentProgram()*/
    showP(allProgramas)
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
    let position
    let status
    programs.forEach((program, index) => {
        let inicio = ''
        let fin = ''
        let dia = ''
        if( program.name === 'Espacio Publicitario' || program.name === 'Radio Ciudad')dia = ''
        else if(program.days.length >= 4)dia = 'Lu a Vie'
        else if ( program.days[0] === '5')dia = 'Sáb'
        else if ( program.days[0] === '6')dia = 'Dom'
        
       

        if(Math.sign(program.start.substr(0,1)) === 0)inicio = program.start.substr(1,1)
        else inicio = program.start.substr(0,2)
        if(Math.sign(program.start.substr(3,1)) !== 0) inicio += program.start.substr(2,3)
        

        if(Math.sign(program.ends.substr(0,1)) === 0) fin = program.ends.substr(1,1)
        else fin = program.ends.substr(0,2)
        if(Math.sign(program.ends.substr(3,1)) !== 0) fin += program.ends.substr(2,3)
        

        console.log(inicio)
        if (currentTime() >=  setTimeProgram(program.start) && currentTime() <= setTimeProgram(program.ends)) waiting(program), status = "live", position = index
        const listSlide = document.createElement('li')
        listSlide.setAttribute('class', 'glide__slide')
        console.log(program)

        /**** Inicio Extraer Imagen/es y Nombre/s del locutor/es ****/
        let fullName = "";
        let img = "";
        program.locutor.forEach((locutor) => {
            img += `
            <a href="https://www.facebook.com/${locutor.profileFacebook}" target="_blank" title="Ver perfil de Facebook"> 
            <picture>
            ${locutor.avatar == "autoDj.gif" ? `<img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Avatar ${locutor.avatar}" />` :
            `
                <source type="image/webp" srcset="./img/${locutor.avatar.slice(0, -4)}.webp">
                <source type="image/jpeg" srcset="./img/${locutor.avatar}">
                <img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Foto ${locutor.fullName}"/>
                </picture>
            </a>
            `}`
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
                    <p class="nombre" id="nombre">${program.name}<p>
                    <p class="conductor" id="conductor">${dia === '' ? '' : horario } ${fullName.slice(0, -2)}</p>
                </div>
            </div>      
                  
        `
        if (status === 'live'){
            status = 'continuation'
        }else if (status === 'continuation'){
            status = 'later'
        }
        
        /*else if( status === 'later'){
            status = ''
        }*/
        
        
        listSlide.innerHTML = structure
        fragment.appendChild(listSlide)
        
       
        
    })

    document.querySelector('.cargando').remove()
    glide__slides.appendChild(fragment)
    new Glide('.glide', {
        startAt: position
    }).mount()
    
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


/*const staging = (objProgram, tipo) =>{
    if (tipo === "Publicidad"){
        if (publi == false){
            let element = document.getElementById("containImg")
            containImg.remove()
            info.remove()
            showProgram(objProgram, "programa");
            publi = true;
            chargeProgram = true;
            setTimeout(()=>{
                currentProgram()

            }, (1000))
        
        }else{
            setTimeout(()=>{
                currentProgram()
            }, (60000))
            
        }
        
    }else if(tipo == "offLine"){
        containImg.remove()
        info.remove()
        showProgram(objProgram);
    }else{
        containImg.remove()
        info.remove()
        showProgram(objProgram, "programa")
        chargeProgram = true
        setTimeout(()=>{
            currentProgram()
        }, (objProgram.ends - currentTime()))
    }
}*/


/*const currentProgram = () => {
    for (const i in allProgramas){
        if (currentTime() >= allProgramas[i].start && currentTime() <= allProgramas[i].ends && currentDay(i)){
            publi = false;
            var ok = true;
            staging(allProgramas[i]); 
        }
    }
    if (ok != true){
        let publicidad = {
            name: "Espacio Publicitario",
            locutor: [
                {
                    avatar: "Publi.jpg",
                    profileFacebook: "radiociudad.radiociudad",
                    fullName: "Ya volvemos!!"
                }
            ]
        }
       staging(publicidad, "Publicidad") 
    }
}*/


/*
const showProgram = (program, type) => {
    let fullName = ""
    let containerImg = document.createElement("div")
    containerImg.setAttribute("class", "containImg")
    containerImg.setAttribute("id", "containImg")
    let img = ""
    program.locutor.forEach( locutor => {
        img += `
        <a href="https://www.facebook.com/${locutor.profileFacebook}" target="_blank" title="Ver perfil de Facebook"> 
        <picture>
        ${locutor.avatar == "autoDj.gif" ? `<img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Avatar ${locutor.avatar}" />` :
        `
            <source type="image/webp" srcset="./img/${locutor.avatar.slice(0, -4)}.webp">
            <source type="image/jpeg" srcset="./img/${locutor.avatar}">
            <img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Foto ${locutor.fullName}"/>
            </picture>
        </a>
        `}`
        fullName += locutor.fullName + " & " 
    })
    containerImg.innerHTML = img
    programElement.appendChild(containerImg)
    fullName = fullName.slice(0, -2)
    const info = document.createElement("div")
    info.setAttribute("class", "live-radio__aire--description")
    info.setAttribute("id", "info")
    let infoContent
    if (type === "programa"){ 
        infoContent = `
        <p class="nombre" id="nombre">${program.name}<p>
        <p class="conductor" id="conductor">${fullName}</p>
        `
    }else{ 
    
        infoContent = `
        <div class="marquee">
            <ul class="marquee-content">
                <li class="nombre" id="nombre" style="padding-right:30px;" data-aos="fade-right" data-aos-delay="900">${program.name}<li>
            </ul>
        </div>
        <p class="conductor" id="conductor" data-aos="fade-left" data-aos-delay="900">${fullName}</p>
    `}

    info.innerHTML = infoContent
    programElement.appendChild(info)
    
}*/

/* Pasar de Horas a Milisegundos*/
/*function programTimeMs(allProgramas) {
    allProgramas.map(program => {
        program.start = setTimeProgram(program.start)
        program.ends = setTimeProgram(program.ends)
        return program
    })
}*/

/*const url = "https://tools.zenoradio.com/api/stations/" + "ef7d2011qtzuv" + "/now_playing/?rand=" + Math.random();*/
/*const url = "https://tools.zenoradio.com/api/stations/" + "afnx6011qtzuv" + "/now_playing/?rand=" + Math.random();*/

const loadMedia = async () => {
   console.log("load Media")
    if (chargeProgram === false){
        loadProgram();
        /*live.textContent = "en vivo"
        live.classList.add("animation"); */
    }

  
}

/*const loadAutoDj = (data) => {
    let offLine = {
        name: `${data.artist} - ${data.title}`,
        locutor: [
            {
                avatar: "autoDj.gif",
                profileFacebook: "radiociudad.radiociudad",
                fullName: "Auto DJ"
            }
        ]
    }
    

    let nombre = "sinNombre"
    try {
        nombre = document.getElementById("nombre").innerHTML
    } catch (error) {}

  
    if ( nombre !== `${data.artist} - ${data.title}`) {
        live.textContent = "off line"
        live.classList.remove('animation');


        staging(offLine, "offLine")
        let element = document.getElementById('nombre');
        let elementStyle = window.getComputedStyle(element);
        let elementAncho = elementStyle.getPropertyValue('width'); //ancho del li

        if (Math.round(parseInt(elementAncho)) > 325) {//360
            
            style.setProperty('--marquee-element-width-px', elementAncho);
    
            const marqueeContent = document.querySelector("ul.marquee-content");
            style.setProperty("--marquee-elements", 1);
            let nodo = marqueeContent.children[0].cloneNode(true)
            marqueeContent.appendChild(nodo)
            marqueeContent.children[1].style.display = "none"
        }else{
            element.removeAttribute("data-aos")
            document.getElementById("conductor").removeAttribute("data-aos")
            element.style.width = "100%"
            element.style.padding = "0"
        }
    }
}
*/

setInterval(() => {
    loadMedia();
}, 20000)

window.onload = loadMedia;


/*new Glide('.glide').mount()*/