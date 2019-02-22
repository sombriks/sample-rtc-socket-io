// node index.js
const io = require("socket.io")(3001);

io.on("connection", s => {
  console.log(
    `There are ${io.sockets.server.engine.clientsCount} players online`
  );
});

io.of("/lobby").on("connect", socket => {
  console.log(`client ${socket.id} on lobby`);

  socket.on("new-guest", guest => {
    console.log(guest);
  });
});

io.of("/match").on("connect", socket => {
  console.log(`client ${socket.id} on match`);
});

console.log("server online");
