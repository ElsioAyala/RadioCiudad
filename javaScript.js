let currentTime;
let day;
let allProgramas = [];

const getWordTime = async () => {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires");

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API "wordTimeApi"');
    }
    const timeWord = await response.json();
    let date = new Date(timeWord.datetime);
    currentTime = date;
    day = date.getDay();
    return date;
  } catch (error) {
    console.error("Error al obtener la hora:", error);
    console.log("*** No se pudo obtener la hora desde wordTimeApi. Por lo tanto se usara la hora del sistema. ***");
    let date = new Date();
    currentTime = date;
    day = date.getDay();
    return date;
  }
};

const programElement = document.getElementById("programContainerElement");
let chargeProgram = false;
const live = document.getElementById("live");
const glide__slides = document.querySelector(".glide__slides");

let setTimeProgram = (t) => {
  const time = new Date(currentTime);
  /*console.log("TIME ACTUAL ---> ", time);*/
  time.setHours(t.substr(0, 2));
  time.setMinutes(t.substr(3));
  time.setSeconds(0);
  /*console.log("TIME RESULTANTE ---> ", time);*/
  return time.getTime();
};

const filter = (programs) => {
  allProgramas = programs.filter((program) => program.days.includes(`${day}`));
};

const loadProgram = async () => {
  const response = await fetch("./programas.json");
  const program = await response.json();
  allProgramas = [...program];
  /*console.log("TODOS LOS PROGRAMAS: ", allProgramas);*/
  filter(allProgramas);
  showP(allProgramas);
};

const waiting = (objProgram) => {
  let end = setTimeProgram(objProgram.ends);
  end += 30000;
  /*console.log("Tiempo de espera: ", end - currentTime);*/
  setTimeout(() => {
    let glide = document.querySelectorAll(".glide__slide");
    glide.forEach((ele) => ele.remove());
    getWordTime().then(() => {
      showP(allProgramas);
    });
  }, end - currentTime);
};

const showP = (programs) => {
  /*console.log("show programas del dia: ", programs);*/

  filteredPrograms = programs.filter((program) => currentTime <= setTimeProgram(program.ends));
  /*console.log("show programas del dia Actual y futuros: ", filteredPrograms);*/
  const fragment = document.createDocumentFragment();
  let position = 0;
  let status;
  let i = 0;
  filteredPrograms.forEach((program, index) => {
    let inicio = "";
    let fin = "";
    let dia = "";
    if (program.name === "Espacio Publicitario" || program.name === "Radio Ciudad" || program.name === "Radio Ciudad Music") dia = "";
    else if (program.days.length >= 4) dia = "Lu a Vie";
    else if (program.days[0] === "6") dia = "Sáb";
    else if (program.days[0] === "0") dia = "Dom";

    if (Math.sign(program.start.substr(0, 1)) === 0) inicio = program.start.substr(1, 1);
    else inicio = program.start.substr(0, 2);
    if (Math.sign(program.start.substr(3, 1)) !== 0) inicio += program.start.substr(2, 3);

    if (Math.sign(program.ends.substr(0, 1)) === 0) fin = program.ends.substr(1, 1);
    else fin = program.ends.substr(0, 2);
    if (Math.sign(program.ends.substr(3, 1)) !== 0) fin += program.ends.substr(2, 3);
    if (program.ends === "24:00") fin = "0";

    /*console.log(inicio);
    console.log("buscando el live: ", currentTime >= setTimeProgram(program.start) && currentTime <= setTimeProgram(program.ends));*/
    if (currentTime >= setTimeProgram(program.start) && currentTime <= setTimeProgram(program.ends)) waiting(program), (status = "live"); /*position = index*/
    const listSlide = document.createElement("li");
    listSlide.setAttribute("class", "glide__slide");
    /*console.log(program);*/

    /**** Inicio Extraer Imagen/es y Nombre/s del locutor/es ****/

    let fullName = "";
    let img = "";
    let gif = "";
    let jpg = "";
    program.locutor.forEach((locutor) => {
      gif = `<img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Avatar ${locutor.avatar}" />`;
      jpg = `<source type="image/webp" srcset="./img/${locutor.avatar.slice(0, -4)}.webp">
                    <source type="image/jpeg" srcset="./img/${locutor.avatar}">
                    <img class="live-radio__aire--img" src="./img/${locutor.avatar}" alt="Foto ${locutor.fullName}"/>`;
      img += `
            <a href="https://www.facebook.com/${locutor.profileFacebook}" target="_blank" title="Ver perfil de Facebook"> 
                <picture>
                ${locutor.avatar === "autoDj.gif" ? gif : jpg}
                </picture>
            </a>`;

      fullName += locutor.fullName + " & ";
    });
    /**** Fin Extraer Imagen/es y Nombre/s del locutor/es ****/

    const horario = `${dia} ${inicio}h a ${fin}h -`;

    const player = `
            <video autoplay controls style="height: 40px; width: 100%;">
                <source src="http://stream.zeno.fm/afnx6011qtzuv" type="audio/aac">
            </video>
        `;

    let structure = `
            <h3 class="live-radio__title ${status === "live" ? "animation" : "tag"}" id="live">${status === "live" ? "EN VIVO" : status === "continuation" ? "A Continuación" : status === "later" ? "Luego" : ""}</h3>
            <div class="live-radio__aire" id="programContainerElement">
                <div class="containImg" id="containImg">${img}</div>
                <div class="live-radio__aire--description" id="info">

                <div class="marquee" id="marquee">
                <ul class="marquee-content">

                    <li class="nombre" id="nombre">${program.name}<li>

                </ul>
                </div>

                    <p class="conductor" id="conductor">${dia === "" ? "" : horario} ${fullName.slice(0, -2)}</p>
                </div>
            </div>      
                  
        `;

    if (status === "live") {
      position = i;
      status = "continuation";
    } else if (status === "continuation") {
      status = "later";
    }

    if (program.name !== "Espacio Publicitario" && program.name !== "Radio Ciudad Music" && program.name !== "Radio Ciudad") {
      listSlide.innerHTML = structure;
      fragment.appendChild(listSlide);
      i += 1;
    }

    if ((program.name === "Espacio Publicitario" && status === "continuation") || (program.name === "Radio Ciudad Music" && status === "continuation") || (program.name === "Radio Ciudad" && status === "continuation")) {
      listSlide.innerHTML = structure;
      fragment.appendChild(listSlide);
      i += 1;
    }
  });

  try {
    document.querySelector(".cargando").remove();
  } catch (error) {
    console.error(error);
  }
  glide__slides.appendChild(fragment);
  /*console.log("");*/
  let glideProgram = new Glide(".glide", {
    /*startAt: position,*/
    rewind: false,
  }).mount();
  marquee();
};

const marquee = () => {
  //detectar el ancho del texto
  let element = document.getElementById("nombre");
  let elementStyle = window.getComputedStyle(element);
  let elementAncho = elementStyle.getPropertyValue("width");

  let elements = document.querySelectorAll("#nombre");
  let contents = document.querySelectorAll(".marquee-content");

  /*console.log('ancho del texto', elements);*/

  /**Ancho del contenedor */
  let marqueeElement = document.getElementById("marquee");
  let marqueeElementStyle = window.getComputedStyle(marqueeElement);
  let marqueeElementAncho = marqueeElementStyle.getPropertyValue("width");
  /*console.log("ancho del elemento ", marqueeElementAncho);*/

  /**contenedor main */

  elements.forEach((element, index) => {
    let ancho = window.getComputedStyle(element).getPropertyValue("width");
    /*console.log("ancho del texto", ancho);*/

    if (+ancho.slice(0, -2) > +marqueeElementAncho.slice(0, -2)) {
      let diferencia = `${marqueeElementAncho.slice(0, -2) - elementAncho.slice(0, -2)}px`;
      contents[index].animate([{ transform: "translateX(0)" }, { transform: `translateX(${marqueeElementAncho.slice(0, -2) - ancho.slice(0, -2)}px)` }, { transform: "translateX(0)" }], {
        // opciones de sincronización
        duration: 15000,
        iterations: Infinity,
      });

      /*contents[index].firstElementChild.style.paddingRight = '10px'
            contents[index].firstElementChild.style.paddingLeft = '10px'*/
    } else {
      contents[index].lastElementChild.style.paddingRight = "0px";
      contents[index].lastElementChild.style.paddingLeft = "0px";
    }

    if (element.firstChild.data === "Radio Ciudad Music") {
      /* console.log("Elements Encontado", (element.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.style.border = "none"));*/
    }
  });
};

let publi = false;

/*const loadMedia = () => {
  if (chargeProgram === false) {
    getWordTime().then(() => {
      console.log(currentTime, day);
      loadProgram();
    });
  }
};*/

const loadMedia = () => {
  if (chargeProgram === false) {
    getWordTime().then(loadProgram);
  }
};

window.onload = loadMedia;
