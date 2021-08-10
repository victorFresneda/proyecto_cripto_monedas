const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}


//Crear un promise 
const obtenerCriptomonedas = criptoMonedas => new Promise(resolve => {
    resolve(criptoMonedas);
});


document.addEventListener('DOMContentLoaded', () => {

    consultarCriptoMonedas();

    formulario.addEventListener('submit', submitFomulario);

    criptoMonedasSelect.addEventListener('change', leerValor);


    monedasSelect.addEventListener('change', leerValor);
}); 


function consultarCriptoMonedas (){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
          

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( resultado => obtenerCriptomonedas(resultado.Data))
        .then( criptoMonedas => selectCriptomonedas(criptoMonedas))
}



function selectCriptomonedas(criptoMonedas){

    criptoMonedas.forEach( cripto => {


        const {FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoMonedasSelect.appendChild(option);

        
        });
}


function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    
}


function submitFomulario(e){
    e.preventDefault();

    //validar

    const {moneda, criptomoneda} = objBusqueda;

    if( moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios')
        return;
    }


    // Cosultar la API co los resultsdos

    consultarAPI();


}

function mostrarAlerta(msg){


    const existeError = document.querySelector('.error');


    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');


        //Mensaje error
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);


        setTimeout(() => {
            divMensaje.remove();
     },  3000);
    }

    
    
    

}

function consultarAPI(){
    const {moneda, criptomoneda} = objBusqueda;

    const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCtizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
     
}

function mostrarCtizacionHTML(cotizacion){

    limpiarHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const  precioMasAlto = document.createElement('p');
    precioMasAlto.innerHTML = `El precio mas alto del dia <span>${HIGHDAY}</span>`;

    const  precioBajo = document.createElement('p');
    precioBajo.innerHTML = `El precio mas bajo del dia <span>${LOWDAY}</span>`;

    const  ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `Variacion en las ultimas horas <span>${CHANGEPCT24HOUR}%</span>`;

    const  ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `La ultima actualizacion del dia <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioMasAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);


};


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function mostrarSpinner(){

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');


    spinner.innerHTML = `
       <div class="bounce1"></div>
       <div class="bounce2"></div>
       <div class="bounce3"></div>
    `;

    resultado.appendChild(spinner);

}
     
