import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as trackController from "../src/api/v1/controllers/trackController";
import * as trackService from "../src/api/v1/services/trackService";
import { Track } from "../src/api/v1/models/trackModel"; 
import path from "path";

jest.mock("../src/api/v1/services/trackService");

describe("Track Controller", () => {
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

    describe("createTrack", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                user: "Test User",
                audio: "Test Audio",
                name: "Test Name",
            };

            const mockStem: Track = {
                id: "Test Id",
                ...mockBody,
                genre: ["Trap"],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            mockReq.body = mockBody;
            (trackService.createTrack as jest.Mock).mockReturnValue(mockStem);

            await trackController.createTrack(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Track created successfully.",
                data: mockStem,
                status: "success",
            });
        });
    });

    describe("getAllTracks", () => {
        it("should handle successful operation", async () => {
            const mockTracks: Track[] = [
                {
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    genre: ["Trap"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            (trackService.getAllTracks as jest.Mock).mockReturnValue(mockTracks);

            await trackController.getAllTracks(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tracks successfully retrieved.",
                data: mockTracks,
                status: "success",
            });
        });
    });

    describe("getTrackById", () => {
        it("should handle successful operation", async () => {
            const mockTracks: Track[] = [
                { 
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    genre: ["Trap"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];

            (trackService.getTrackById as jest.Mock).mockReturnValue(mockTracks);

            await trackController.getTrackById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Track retrieved successfully.",
                data: mockTracks,
                status: "success",
            });
        });
    });

    describe("uploadAudioToTrack", () => {
        it("should handle successful operation", async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'audio',
                originalname: 'test-audio.mp3',
                encoding: '7bit',
                mimetype: 'audio/mpeg',
                size: 1024,
                destination: 'uploads/',
                filename: '26nQPYdzJKv7iiigjAPl-Wyth - Hands Up!.mp3',
                path: path.join(__dirname, "../uploads/26nQPYdzJKv7iiigjAPl-Wyth - Hands Up!.mp3"),
                buffer: Buffer.from('mock audio content'),
                stream: null as any,
            };

            const mockTrack: Track = {
                id: "Test Id",
                audio: "uploads/26nQPYdzJKv7iiigjAPl-Wyth - Hands Up!.mp3",
                user: "Test User",
                name: "Test Name",
                genre: ["Trap"],
                createdAt: "2025-11-17T03:09:43.614Z",
                updatedAt: "2025-11-17T03:09:43.614Z",
            };

            mockReq.file = mockFile;
            (trackService.uploadAudioToTrack as jest.Mock).mockReturnValue(mockTrack);

            await trackController.uploadAudioToTrack(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Audio uploaded successfully.",
                data: mockTrack,
                status: "success",
            });
        });
    });

    describe("updateTrack", () => {
        it("should handle successful operation", async () => {
            const mockBody = {
                name: "New Test Name",
            };

            const mockTrack: Track = {
                id: "Test Id",
                audio: "Test Audio",
                user: "Test User",
                name: "Test Name",
                genre: ["Trap"],
                createdAt: "2025-11-17T03:09:43.614Z",
                updatedAt: "2025-11-17T03:09:43.614Z",
            };

            mockReq.body = mockBody;
            (trackService.updateTrack as jest.Mock).mockReturnValue(mockTrack);

            await trackController.updateTrack(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Track updated successfully.",
                data: mockTrack,
                status: "success",
            });
        });
    });

    describe("deleteTrack", () => {
        it("should handle successful operation", async () => {
            const mockTracks: Track[] = [
                { 
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    genre: ["Trap"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];

            (trackService.deleteTrack as jest.Mock).mockReturnValue(mockTracks);

            await trackController.deleteTrack(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Track deleted successfully.",
                status: "success",
            });
        });
    });

});