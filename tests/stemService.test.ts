import * as stemService from "../src/api/v1/services/stemService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Stem } from "../src/api/v1/models/stemModel";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Stem Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a stem successfully", async () => {
        // Arrange
        const mockStemData: {
            audio: string;
            user: string;
            name: string;
            trackId: string;
        } = {
            audio: "Test Audio",
            user: "Test User",
            name: "Test Name",
            trackId: "Test ID"
        };
        const mockDocumentId: string = "test-stem-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Stem = await stemService.createStem(mockStemData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "stems",
            expect.objectContaining({
                audio: mockStemData.audio,
                user: mockStemData.user,
                name: mockStemData.name,
                trackId: mockStemData.trackId,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockStemData.user);
        expect(result.name).toBe(mockStemData.name);
        expect(result.trackId).toBe(mockStemData.trackId);
    });

    it("should retrieve all stems successfully", async () => {
        // Arrange
        const mockDocuments = [
            {
                id: "1",
                data: () => ({
                    audio: "Test Audio 1",
                    user: "Test User 1",
                    name: "Test Name 1",
                    trackId: "Test ID 1",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            },
            {
                id: "2",
                data: () => ({
                    audio: "Test Audio 2",
                    user: "Test User 2",
                    name: "Test Name 2",
                    trackId: "Test ID 2",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockDocuments,
        });    

        // Act
        const result: Stem[] = await stemService.getAllStems();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("stems");
        expect(result[0]).toEqual(
            expect.objectContaining({
                audio: "Test Audio 1",
                user: "Test User 1",
                name: "Test Name 1",
                trackId: "Test ID 1",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
    });

    it("should retrieve one stem successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-stem-id";
        const mockStemData: {
            audio: string;
            user: string;
            name: string;
            trackId: string;
        } = {
            audio: "Test Audio",
            user: "Test User",
            name: "Test Name",
            trackId: "Test ID",

        };

        const mockStem = {
            id: mockDocumentId,
            data: () => mockStemData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockStem);

        // Act
        const result: Stem = await stemService.getStemById(mockDocumentId)

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "stems",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockStemData.user);
        expect(result.name).toBe(mockStemData.name);
        expect(result.trackId).toBe(mockStemData.trackId);
    });

    // it("should update a stem successfully", async () => {
    //     // Arrange
    //     const mockDocumentId: string = "test-stem-id";
    //     const mockStem: Stem = {
    //         id: mockDocumentId,
    //         audio: "Test Audio 1",
    //         user: "Test User 1",
    //         name: "Test Name 1",
    //         trackId: "Test ID 1",
    //         createdAt: expect.any(String),
    //         updatedAt: expect.any(String),
    //     };

    //     jest.spyOn(stemService, "getStemById").mockResolvedValue(mockStem);

    //     (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
    //         mockDocumentId
    //     );

    //     // Act
    //     await stemService.updateStem(mockDocumentId, mockStem);

    //     // Assert
    //     expect(stemService.getStemById).toHaveBeenCalledWith(mockDocumentId);
    //     expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
    //         "stems",
    //         mockDocumentId,
    //         mockStem,
    //     );
    // });


    it("should delete an stems successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-stem-id";
        const mockStem: Stem = {
            id: mockDocumentId,
            audio: "Test Audio 1",
            user: "Test User 1",
            name: "Test Name 1",
            trackId: "Test ID 1",
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        };

        // jest.spyOn creates a mock for a specific method/function on an object, in our example the itemService
        jest.spyOn(stemService, "getStemById").mockResolvedValue(mockStem);

        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        // Act
        await stemService.deleteStem(mockDocumentId);

        // Assert
        expect(stemService.getStemById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "stems",
            mockDocumentId
        );
    });
});
