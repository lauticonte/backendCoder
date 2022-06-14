console.log(process.argv);
const argumentos  = process.argv.slice(2);
console.log(argumentos);

const suma = argumentos.reduce((acc,value) => acc + parseInt(value),0);
console.log(suma);