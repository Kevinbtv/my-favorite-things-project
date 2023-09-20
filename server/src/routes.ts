import { FastifyInstance } from "fastify";
import {
  create,
  getAll,
  remove,
  removeAll,
  update,
  updateFavorite,
} from "./controllers/locations";
import { deleteAllUsers, getAllUsers } from "./controllers/users";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJwt } from "./controllers/middlewares/verify-jwt";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", { onRequest: [verifyJwt] }, getAll);
  app.post("/locations", { onRequest: [verifyJwt] }, create);
  app.put("/locations/:id", update);
  app.patch("/locations/:id", updateFavorite);
  app.delete("/locations/:id", remove);
  app.delete("/locations/delete-all", removeAll);
};

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", register);
  app.post("/sessions", authenticate);
};

export const userRoutes = async (app: FastifyInstance) => {
  app.get("/users", getAllUsers);
  app.delete("/users", deleteAllUsers);
};
