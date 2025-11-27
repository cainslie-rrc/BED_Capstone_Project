import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as commentService from "../services/commentService";
import { Comment } from "../models/commentModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to create a Comment
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
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
            successResponse(newComment, "Comment created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Comments
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const comments: Comment[] = await commentService.getAllComments();
        res.status(HTTP_STATUS.OK).json(
            successResponse(comments, "Comments retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve a Comment by ID
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
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

/**
 * Manages requests and responses to delete a Comment
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await commentService.deleteComment(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Comment deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};