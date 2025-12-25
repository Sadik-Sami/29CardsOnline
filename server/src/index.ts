import { startWebSocketServer } from '@/transport/websocketServer';
import { createHttpServer } from '@/transport/httpServer';
const PORT = 8080;

const { server } = createHttpServer();
startWebSocketServer(server);

server.listen(PORT, () => {
	console.log(`[HTTP] Server is listening on http://localhost:${PORT}`);
});
