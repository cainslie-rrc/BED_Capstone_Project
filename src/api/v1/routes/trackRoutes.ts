import express, { Router } from "express";
import { upload } from "../../../../config/multerConfig";
import * as trackController from "../controllers/trackController";

const router: Router = express.Router();

/**
 * @openapi
 * /tracks:
 *   post:
 *     summary: Create a new Track
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - audio
 *               - name
 *             properties:
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               audio:
 *                 type: string
 *                 example: "https://example.com/audio-file.mp3"
 *               name:
 *                 type: string
 *                 example: "My First Track"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["House", "Trap", "Dubstep", "Hardstyle", "Techno"]
 *                 example: ["Trap"]
 *     responses:
 *       201:
 *         description: Track created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 */
router.post("/", trackController.createTrack);

/**
 * @openapi
 * /tracks:
 *   get:
 *     summary: Get all Tracks
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 */
router.get("/", trackController.getAllTracks);

/**
 * @openapi
 * /tracks/{id}:
 *   get:
 *     summary: Get a Track by ID
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "track_123456"
 *     responses:
 *       200:
 *         description: Track retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 */
router.get("/:id", trackController.getTrackById);

router.put(
    "/:id/audio",
    upload.single("audio"),
    trackController.uploadAudioToTrack
)

/**
 * @openapi
 * /tracks/{id}:
 *   put:
 *     summary: Update a Track
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "track_123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - audio
 *               - name
 *             properties:
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               audio:
 *                 type: string
 *                 example: "https://example.com/audio-file.mp3"
 *               name:
 *                 type: string
 *                 example: "Updated Track Name"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["House", "Trap", "Dubstep", "Hardstyle", "Techno"]
 *                 example: ["House", "Techno"]
 *     responses:
 *       200:
 *         description: Track updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 */
router.put("/:id", trackController.updateTrack);

/**
 * @openapi
 * /tracks/{id}:
 *   delete:
 *     summary: Delete a Track by ID
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "track_123456"
 *     responses:
 *       200:
 *         description: Track deleted successfully
 */
router.delete("/:id", trackController.deleteTrack);

export default router;
