import { FastifyInstance } from "fastify";
import {
  create,
  getLocationByUser,
  remove,
  removeAll,
  update,
  updateFavorite,
} from "./controllers/locations";
import { deleteAllUsers, getAllUsers } from "./controllers/users";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { verifyJwt } from "./controllers/middlewares/verify-jwt";
import { profile } from "./controllers/profile";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", { onRequest: [verifyJwt] }, getLocationByUser);
  app.post("/locations", { onRequest: [verifyJwt] }, create);
  app.put("/locations/:id", update);
  app.patch("/locations/:id", updateFavorite);
  app.delete("/locations/:id", remove);
  app.delete("/locations/delete-all", removeAll);
};

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", register);
  app.post("/sessions", authenticate);
  app.post("/me", { onRequest: [verifyJwt] }, profile);
};

export const userRoutes = async (app: FastifyInstance) => {
  app.get("/users", getAllUsers);
  app.delete("/users", deleteAllUsers);
};
