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
        let program = `<div class="containImg"> <a href="https://www.facebook.com/${this.profileFacebook[0]}" target="_blank"> <img class="live-radio__aire--img" src="./img/${this.avatar[0]}.jpg" alt="" id="imagen" /></a>
        ${this.avatar[1]? `<a href="https://www.facebook.com/${this.profileFacebook[1]}" target="_blank"><img class="live-radio__aire--img" src="./img/${this.avatar[1]}.jpg">` : ``}</div></a>
        <div class="live-radio__aire--description">
            <p class="nombre" id="nombre">${this.programName}</p>
            <p class="conductor" id="conductor">${this.fullName}</p>
        </div>
        `;
        elementHTML.innerHTML = program;
    }
}

let programList = [
            //Avatar                 //nombre               //apelido           //facebook                          //Programa                   //Dias                     //HIni   //HFin    
new Program(['Hugo'],               'Hugo',                 'Bechir',           ['100011691940069'],                'Identidad Correntina',     ['l','ma','mi','j','v','s'],'06:00', '09:00'),
new Program(['Daniel3', 'Laura'],   'Daniel Godoy &',       'Laura Medina',     ['elloku', '100007205203112'],      '🔥🔥 A Toda Potencia 💪',  ['l','ma','mi','j','v'],    '09:30','13:00'),
new Program(['Vidente'],            '',                     '',                 ['#'],                              'Vidente Francisco',        ['l','ma','mi','j','v'],    '13:00','13:30'),
new Program(['David', 'Alejandro'], 'David Gomes &',        'Alejandro Silva',  ['100009783664325','ale.silva.735'],'Defendiendo lo Nuestro',   ['l','ma','mi','j','v'],    '13:30','14:00'),
new Program(['Salvador'],           'Salvador',             'Rosalez',          ['salvador.rosalez.33'],            'Siesta Chamamecera',       ['l','ma','mi','j','v'],    '14:20','16:00'),
new Program(['Daniel3'],            'Daniel  ',             'Godoy',            ['elloku'],                         '☝️ Arriba La Tarde 💃',     ['l','ma','mi','j','v'],    '16:20','18:00'),
new Program(['Jose'],               'José Fabian',          'Barrios (El Potro Dj)',['josefabian.barrios'],         'Tarde en la Ciudad',       ['l','ma','mi','j','v'],    '18:10','19:00'),
new Program(['Alejandro'],          'Alejandro',            'Silva',            ['ale.silva.735'],                  'Atardecer Sauceño',        ['l','ma','mi','j','v'],    '19:10','20:30'),
new Program(['Mino', 'Salvador'],   'Pedro Miño & ',        'Salvador Rosalez', ['#', 'salvador.rosalez.33'],       'Noches Litoraleñas',       ['l','ma','mi','j','v'],    '20:30','22:30'),
new Program(['autoDj'],             'Auto DJ',              '',                 ['radiociudad.radiociudad'],        'Buena Musica 👌',          ['l','ma','mi','j','v'],    '22:50','23:59'),
new Program(['autoDj'],             'Auto DJ',              '',                 ['radiociudad.radiociudad'],        'Buena Musica 👌',          ['l','ma','mi','j','v'],    '00:00','05:50'),

new Program(['Daniel3', 'Vanesa'],   'Daniel Godoy &',       'Vanesa silva Baez',['elloku', 'vanesa.baez.102'],      'Un Abrazo Radical 💯',    ['s'],                      '09:00','13:00'),
new Program(['Alejandro',],         'Alejandro',            'Silva',            ['ale.silva.735'],                  '--',                       ['s'],                      '13:00','15:00'),
new Program(['Jesus'],              'Alicia Martinez &',    'Fernando More',    ['#'],                              'Jesus es el Camino',       ['s'],                      '16:00','17:00'),
new Program(['Laura'],              'Laura',                'Medina',           ['100007205203112'],                'Show Music 🎼',           ['s'],                      '17:00','20:00'),
new Program(['Sergio'],             'Sergio',               'Vallejo',          ['sergio.sonidos'],                 'Estilo Musical',           ['s'],                      '20:00','22:00'),
new Program(['autoDj'],             'Auto DJ',              '',                 ['radiociudad.radiociudad'],        'ATR 💯',                  ['s'],                      '22:40', '00:00'),
new Program(['autoDj'],             'Auto DJ',              '',                 ['radiociudad.radiociudad'],        'Buena Musica!! 💯',       ['d'],                      '00:00', '8:55'),

new Program(['Hugo'],               'Hugo',                 'Bechir',           ['100011691940069'],                'La Bailanta Chamamecera Dominguera', ['d'],            '09:00', '12:00'),
new Program(['autoDj'],             'Auto DJ',              '',                 ['radiociudad.radiociudad'],        'Buena Musica 👌',            ['d'],                    '12:10', '23:00'),




];
let currentTime = () => new Date;

/*console.log(programList[0].fullName);*/
const programElement = document.getElementById('programContainerElement');

/*let time = new Date('Sun Apr 29 2018 00:0:00 GMT-0300')*/

/*let trancurrido =  (Math.floor(currentTime - time)); */
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
    

    /*time.setHours(t.substr(0,2));
    time.setMinutes(t.substr(3));
    time.setSeconds(00);*/

    /*console.log(time);*/
    /*console.log(time.getHours()+ " " + time.getMinutes());*/
    return time;
}
/*let setHoraInicio = (t) =>{
    l
}*/
/*programList[1].transformDays();*/
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
        console.log(endTime(program.endTime));
        console.log(currentTime());
        console.log(endTime(program.endTime) - currentTime());
        segunHora()}, (endTime(program.endTime) - currentTime())/* + 1000*/);
}

let tanda = () => new Program(['Publi'], 'Ya', 'volvemos!!', '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1}`);
segunHora();
/*if (sig.firsName == 'Auto DJ') {
    tanda = () => new Program(['Publi'], 'ya', 'volvemos con mas musica!', '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1} `);
}else{
    tanda = () => new Program(['Publi'], 'ya llega: ', sig.programName, '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1} `);
}*/


function segunHora() {
    for (const key in programList) {
        /*if (programList[key].hour <= currentTime().getHours() && currentTime() < endTime(programList[key].endTime) && segunDia(programList[key].days, programList[key])) {*/
        if (currentTime() >= endTime(programList[key].startTime) && currentTime() < endTime(programList[key].endTime) && segunDia(programList[key].days, programList[key])) {
            /*console.log(programList[key]);*/
            /*setInterval(() => console.log(programList[key]), 5000);*/
            /*console.log('Llamando!');*/
            var ok = true;
            preparando(programList[key]);
            let keySig = parseInt(key) + 1;
            /*console.log(keySig);*/
            /*return programList[keySig];*/
            if (programList[keySig].firsName == 'Auto DJ' || programList[key].firsName == 'Auto DJ') {
                tanda = () => new Program(['Publi'], 'Ya', 'volvemos !!', '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1}`);
            }else{
                tanda = () => new Program(['Publi'], 'Ya llega: ', programList[keySig].programName, '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1}`);
            }
            break;
        } 
    }
    if(ok != true) preparando(tanda());
}



//let sig = segunHora();

//let tanda = () => new Program(['Publi'], 'ya llega: ', sig.programName, '#', '📢 Espacio Publicitario', '[]', '', `${currentTime().getHours()}:${currentTime().getMinutes()+1} `);

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
    /*minutes = minutes % 60;*/
    let seconds = msToDateObj(ms).seconds % 60;
    return {hours,minutes,seconds}
}

let inicio = new Date('Sun Apr 29 2018 09:30:00 GMT-0300');
let fin = new Date('Sun Apr 29 2018 13:00:00 GMT-0300');
/*console.log(inicio - fin);*/
/*console.log(msToExpandedDateObj(trancurrido));*/

