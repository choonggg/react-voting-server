import Server from 'socket.io';

export default function startServer() {
  const io = Server(8090);
}
