import { Router } from "express";
import { createCard } from "../controllers/createCardController.js";
import { checkApiKey } from "../middlewares/cardMiddlewares.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardSchema } from "../schemas/schemas.js";

  
const creationRouter = Router();

creationRouter.post("/createCard", validateSchema(createCardSchema), checkApiKey, createCard);
  
export default creationRouter;