const randomNumber = (cant) => {
  let cantidad = +cant;
  let numbers =[];
  for (let i = 0; i < cantidad; i++) {
    let random = Math.floor((Math.random() * 1000) +1);
    numbers.push(random);
  }
  let repetidos = {};
  numbers.forEach((numero) => {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

process.on('message', (cant) => {
  console.log(`cantidad: ${cant}`);
  const generar = randomNumber(cant);
  process.send({res: generar});
});