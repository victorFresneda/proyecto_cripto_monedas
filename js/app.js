const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');


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
     
