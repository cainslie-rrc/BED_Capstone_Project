/**
 * @openapi
 * components:
 *   schemas:
 *     Track:
 *       type: object
 *       required:
 *         - user
 *         - audio
 *         - name
 *       properties:
 *         user:
 *           type: string
 *           description: The name of the track creator
 *           example: "John Doe"
 *         audio:
 *           type: string
 *           description: URL of the audio file
 *           example: "https://example.com/audio-file.mp3"
 *         name:
 *           type: string
 *           description: The name of the track
 *           example: "My First Track"
 *         genre:
 *           type: array
 *           description: List of genres the track belongs to
 *           items:
 *             type: string
 *             enum: ["House", "Trap", "Dubstep", "Hardstyle", "Techno"]
 *           example: ["Trap"]
 *
 *     Stem:
 *       type: object
 *       required:
 *         - audio
 *         - user
 *         - name
 *         - trackId
 *       properties:
 *         audio:
 *           type: string
 *           description: URL of the stem audio file
 *           example: "https://example.com/audio-file.mp3"
 *         user:
 *           type: string
 *           description: Name of the user who created the stem
 *           example: "John Doe"
 *         name:
 *           type: string
 *           description: The name of the stem
 *           example: "Guitar Stem"
 *         trackId:
 *           type: string
 *           description: The ID of the track this stem belongs to
 *           example: "track_987654"
 *
 *     Comment:
 *       type: object
 *       required:
 *         - user
 *         - comment
 *       properties:
 *         user:
 *           type: string
 *           description: Name of the user who made the comment
 *           example: "John Doe"
 *         comment:
 *           type: string
 *           description: The comment text
 *           example: "This is a great post!"
 */
