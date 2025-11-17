import express, { Router } from "express";
import * as trackController from "../controllers/trackController";
// import authenticate from "../middleware/authenticate";
// import isAuthorized from "../middleware/authorize";
// import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    '/',
    trackController.createTrack
);

router.get('/', trackController.getAllTracks);

router.get('/:id', trackController.getTrackById);

router.put(
    "/:id",
    trackController.updateTrack
);

router.delete(
    "/:id",
    trackController.deleteTrack
);

export default router;