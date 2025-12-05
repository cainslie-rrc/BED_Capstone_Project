import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as stemController from "../src/api/v1/controllers/stemController";
import * as stemService from "../src/api/v1/services/stemService";
import { Stem } from "../src/api/v1/models/stemModel";
import path from "path";

jest.mock("../src/api/v1/services/stemService");

describe("Stem Controller", () => {
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

    describe("createStem", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                audio: "Test Audio",
                user: "Test User",
                name: "Test Name",
                trackId: "Test TrackId",
            };

            const mockStem: Stem = {
                id: "Test Id",
                ...mockBody,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            mockReq.body = mockBody;
            (stemService.createStem as jest.Mock).mockReturnValue(mockStem);

            await stemController.createStem(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Stem created successfully.",
                data: mockStem,
                status: "success",
            });
        });
    });

    describe("getAllStems", () => {
        it("should handle successful operation", async () => {
            const mockStems: Stem[] = [
                {
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    trackId: "Test TrackId",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            (stemService.getAllStems as jest.Mock).mockReturnValue(mockStems);

            await stemController.getAllStems(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Stems successfully retrieved.",
                data: mockStems,
                status: "success",
            });
        });
    });

    describe("getStemById", () => {
        it("should handle successful operation", async () => {
            const mockStems: Stem[] = [
                { 
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    trackId: "Test TrackId",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];

            (stemService.getStemById as jest.Mock).mockReturnValue(mockStems);

            await stemController.getStemById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Stem retrieved successfully.",
                data: mockStems,
                status: "success",
            });
        });
    });

        describe("uploadAudioToStem", () => {
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
    
                const mockStem: Stem = {
                    id: "Test Id",
                    audio: "uploads/26nQPYdzJKv7iiigjAPl-Wyth - Hands Up!.mp3",
                    user: "Test User",
                    name: "Test Name",
                    trackId: "Test Track Id",
                    createdAt: "2025-11-17T03:09:43.614Z",
                    updatedAt: "2025-11-17T03:09:43.614Z",
                };
    
                mockReq.file = mockFile;
                (stemService.uploadAudioToStem as jest.Mock).mockReturnValue(mockStem);
    
                await stemController.uploadAudioToStem(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
    
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Audio uploaded successfully.",
                    data: mockStem,
                    status: "success",
                });
            });
        });

    describe("updateStem", () => {
        it("should handle successful operation", async () => {
            const mockBody = {
                name: "New Test Name",
            };

            const mockStem: Stem = {
                id: "Test Id",
                audio: "Test Audio",
                user: "Test User",
                name: "Test Name",
                trackId: "Test TrackId",
                createdAt: "2025-11-17T03:09:43.614Z",
                updatedAt: "2025-11-17T03:09:43.614Z",
            };

            mockReq.body = mockBody;
            (stemService.updateStem as jest.Mock).mockReturnValue(mockStem);

            await stemController.updateStem(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Stem updated successfully.",
                data: mockStem,
                status: "success",
            });
        });
    });

    describe("deleteStem", () => {
        it("should handle successful operation", async () => {
            const mockStems: Stem[] = [
                { 
                    id: "Test Id",
                    audio: "Test Audio",
                    user: "Test User",
                    name: "Test Name",
                    trackId: "Test TrackId",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];

            (stemService.deleteStem as jest.Mock).mockReturnValue(mockStems);

            await stemController.deleteStem(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Stem deleted successfully.",
                status: "success",
            });
        });
    });

});