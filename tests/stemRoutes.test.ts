import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as stemController from "../src/api/v1/controllers/stemController"

jest.mock("../src/api/v1/controllers/stemController", () => ({
    createStem: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    getAllStems: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getStemById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    uploadAudioToStem: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    updateStem: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteStem: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Stem Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/stems/", () => {
        it("should call createStem controller with valid data", async () => {
            const mockStem = {
                id: "Test Id",
                user: "Test User",
                name: "Test Name",
                trackId: "Test TrackId",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }; 

            await request(app).post("/api/v1/stems/").send(mockStem);
            expect(stemController.createStem).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/stems/", () => {
        it("should call getAllStems controller", async () => {
            await request(app).get("/api/v1/stems/");
            expect(stemController.getAllStems).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/stems/:id", () => {
        it("should call getStemById controller with valid data", async () => {
            await request(app).get("/api/v1/stems/1");
            expect(stemController.getStemById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/stems/:id/audio", () => {
        it("should call uploadAudioToStem controller with valid data", async () => {
            const mockStem = {
                audio: "uploads/stems/test_audio.mp3",
            };

            await request(app).put("/api/v1/stems/1/audio").send(mockStem);
            expect(stemController.uploadAudioToStem).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/stems/:id", () => {
        it("should call updateStem controller with valid data", async () => {
            const mockStem = {
                user: "Test User",
                name: "Test Name",
            };

            await request(app).put("/api/v1/stems/1").send(mockStem);
            expect(stemController.updateStem).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/stems/:id", () => {
        it("should call deleteStem controller with valid data", async () => {
            await request(app).delete("/api/v1/stems/1");
            expect(stemController.deleteStem).toHaveBeenCalled();
        });
    });
});