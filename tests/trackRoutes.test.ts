import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as trackController from "../src/api/v1/controllers/trackController";

jest.mock("../src/api/v1/controllers/trackController", () => ({
    createTrack: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    getAllTracks: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getTrackById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    uploadAudioToTrack: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    updateTrack: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteTrack: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
    return jest.fn((_req: Request, _res: Response, next: NextFunction) =>
        next()
    );
});

jest.mock("../src/api/v1/middleware/authorize", () => {
    return jest.fn(
        (_mockOptions) => (_req: Request, _res: Response, next: NextFunction) =>
            next()
    );
});

describe("Track Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/tracks/", () => {
        it("should call createTrack controller with valid data", async () => {
            const mockTrack = {
                id: "Test Id",
                user: "Test User",
                name: "Test Name",
                genre: ["House"],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }; 

            await request(app)
            .post("/api/v1/tracks/")
            .set("Authorization", "Bearer mockedToken")
            .send(mockTrack);
            expect(trackController.createTrack).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tracks/", () => {
        it("should call getAllTracks controller", async () => {
            await request(app).get("/api/v1/tracks/");
            expect(trackController.getAllTracks).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tracks/:id", () => {
        it("should call getTackById controller with valid data", async () => {
            await request(app).get("/api/v1/tracks/1");
            expect(trackController.getTrackById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/tracks/:id/audio", () => {
        it("should call uploadAudioToTrack controller with valid data", async () => {
            const mockStem = {
                audio: "uploads/tracks/test_audio.mp3",
            };

            await request(app)
            .put("/api/v1/tracks/1/audio")
            .set("Authorization", "Bearer mockedToken")
            .send(mockStem);
            expect(trackController.uploadAudioToTrack).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/tracks/:id", () => {
        it("should call updateTrack controller with valid data", async () => {
            const mockTrack = {
                name: "Test Name",
            };

            await request(app)
            .put("/api/v1/tracks/1")
            .set("Authorization", "Bearer mockedToken")
            .send(mockTrack);
            expect(trackController.updateTrack).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/tracks/:id", () => {
        it("should call deleteTrack controller with valid data", async () => {
            await request(app)
            .delete("/api/v1/tracks/1")
            .set("Authorization", "Bearer mockedToken")
            expect(trackController.deleteTrack).toHaveBeenCalled();
        });
    });
});