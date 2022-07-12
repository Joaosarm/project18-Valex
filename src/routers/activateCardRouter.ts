import { Router } from "express";
import { activateCard } from "../controllers/activateCardController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { activationSchema } from "../schemas/schemas.js";

const activateCardRouter = Router();
activateCardRouter.put("/activateCard", validateSchema(activationSchema), activateCard);

export default activateCardRouter;