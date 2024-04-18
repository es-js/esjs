// Definición de una clase con herencia
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    // Método de instancia
    hablar() {
        console.log(`${this.nombre} hace un sonido.`);
    }
}

class Perro extends Animal {
    constructor(nombre) {
        super(nombre);
    }

    // Método de instancia sobrescrito
    hablar() {
        console.log(`${this.nombre} ladra.`);
    }

    // Método estático
    static informacion() {
        console.log('Los perros son animales domésticos.');
    }
}

// Función asíncrona
async function funcionAsincrona() {
    try {
        await algunaOperacionAsincrona();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log('Operación asíncrona terminada.');
    }
}

// Función generadora
function* funcionGeneradora() {
    yield 'Uno';
    yield 'Dos';
    yield 'Tres';
}

// Operadores
var a = 5;
var b = 10;
let suma = a + b;
let resta = b - a;
let multiplicacion = a * b;
let division = b / a;
let resto = b % a;

// Estructura de control
if (a < b) {
    console.log('A es menor que B.');
} else {
    console.log('A es mayor o igual que B.');
}

let i = 0;
while (i < 5) {
    console.log('Iteración:', i);
    i++;
}

// Uso de keywords especiales
let miObjeto = new Animal('Gato');
console.log(miObjeto instanceof Animal);

let miVariable = null;
console.log(typeof miVariable);

let miArray = [1, 2, 3];
delete miArray[0];

let x = 5;
let y = 10;
console.log(x in miObjeto);

let z = new Perro('Bobby');
console.log(z instanceof Perro);

// Palabras reservadas
let valorNulo = null;
let valorVerdadero = true;
let valorFalso = false;
let esteValor = this;
let romperValor = 'romper';
let casoValor = 'caso';
let capturarValor = 'capturar';
let continuarValor = 'continuar';
let depuradorValor = 'depurador';
let porDefecto = 'por defecto';
let hacerValor = 'hacer';
let sinoValor = 'sino';
let finalmenteValor = 'finalmente';
let paraValor = 'para';
let funcionValor = 'función';
let siValor = 'si';
let retornarValor = 'retornar';
let elegirValor = 'elegir';
let lanzarValor = 'lanzar';
let intentarValor = 'intentar';
let mutarValor = 'mutar';
let mientrasValor = 'mientras';
let conValor = 'con';
let crearValor = 'crear';
let ambienteValor = 'ambiente';
let claseValor = 'clase';
let extiendeValor = 'extiende';
let exportarValor = 'exportar';
let importarValor = 'importar';
let producirValor = 'producir';
let nuloValor = 'nulo';
let verdaderoValor = 'verdadero';
let falsoValor = 'falso';
let enValor = 'en';
let instanciaDeValor = 'instancia de';
let tipoDeValor = 'tipo de';
let vacioValor = 'vacío';
let eliminarValor = 'eliminar';
let asincronoValor = 'asíncrono';

funcionAsincrona();

function algunaOperacionAsincrona() {
    return new Promise(resuelve => {
        setTimeout(() => resuelve(), 1000);
    });
}

Perro.informacion();
