class Person {
    constructor(photo,firsName,lastName,profileFacebook){
        this.avatar = photo;
        this.firsName = firsName;
        this.lastName = lastName;
        this.profileFacebook = profileFacebook;
        this.fullName = `${firsName} ${lastName}`;
    }
}

class Program extends Person {
    constructor(photo,firsName,lastName,profileFacebook,programName,days,startTime,endTime){
        super(photo,firsName,lastName,profileFacebook);
        this.programName = programName;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hour = startTime.substr(0,2);
        this.minutes = startTime.substr(3);
    }
    transformDays(array){
        let newArray = array.map((a) =>{
            switch (a) {
                case 'l':
                    return 1; 
                    break;
                case 'ma':
                    return 2;
                    break;
                case 'mi':
                    return 3;
                case 'j':
                    return 4;
                case 'v':
                    return 5;
                case 's':
                    return 6;
                case 'd':
                    return 0;
                default:
                    return 'yes';
                    break;
            } });
        return newArray;
    }
    renderProgram(elementHTML){
        let program = 
        `<div class="containImg"> 
            <a href="https://www.facebook.com/${this.profileFacebook[0]}" target="_blank" title="Ver perfil de Facebook"> 

            ${this.avatar[0] == "autoDj"
            ?   `<img class="live-radio__aire--img" src="./img/${this.avatar[0]}.gif" alt="Avatar ${this.avatar[0]}" />
            </a>`
            :   `<picture">
                    <source type="image/webp" srcset="./img/${this.avatar[0]}.webp">
                    <img class="live-radio__aire--img" src="./img/${this.avatar[0]}.jpg" alt="Avatar ${this.avatar[0]}" data-aos="flip-right" data-aos-delay="1000"/>
                </picture>
            </a>`
            }
                

        ${this.avatar[1]
            ?   `<a href="https://www.facebook.com/${this.profileFacebook[1]}" target="_blank" title="Ver perfil de Facebook"> 
                    <picture>
                        <source type="image/webp" srcset="./img/${this.avatar[1]}.webp">
                        <img class="live-radio__aire--img" src="./img/${this.avatar[1]}.jpg" alt="Avatar ${this.avatar[0]}" id="imagen" data-aos="flip-right" data-aos-delay="1000"/>
                    </picture>
                ` 
            :   ``}

            </div></a>
            <div class="live-radio__aire--description">
                <p class="nombre" id="nombre" data-aos="fade-right" data-aos-delay="900">${this.programName}</p>
                <p class="conductor" id="conductor" data-aos="fade-left" data-aos-delay="900">${this.fullName}</p>
            </div>
            `;
        elementHTML.innerHTML = program;
    }
}

let programList = [  
new Program(
    /*Avatar*/  ['Juan'], 
    /*Nombre*/  'Juan Ramón', 
    /*Apellido*/'Villalva', 
    /*Facebook*/['juanramon.villalva.31'], 
    /*Programa*/'Sentimiento de Amor Chamamecero', 
    /*Dias*/    ['l','ma','mi','j','v'],
    /*Horario*/ '07:00', '09:00'),
new Program(
    ['Daniel', 
    'Laura'], 
    'Daniel Godoy - ', 
    'Laura Medina',
    ['elloku', '100007205203112']
    , '🔥🔥 A Toda Potencia 💪', 
    ['l','ma','mi','j','v'], 
    '09:10','13:00'),
new Program(
    ['Vidente'],
    '',
    '',
    ['#'],
    'Vidente Francisco', 
    ['l','ma','mi','j','v'],  
    '13:00','13:28'),

new Program(['Publi'],    
    '',       
    '🕑 14Hs ➡ Mundo Musical ',  
    ['radiociudad.radiociudad'],
    'Espacio Publicitario',   
    ['l','ma','mi','j','v'],    
    '13:30','14:00'),

new Program(
    ['Silvana','Mino'],
    'Silvana Silva - ',
    'Pedro Miño',
    ['tuwachitiernasmys', 'pedro.mino.1232'],
    'Mundo Musical ', 
    ['l','ma','mi','j','v'],
    '14:00','16:00'),
    
new Program(['Publi'],    
    'Ya llega ',       
    '➡ Arriba la Tarde',  
    ['radiociudad.radiociudad'],
    'Espacio Publicitario',   
    ['l','ma','mi','j','v'],    
    '13:30','16:00'),

new Program(
    ['Godoy'],            
    'Daniel  ',             
    'Godoy',            
    ['elloku'],                         
    'Arriba La Tarde 😎',     
    ['l','ma','mi','j','v'],    
    '16:10','17:58'),


new Program(
    ['Daniel'],            
    '🕕 Ya llega: ',             
    'Che Purahéi',            
    ['elloku'],                         
    'Arriba La Tarde 😎',     
    ['l','ma','mi','j','v'],    
    '16:58','18:00'),

new Program(['julia', 'Laura'],       
    'Julia Fernandez - ',         
    'Laura Medina',  
    ['100008413836572'],             
    'Che Purahéi',             
    ['l','ma','mi','j','v'],   
    '18:00','18:59'),

new Program(
    ['Parroquia'],       
    'Tú serás nuestro Dios, nosotros seremos tu pueblo, Señor',
    '',
    ['parroquia.virgendelcarmen.36'],             
    'Segundo Día de Novena',             
    ['l','ma','mi','j','v'],   
    '19:00','21:30'),

/*new Program(['VirgenDelCarmen'],    '',            '', ['parroquia.virgendelcarmen.73'],   'Novena de la Virgen del Carmen - Noveno Día',        ['l','ma','mi','j','v'],    '20:15','21:30'),*/
/*new Program(['Mino', 'Salvador'],   'Pedro Miño & ',        'Salvador Rosalez', ['#', 'salvador.rosalez.33'],       'Noches Litoraleñas',       ['l','ma','mi','j','v'],    '20:30','22:30'),*/

new Program(
    ['autoDj'],             
    '🎶 🎶 🎶 🎶',              
    '',                 
    ['radiociudad.radiociudad'],        
    'Música en la Ciudad',          
    ['l','ma','mi','j','v'],    
    '20:30','23:59'),
new Program(
    ['autoDj'],             
    '🎶 🎶 🎶 🎶',              
    '',                 
    ['radiociudad.radiociudad'],        
    '⭐ Música en la Ciudad ⭐',          
    ['l','ma','mi','j','v','s'],    
    '00:00','06:30'),
new Program(
    ['autoDj'],             
    '🕘9Hs ➡ Un Abrazo Radical',              
    '',                 
    ['radiociudad.radiociudad'],        
    '⭐ Música en la Ciudad ⭐',          
    ['s'],    
    '06:30','09:00'),
new Program(
    ['autoDj'],             
    '🕖7Hs - Ya llega: Amor Chamamecero',              
    '',                 
    ['radiociudad.radiociudad'],        
    '🎶🎶🎶🎶',          
    ['l','ma','mi','j','v'],    
    '06:30','07:00'),

new Program(
    ['Daniel', 'Laura'],   
    'Daniel Godoy &',       
    'Laura Medina',
    ['elloku', '100007205203112'],      
    'Un Abrazo Radical 💯',    
    ['s'],                      
    '09:00','13:00'),

new Program(
    ['autoDj',],         
    '🎶 🎶',            
    '',            
    ['radiociudad.radiociudad'],                  
    'Música en la Ciudad',                       
    ['s'],                      
    '13:00','16:00'),

new Program(
    ['Jesus'],              
    'Alicia',    
    'Martinez',    
    ['100000340133373'],                              
    'Jesus es el Camino',       
    ['s'],                  
    '16:00','17:00'),

new Program(['Juan2',
'Malvina2'],              
'Juan Ramón Villalva -',                
'Malvina Correa',           
['juanramon.villalva.31', 'malvina.correa.7'],                
'Variaciones Musicales 🎼',           
['s','d'],                      
'17:10','20:00'),

/*
new Program(['Sergio'],             'Sergio',               'Vallejo',          ['sergio.sonidos'],                 'Estilo Musical',           ['s'],                      '20:00','22:00'),*/
new Program(
    ['autoDj'],             
    'Dardo Seitur',              
    '',                 
    ['radiociudad.radiociudad'],        
    'Punto de Encuentro',                  
    ['s'],                      
    '20:05', '23:59'),

new Program(
    ['autoDj'],             
    '🎶🎶🎶🎶',              
    '',                 
    ['radiociudad.radiociudad'],        
    'Música en la Ciudad',       
    ['d'],                      
    '00:00', '17:00'),
/*
new Program(['Hugo'],               'Hugo',                 'Bechir',           ['100011691940069'],                'La Bailanta Chamamecera Dominguera', ['d'],            '09:00', '12:00'),*/
new Program(
    ['autoDj'],             
    '🎶🎶🎶🎶',              
    '',                 
    ['radiociudad.radiociudad'],        
    'Música en la Ciudad',            
    ['d'],                    
    '20:00', '00:00'),




];
let currentTime = () => new Date;

const programElement = document.getElementById('programContainerElement');

let endTime = t => {
    let time = new Date();
    if (t.length > 4) {
        time.setHours(t.substr(0,2));
        time.setMinutes(t.substr(3));
        time.setSeconds(00);
    }else{
        time.setHours(t.substr(0,1));
        time.setMinutes(t.substr(2));
        time.setSeconds(00);
    }
    
    return time;
}

let segunDia = (array, program )=> {
    let a = program.transformDays(array);
    for (const key in a) {
        if (a[key] == currentTime().getDay()){
            return true;
            
        }
    }
    return false;
}
let preparando = program => {
    program.renderProgram(programElement);

    setTimeout(()=>{
        /*console.log(endTime(program.endTime));
        console.log(currentTime());
        console.log(endTime(program.endTime) - currentTime());*/
        segunHora()}, (endTime(program.endTime) - currentTime())/* + 1000*/);
}




segunHora();

/*(01)*/
function segunHora() {
    for (const key in programList) {
        /** Si horaActual >= horaDeInicio y horaActual < horaDeFin y diaVerdadero */
        if (currentTime() >= endTime(programList[key].startTime) && currentTime() < endTime(programList[key].endTime) && segunDia(programList[key].days, programList[key])) {
            var ok = true;
            preparando(programList[key]);
            var keySig = parseInt(key) + 1;
            
            AOS.init();
            if (programList[keySig].firsName == 'Auto DJ' || programList[key].firsName == 'Auto DJ') {
                tanda = () => new Program(['Publi'], 'Ya', 'volvemos !!', '#', 'Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+2}`);
    
            }else{
                console.log(`Hola probandoooooooo que   pasoooooooooooo ${programList[keySig].startTime}`)
                tanda = () => new Program(['Publi'], 'Ya llega: ', programList[keySig].programName, '#', 'Espacio Publicitario', '[]', ``, programList[keySig].startTime);
                AOS.init();
            }
            break;
        } 
    }
    if(ok != true) {

        console.log(`${currentTime().getHours()}:${currentTime().getMinutes()+2}`)
        let tanda = () => new Program(['Publi'], 'Ya', 'volvemos!!', '#', 'Espacio Publicitario', '[]', '', currentTime().getMinutes() <= 9 ? `${currentTime().getHours()}:0${currentTime().getMinutes()+1}` : `${currentTime().getHours()}:${currentTime().getMinutes()+1}`);
        preparando(tanda());
    }
    
    AOS.init();
}




// de ms A m
let msToDateObj = ms => {
    let seconds = Math.floor(ms / 1000),
        minutes = Math.floor(ms / (1000 * 60)),
        hours = Math.floor(ms / (1000 * 60 * 60));
        /*day = Math.floor(ms / (1000 * 60 * 60 *24));*/
    return {hours,minutes,seconds}
}

let msToExpandedDateObj = ms => {
    let hours = msToDateObj(ms).hours % 24;
    let minutes = msToDateObj(ms).minutes % 60;
    let seconds = msToDateObj(ms).seconds % 60;
    return {hours,minutes,seconds}
}

let inicio = new Date('Sun Apr 29 2018 09:30:00 GMT-0300');
let fin = new Date('Sun Apr 29 2018 13:00:00 GMT-0300');


let btnActive = document.getElementById("active")



function ola(){
    alert("hola")
}

btnActive.addEventListener("click", () =>{
    document.getElementById("btnToggle").classList.toggle("active")
})
