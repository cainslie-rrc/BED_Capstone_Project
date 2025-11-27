import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as stemController from "../src/api/v1/controllers/stemController";
import * as stemService from "../src/api/v1/services/stemService";
import { Stem } from "../src/api/v1/models/stemModel"; 

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