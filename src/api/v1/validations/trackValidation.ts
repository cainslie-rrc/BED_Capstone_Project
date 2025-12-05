import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *      Track:
 *          type: object
 *          required:
 *              - user
 *              - audio
 *              - name
 *          properties:
 *              user:
 *                  type: string
 *                  description: The name of the track creator
 *                  example: "John Doe"
 *              audio:
 *                  type: string
 *                  description: The directory of the audio file
 *                  example: "/uploads/tracks/2ejvoj2oeiutowvep2op-Wyth - Exodia.mp3"
 *              name:
 *                  type: string
 *                  description: The name of the track
 *                  example: "Wyth - Exodia"
 *              genre:
 *                  type: array
 *                  description: List of genres the track belongs to
 *                  items:
 *                      type: string
 *                      enum: ["House", "Trap", "Dubstep", "Hardstyle", "Techno"]
 *                      example: ["Trap"]
 */

/**
 * Track schema organised by request type
 */
export const trackSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/tracks - Create new Track
    create: {
        body: Joi.object({
            user: Joi.string().required().messages({
                "any.required": "User is required.",
                "string.empty": "User cannot be empty.",
            }),
            name: Joi.string().required().messages({
                "any.required": "Name is required.",
                "string.empty": "Name cannot be empty.",
            }),
            genre: Joi.array().optional().messages({
                "string.empty": "Genre cannot be empty.",
            }),
        }),
    },

    // PUT /api/v1/tracks/:id/audio - Update Track
    uploadAudio: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Track ID is required",
                "string.empty": "Track ID cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/tracks/:id - Update Track
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Track ID is required",
                "string.empty": "Track ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required.",
                "string.empty": "Name cannot be empty.",
            }),
            user: Joi.string().optional().messages({
                "string.empty": "User cannot be empty.",
            }),
            genre: Joi.array().optional().messages({
                "string.empty": "Gere cannot be empty.",
            }),
        }),
    },
};