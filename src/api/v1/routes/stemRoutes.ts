import express, { Router } from "express";
import * as stemController from "../controllers/stemController";
// import authenticate from "../middleware/authenticate";
// import isAuthorized from "../middleware/authorize";
// import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    '/',
    stemController.createStem
);

router.get('/', stemController.getAllStems);

router.get('/:id', stemController.getStemById);

router.put(
    "/:id",
    stemController.updateStem
);

router.delete(
    "/:id",
    stemController.deleteStem
);

export default router;