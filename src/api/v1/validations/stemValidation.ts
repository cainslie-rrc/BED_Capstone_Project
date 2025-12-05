import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *      Stem:
 *          type: object
 *          required:
 *              - audio
 *              - user
 *              - name
 *              - trackId
 *          properties:
 *              audio:
 *                  type: string
 *                  description: The directory of the audio file
 *                  example: "/uploads/tracks/2ejvoj2oeiutowvep2op-exodia_drums.mp3"
 *              user:
 *                  type: string
 *                  description: Name of the user who created the stem
 *                  example: "John Doe"
 *              name:
 *                  type: string
 *                  description: The name of the stem
 *                  example: "Guitar Stem"
 *              trackId:
 *                  type: string
 *                  description: The ID of the track this stem belongs to
 *                  example: "3u9ufg9458230-4852vdefg"
 */

/**
 * Stem schema organised by request type
 */
export const stemSchema: Record<string, RequestSchema> = {
    // POST /api/v1/stems - Create new Stem
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
            trackId: Joi.string().required().messages({
                "any.required": "TrackId is required.",
                "string.empty": "TrackId cannot be empty.",
            }),
        }),
    },

    // PUT /api/v1/stems/:id/audio - Update Stem
    uploadAudio: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Stem ID is required",
                "string.empty": "Stem ID cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/stems/:id - Update Stem
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Stem ID is required",
                "string.empty": "Stem ID cannot be empty",
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
            trackId: Joi.string().optional().messages({
                "string.empty": "TrackId cannot be empty.",
            }),
        }),
    },
};