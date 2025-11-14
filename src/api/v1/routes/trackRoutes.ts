import express, { Router } from "express";
import * as trackController from "../controllers/trackController";
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
    trackController.createTrack
);

router.get('/', trackController.getAllTracks);

router.get('/', trackController.getTrackById);

router.put(
    "/:id",
    authenticate,
    isAuthorized({ 
        hasRole: ["admin", "users-with-access"], 
        allowSameUser: true,
    } as AuthorizationOptions),
    trackController.updateTrack
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ 
        hasRole: ["admin", "users-with-access"] 
    } as AuthorizationOptions),
    trackController.deleteTrack
);

export default router;