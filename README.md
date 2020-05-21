# Juotto :beer:

This is a real-time web application implementing a
classic card based juoma game.

The backend runs on Node.js and the frontend is built
with React.
The real-time communication between the server and
the client is implemented with the
[socket.io](https://socket.io) library.

### Development

- Run `npm install` and `npm start` to start the backend server
- Go to `./frontend/` and run `npm install` and `npm start` to
start the `create-react-app` dev server serving frontend files
- Navigate to `localhost:3000` in your browser

### Production Build (to be improved)

For production, we want a single server instance to serve
both the backend service (connected via socket.io) and the
frontend resources (the React app).

- In the `./frontend/` dir, in `App.jsx`, the client
connects to the socket.io backend with
`socketIOClient("localhost:8080")`. Remove the url.
This makes the socket connect to the application url.
- In `./frontend/`, run `npm run build` to create a
production build of the frontend resources (the React app)
- Run `npm start` in the project root to serve both the
static resources and the socket.io connection through
the same port
