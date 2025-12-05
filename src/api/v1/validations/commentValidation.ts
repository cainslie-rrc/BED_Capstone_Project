import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *  schemas:
 *      Comment:
 *          type: object
 *          required:
 *              - user
 *              - comment
 *          properties:
 *              user:
 *                  type: string
 *                  description: Name of the user who made the comment
 *                  example: "John Doe"
 *              comment:
 *                  type: string
 *                  description: The comment text
 *                  example: "This is a great post!"
 */

/**
 * Comment schema organised by request type
 */
export const commentSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/comments - Create new Comment
    create: {
        body: Joi.object({
            user: Joi.string().required().messages({
                "any.required": "User is required.",
                "string.empty": "User cannot be empty.",
            }),
            comment: Joi.string().required().messages({
                "any.required": "Comment is required.",
                "string.empty": "Comment cannot be empty.",
            }),
        }),
    },
};
