
const chatController = async (socket) => {
  console.log("Un cliente se ha conectado");
  const arrayDeProductos = await apiProductos.getAll();
  const messages = await chat.getMessages().then((res) => res);
  const normalizedMessages = normalizar(messages);
  const denormalizedMessages = denormalizar(normalizedMessages);
  socket.emit("productos", arrayDeProductos);
  socket.emit("messages", normalizedMessages);
  socket.on("new-product", async (data) => {
    await apiProductos.save(data);
    const arrayDeProductos = await apiProductos.getAll();
    io.sockets.emit("productos", arrayDeProductos);
  });
  socket.on("new-message", async (data) => {
    await chat.saveMessages(data).then((resolve) => resolve);
    const messages = await chat.getMessages().then((resolve) => resolve);
    const normalizedMessages = normalizar(messages);
    io.sockets.emit("messages", normalizedMessages);
  });
};

module.exports = chatController;