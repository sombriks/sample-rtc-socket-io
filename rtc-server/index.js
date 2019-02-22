// node index.js
const io = require("socket.io")(3001);
const rnd = require("randomcolor");

let guests = [];
let moves = {};

io.of("/lobby").on("connect", socket => {
  socket.on("new-guest", (guest, ack) => {
    guest.sId = socket.id;
    guest.score = 0;
    guest.fill = rnd({luminosity: "dark"});
    guest.x = Math.random() * 800;
    guest.y = Math.random() * 600;
    guest.radius = 15;
    guest.stroke = "black";
    guest.strokeWidth = 4;
    guests.push(guest);
    io.of("/lobby").emit("list-players", guests);
    ack(guest);
  });

  socket.on("move-to", pos => {
    moves[pos.sId] = pos;
    const [guest] = guests.filter(e => e.sId == pos.sId);
    if (guest) {
      if (guest.x - pos.layerX > 20) guest.x -= 15;
      if (guest.x - pos.layerX < 20) guest.x += 15;

      if (guest.y - pos.layerY > 20) guest.y -= 15;
      if (guest.y - pos.layerY < 20) guest.y += 15;

      io.of("/lobby").emit("list-players", guests);
    }
  });

  socket.on("del-move", pos => {
    delete moves[pos.sId];
    io.of("/lobby").emit("list-moves", moves);
  });

  socket.on("bye-bye", _ => {
    guests = guests.filter(e => e.sId != socket.id);
    io.of("/lobby").emit("list-players", guests);
  });
});

console.log("server online");
