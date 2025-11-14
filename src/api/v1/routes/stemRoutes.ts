import express, { Router } from "express";
import * as stemController from "../controllers/stemController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    '/',
    authenticate,
    isAuthorized({ 
        hasRole: ["admin", "users-with-access"], 
        allowSameUser: true,
    } as AuthorizationOptions),
    stemController.createStem
);

router.get('/', stemController.getAllStems);

router.get('/', stemController.getStemById);

router.put(
    "/:id",
    authenticate,
    isAuthorized({ 
        hasRole: ["admin", "users-with-access"], 
        allowSameUser: true,
    } as AuthorizationOptions),
    stemController.updateStem
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ 
        hasRole: ["admin", "users-with-access"] 
    } as AuthorizationOptions),
    stemController.deleteStem
);

export default router;