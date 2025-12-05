import * as trackService from "../src/api/v1/services/trackService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Track } from "../src/api/v1/models/trackModel";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Track Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a track successfully", async () => {
        // Arrange
        const mockTrackData: {
            audio: string;
            user: string;
            name: string;
            genre: Array<"House" | "Trap" | "Dubstep" | "Hardstyle" | "Techno">;
        } = {
            audio: "Test Audio",
            user: "Test User",
            name: "Test Name",
            genre: ["Trap"],
        };
        const mockDocumentId: string = "test-track-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Track = await trackService.createTrack(mockTrackData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "tracks",
            expect.objectContaining({
                audio: mockTrackData.audio,
                user: mockTrackData.user,
                name: mockTrackData.name,
                genre: mockTrackData.genre,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockTrackData.user);
        expect(result.name).toBe(mockTrackData.name);
        expect(result.genre).toEqual(mockTrackData.genre);
    });

    it("should retrieve all tracks successfully", async () => {
        // Arrange
        const mockDocuments = [
            {
                id: "1",
                data: () => ({
                    audio: "Test Audio 1",
                    user: "Test User 1",
                    name: "Test Name 1",
                    genre: ["Trap"],
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
                    genre: ["Trap"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockDocuments,
        });    

        // Act
        const result: Track[] = await trackService.getAllTracks();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("tracks");
        expect(result[0]).toEqual(
            expect.objectContaining({
                audio: "Test Audio 1",
                user: "Test User 1",
                name: "Test Name 1",
                genre: ["Trap"],
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
    });

    it("should retrieve one track successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-track-id";
        const mockStemData: {
            audio: string;
            user: string;
            name: string;
            genre: Array<"House" | "Trap" | "Dubstep" | "Hardstyle" | "Techno">;
        } = {
            audio: "Test Audio",
            user: "Test User",
            name: "Test Name",
            genre: ["Trap"],

        };

        const mockTrack = {
            id: mockDocumentId,
            data: () => mockStemData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockTrack);

        // Act
        const result: Track = await trackService.getTrackById(mockDocumentId)

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "tracks",
            mockDocumentId
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.user).toBe(mockStemData.user);
        expect(result.name).toBe(mockStemData.name);
        expect(result.genre).toEqual(mockStemData.genre);
    });

    it("should upload audio to a track", async () => {
        // Arrange
        const mockDocumentId: string = "test-track-id";
        const mockTrack: Track = {
            id: mockDocumentId,
            audio: "Empty",
            user: "Test User 1",
            name: "Test Name 1",
            genre: ["Trap"],
            createdAt: "2025-11-17T03:09:43.614Z",
            updatedAt: new Date().toISOString(),
        };

        jest.spyOn(trackService, "getTrackById").mockResolvedValue(mockTrack);


        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        await trackService.uploadAudioToTrack(mockDocumentId, mockTrack);

        // Assert
        expect(trackService.getTrackById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "tracks",
            mockDocumentId,
            mockTrack,
        );
    })

    it("should update a track successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-track-id";
        const mockTrack: Track = {
            id: mockDocumentId,
            audio: "Test Audio 1",
            user: "Test User 1",
            name: "Test Name 1",
            genre: ["Trap"],
            createdAt: "2025-11-17T03:09:43.614Z",
            updatedAt: new Date().toISOString(),
        };

        jest.spyOn(trackService, "getTrackById").mockResolvedValue(mockTrack);

        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        await trackService.updateTrack(mockDocumentId, mockTrack);

        // Assert
        expect(trackService.getTrackById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "tracks",
            mockDocumentId,
            mockTrack,
        );
    });

    it("should delete a track successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-stem-id";
        const mockTrack: Track = {
            id: mockDocumentId,
            audio: "Test Audio 1",
            user: "Test User 1",
            name: "Test Name 1",
            genre: ["Trap"],
            createdAt: "2025-11-17T03:09:43.614Z",
            updatedAt: "2025-11-17T03:09:43.614Z",
        };

        // jest.spyOn creates a mock for a specific method/function on an object, in our example the itemService
        jest.spyOn(trackService, "getTrackById").mockResolvedValue(mockTrack);

        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        // Act
        await trackService.deleteTrack(mockDocumentId);

        // Assert
        expect(trackService.getTrackById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "tracks",
            mockDocumentId
        );
    });

    it("should delete audio from a track successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-track-id";
        const mockTrack: Track = {
            id: mockDocumentId,
            audio: "Test Audio 1",
            user: "Test User 1",
            name: "Test Name 1",
            genre: ["Trap"],
            createdAt: "2025-11-17T03:09:43.614Z",
            updatedAt: new Date().toISOString(),
        };

        jest.spyOn(trackService, "getTrackById").mockResolvedValue(mockTrack);
        jest.spyOn(trackService, "deleteTrackAudio");

        // Act
        await trackService.deleteTrackAudio(mockDocumentId);

        // Assert
        expect(trackService.getTrackById).toHaveBeenCalledWith(mockDocumentId);
        expect(trackService.deleteTrackAudio).toHaveBeenCalledWith(
            mockDocumentId,
        );
    });
});
