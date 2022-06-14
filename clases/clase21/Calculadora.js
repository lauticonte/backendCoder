class Calculadora {
    static sumar(a,b){
        if(!a||!b) return console.log("Faltan parametros");
        // if(!a||!b){
        //     console.log("Faltan parametros")
        // }else{
        if(!Number.isInteger(a)||!Number.isInteger(b)) return console.log("Los valores tienen que ser numericos");
        // if(!Number.isInteger(a)||!Number.isInteger(b)){
        //     console.log("Los valores tienen que ser numericos")
        // }else{
        // let result = a+b;
        console.log(a+b);
        }
    }

Calculadora.sumar(2,3);