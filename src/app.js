import "dotenv/config";

import express from "express";
import routes from "./routes";

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    return this;
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;