import { FastifyInstance } from "fastify";
import {
  create,
  getAll,
  remove,
  removeAll,
  update,
  updateFavorite,
} from "./controllers/locations";
import { login, register } from "./controllers/auth";
import { deleteAllUsers, getAllUsers } from "./controllers/users";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", getAll);

  app.post("/locations", create);

  app.put("/locations/:id", update);

  app.patch("/locations/:id", updateFavorite);

  app.delete("/locations/:id", remove);

  app.delete("/locations/delete-all", removeAll);
};

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", register);
  app.post("/login", login);
};

export const userRoutes = async (app: FastifyInstance) => {
  app.get("/users", getAllUsers);
  app.delete("/users", deleteAllUsers);
};
