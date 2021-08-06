const criptoMonedasSelect = document.querySelector('#criptomenedas');


//Crear un promise 
const obtenerCriptomonedas = criptoMonedas => new Promise(resolve => {
    resolve(criptoMonedas);
});


document.addEventListener('DOMContentLoaded', () => {

    consultarCriptoMonedas();
}) 


function consultarCriptoMonedas (){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
          

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( resultado => obtenerCriptomonedas(resultado.Data))
        .then( criptoMonedas => selectCriptomonedas(criptoMonedas))
}



function selectCriptomonedas(criptoMonedas){

    criptoMonedas.forEach( cripto => {

        console.log(cripto);
        
    });




}

     
