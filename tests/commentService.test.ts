import * as commentService from "../src/api/v1/services/commentService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Comment } from "../src/api/v1/models/commentModel";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Comment Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a comment successfully", async () => {
        // Arrange
        const mockCommentData: {
            user: string;
            comment: string;
        } = {
            user: "Test User",
            comment: "Test Comment",
        };
        const mockDocumentId: string = "test-comment-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Comment = await commentService.createComment(mockCommentData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "comments",
            expect.objectContaining({
                user: mockCommentData.user,
                comment: mockCommentData.comment,
                createdAt: expect.any(Date),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockCommentData.user);
        expect(result.comment).toBe(mockCommentData.comment);
    });

    it("should retrieve all comments successfully", async () => {
        // Arrange
        const mockDocuments = [
            {
                id: "1",
                data: () => ({
                    user: "Test User 1",
                    comment: "Test Comment 1",
                    createdAt: new Date(),
                }),
            },
            {
                id: "2",
                data: () => ({
                    user: "Test User 2",
                    comment: "Test Comment 2",
                    createdAt: new Date(),
                }),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockDocuments,
        });    

        // Act
        const result: Comment[] = await commentService.getAllComments();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("comments");
        expect(result[0]).toEqual(
            expect.objectContaining({
                id: "1",
                user: "Test User 1",
                comment: "Test Comment 1",
                createdAt: expect.any(Date),
            })
        );
    });

    it("should retrieve one comment successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-comment-id";
        const mockCommentData: {
            user: string;
            comment: string;
        } = {
            user: "Test User",
            comment: "Test Comment",
        };

        const mockComment = {
            id: mockDocumentId,
            data: () => mockCommentData,
            createdAt: new Date(),
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockComment);

        // Act
        const result: Comment = await commentService.getCommentById(mockDocumentId)

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "comments",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockCommentData.user)
        expect(result.comment).toBe(mockCommentData.comment);
    });

    it("should delete an comment successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-comment-id";
        const mockComment: Comment = {
            id: mockDocumentId,
            user: "Test User",
            comment: "Test Comment",
            createdAt: new Date(),
        };

        jest.spyOn(commentService, "getCommentById").mockResolvedValue(mockComment);

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        // Act
        await commentService.deleteComment(mockDocumentId);

        // Assert
        expect(commentService.getCommentById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "comments",
            mockDocumentId
        );
    });
});
