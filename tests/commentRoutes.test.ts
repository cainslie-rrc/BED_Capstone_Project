import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as commentController from "../src/api/v1/controllers/commentController"

jest.mock("../src/api/v1/controllers/commentController", () => ({
    createComment: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    getAllComments: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getCommentById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteComment: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Comment Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/comments/", () => {
        it("should call createComment controller with valid data", async () => {
            const mockComment = {
                id: "Test Id",
                user: "Test User",
                comment: "Test Comment",
                createdAt: new Date(),
            }; 

            await request(app).post("/api/v1/comments/").send(mockComment);
            expect(commentController.createComment).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/comments/", () => {
        it("should call getAllComments controller", async () => {
            await request(app).get("/api/v1/comments/");
            expect(commentController.getAllComments).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/comments/:id", () => {
        it("should call getCommentById controller with valid data", async () => {
            await request(app).get("/api/v1/comments/1");
            expect(commentController.getCommentById).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/comments/:id", () => {
        it("should call deleteComment controller with valid data", async () => {
            await request(app).delete("/api/v1/comments/1");
            expect(commentController.deleteComment).toHaveBeenCalled();
        });
    });
});