import express, { Router } from "express";
import * as commentController from "../controllers/commentController";
// import authenticate from "../middleware/authenticate";
// import isAuthorized from "../middleware/authorize";
// import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.post(
    '/',
    commentController.createComment
);

router.get('/', commentController.getAllComments);

router.get('/:id', commentController.getCommentById);

router.delete(
    "/:id",
    commentController.deleteComment
);

export default router;