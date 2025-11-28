import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import * as stemController from "../controllers/stemController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

/**
 * @openapi
 * /stems:
 *   post:
 *     summary: Create a new Stem
 *     tags: [Stems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - audio
 *               - user
 *               - name
 *               - trackId
 *             properties:
 *               audio:
 *                 type: string
 *                 example: "https://example.com/audio-file.mp3"
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               name:
 *                 type: string
 *                 example: "Guitar Stem"
 *               trackId:
 *                 type: string
 *                 example: "track_987654"
 *     responses:
 *       201:
 *         description: Stem created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stem'
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "user", "user-with-access"] } as AuthorizationOptions),
    stemController.createStem);

/**
 * @openapi
 * /stems:
 *   get:
 *     summary: Get all Stems
 *     tags: [Stems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all stems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stem'
 */
router.get("/", stemController.getAllStems);

/**
 * @openapi
 * /stems/{id}:
 *   get:
 *     summary: Get a Stem by ID
 *     tags: [Stems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "stem_123456"
 *     responses:
 *       200:
 *         description: Stem retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stem'
 */
router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "user", "user-with-access"] } as AuthorizationOptions),
    stemController.getStemById);

/**
 * @openapi
 * /stems/{id}:
 *   put:
 *     summary: Update a Stem
 *     tags: [Stems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "stem_123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - audio
 *               - user
 *               - name
 *               - trackId
 *             properties:
 *               audio:
 *                 type: string
 *                 example: "https://example.com/audio-file.mp3"
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               name:
 *                 type: string
 *                 example: "Updated Guitar Stem"
 *               trackId:
 *                 type: string
 *                 example: "track_987654"
 *     responses:
 *       200:
 *         description: Stem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stem'
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "user", "user-with-access"] } as AuthorizationOptions),
    stemController.updateStem);

/**
 * @openapi
 * /stems/{id}:
 *   delete:
 *     summary: Delete a Stem by ID
 *     tags: [Stems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "stem_123456"
 *     responses:
 *       200:
 *         description: Stem deleted successfully
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "user"] } as AuthorizationOptions),
    stemController.deleteStem);

export default router;
