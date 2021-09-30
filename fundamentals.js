// variables

let variableSinValor;
let booleano1 = true;
let booleano2 = false;
const PI = 3.14;
const TAU = 2 * PI;
let variableValorNumerico = 5;
let miNombre = "Eloy";
let miNumeroFav = PI;

// booleanos

let booleanoAnd = booleano1 && booleano2;
let booleanoNot = !booleano1;
let booleanoMix0 = (booleano1 || booleano2) && (booleano1 || (!booleano1 && !booleano2));
let booleanoOr = booleano1 || booleano2;
let booleanoMix1 = (booleano1 && (TAU / 2 == PI)) || variableValorNumerico >= miNumeroFav;
let seisNoEsNuevo = 6 != 9;
let booleanoMix2 = (variableValorNumerico > 0) || (variableValorNumerico < -(miNumeroFav * TAU));

// operadores

let valorSuma = miNumeroFav + variableValorNumerico;
let valorResta = miNumeroFav - variableValorNumerico;
let valorMultiplicacion = miNumeroFav * variableValorNumerico;
let valorDivision = miNumeroFav / 3;

// arrays

let arrayVacio = [];
let arrayNumeros = [0,1,2,3,4,5,6,7,8,9];
let arrayNumerosPares = [0,2,4,6,8];
let arrayBidimensional = [[0,1,2], ['a', 'b', 'c']];

// estructuras de control de flujo

let contarHasta10while = 0;
while (contarHasta10while < 10){
    contarHasta10while++;
}

let i = 0;
let j = 0;
for (i; i < 11; i++){
    j = j + (i*i);
}

let sumaPares = 0; 
while (i < 10 ){
    if (i % 2){
        sumaPares = sumaPares + i;
    }
}

let contarHasta10for = 0;
for (contarHasta10for; contarHasta10for === 10; contarHasta10for++);
