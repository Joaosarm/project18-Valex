import { Router } from "express";
import activateCardRouter from "./activateCardRouter.js";
import balanceRouter from "./balanceRouter.js";
import blockRouter from "./blockRouter.js";
import creationRouter from "./creationRouter.js";
var router = Router();
router.use(creationRouter);
router.use(activateCardRouter);
router.use(balanceRouter);
router.use(blockRouter);
export default router;
