// node index.js
const io = require("socket.io")(3001);
const rnd = require("randomcolor");

let guests = [];

io.of("/lobby").on("connect", socket => {
  console.log(`new connection ${socket.id}`);

  socket.on("new-guest", (guest, ack) => {
    guest.sId = socket.id;
    guest.score = 0;
    guest.fill = rnd({luminosity: "dark"});
    guest.x = Math.random() * 800;
    guest.y = Math.random() * 600;
    guest.radius = 7;
    guest.stroke = "black";
    guest.strokeWidth = 4;
    guests.push(guest);
    console.log(`new guest, ${guests.length} online`);
    io.of("/lobby").emit("list-players", guests);
    ack(guest);
  });

  socket.on("bye-bye", _ => {
    guests = guests.filter(e => e.sId != socket.id);
    console.log(`guest ${socket.id} disconnected, ${guests.length} online`);
    io.of("/lobby").emit("list-players", guests);
  });
});

console.log("server online");
