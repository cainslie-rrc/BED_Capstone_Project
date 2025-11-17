import express, { Router } from "express";
import * as commentController from "../controllers/commentController";

const router: Router = express.Router();

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a new Comment
 *     tags: [Comments]
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
 *               - comment
 *             properties:
 *               user:
 *                 type: string
 *                 minLength: 1
 *                 example: "John Doe"
 *               comment:
 *                 type: string
 *                 minLength: 1
 *                 example: "This is a great post!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.post("/", commentController.createComment);

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Get all Comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", commentController.getAllComments);

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Get a Comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "cmt_123456"
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.get("/:id", commentController.getCommentById);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Delete a Comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "cmt_123456"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
router.delete("/:id", commentController.deleteComment);

export default router;
