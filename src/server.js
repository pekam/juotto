const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Keep in sync with frontend/src/App.js
const port = 3001;

let interval;

io.on("connection", (socket) => {
  console.log("connection");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => socket.emit("msg", new Date().getTime()), 1000);
  socket.on("disconnect", () => {
    console.log("disconnect");
    clearInterval(interval);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
