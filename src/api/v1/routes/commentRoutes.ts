import express, { Router } from "express";
import * as commentController from "../controllers/commentController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    '/',
    authenticate,
    isAuthorized({ 
        hasRole: ["admin"], 
        allowSameUser: true,
    } as AuthorizationOptions),
    commentController.createComment
);

router.get('/', commentController.getAllComments);

router.get('/', commentController.getCommentById);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ 
        hasRole: ["admin"] 
    } as AuthorizationOptions),
    commentController.deleteComment
);

export default router;