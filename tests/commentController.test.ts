import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as commentController from "../src/api/v1/controllers/commentController";
import * as commentService from "../src/api/v1/services/commentService";
import { Comment } from "../src/api/v1/models/commentModel"; 

jest.mock("../src/api/v1/services/commentService");

describe("Comment Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // reusable mocks for any controller tests
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("createComment", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                user: "Test User",
                comment: "Test Comment",
            };

            const mockComment: Comment = {
                id: "Test Id",
                ...mockBody,
                createdAt: new Date(),
            };

            mockReq.body = mockBody;
            (commentService.createComment as jest.Mock).mockReturnValue(mockComment);

            await commentController.createComment(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Comment created successfully.",
                data: mockComment,
                status: "success",
            });
        });
    });

    describe("getAllComments", () => {
        it("should handle successful operation", async () => {
            const mockComments: Comment[] = [
                {
                    id: "Test Id",
                    user: "Test User",
                    comment: "Test Comment",
                    createdAt: new Date(),
                },
            ];
            (commentService.getAllComments as jest.Mock).mockReturnValue(mockComments);

            await commentController.getAllComments(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Comments retrieved successfully.",
                data: mockComments,
                status: "success",
            });
        });
    });

    describe("getCommentById", () => {
        it("should handle successful operation", async () => {
            const mockComments: Comment[] = [
                { 
                    id: "Test Id",
                    user: "Test User",
                    comment: "Test Comment",
                    createdAt: new Date(),
                },
            ];

            (commentService.getCommentById as jest.Mock).mockReturnValue(mockComments);

            await commentController.getCommentById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Comment retrieved successfully.",
                data: mockComments,
                status: "success",
            });
        });
    });

    describe("deleteComment", () => {
        it("should handle successful operation", async () => {
            const mockComments: Comment[] = [
                { 
                    id: "Test Id",
                    user: "Test User",
                    comment: "Test Comment",
                    createdAt: new Date(),
                },
            ];

            (commentService.deleteComment as jest.Mock).mockReturnValue(mockComments);

            await commentController.deleteComment(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Comment deleted successfully.",
                status: "success",
            });
        });
    });

});