import { Router } from "express";
import { blockCard, unblockCard } from "../controllers/blockController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { logInSchema } from "../schemas/schemas.js";

  
const blockRouter = Router();

blockRouter.put("/blockCard", validateSchema(logInSchema) ,blockCard);
blockRouter.put("/unblockCard", validateSchema(logInSchema) ,unblockCard);
  
export default blockRouter;