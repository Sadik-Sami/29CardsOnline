import express from 'express';
import http, { type Server } from 'http';
import type { Express } from 'express';

export interface HttpServerContext {
	readonly app: Express;
	readonly server: Server;
}

export function createHttpServer(): HttpServerContext {
	const app = express();
	const server = http.createServer(app);

	return { app, server };
}
