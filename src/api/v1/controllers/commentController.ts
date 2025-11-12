import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as commentService from "../services/commentService";
import { Comment } from "../models/commentModel";
import { successResponse } from "../models/responseModel";

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { user, comment } = req.body;

        const newComment: Comment = await commentService.createComment({
            user,
            comment
        });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newComment, "Comment created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const comments: Comment[] = await commentService.getAllComments();
        res.status(HTTP_STATUS.OK).json(
            successResponse(comments, "Comment successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const getCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
        try {
        const id: string = req.params.id;

        const selectedComment: Comment = await commentService.getCommentById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(selectedComment, "Comment retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};