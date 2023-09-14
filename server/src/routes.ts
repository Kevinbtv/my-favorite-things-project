import { FastifyInstance } from "fastify";
import {
  create,
  getAll,
  remove,
  removeAll,
  update,
  updateFavorite,
} from "./controllers/locations";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", getAll);

  app.post("/locations", create);

  app.put("/locations/:id", update);

  app.patch("/locations/:id", updateFavorite);

  app.delete("/locations/:id", remove);

  app.delete("/locations/delete-all", removeAll);
};
