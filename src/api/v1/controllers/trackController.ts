import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as trackService from "../services/trackService";
import { Track } from "../models/trackModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to create a new Track
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createTrack = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { user, name, genre } = req.body;

        const audio: string = "Empty"

        const newTrack: Track = await trackService.createTrack({
            user,
            audio,
            name,
            genre,
        });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newTrack, "Track created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Tracks
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllTracks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tracks: Track[] = await trackService.getAllTracks();
        res.status(HTTP_STATUS.OK).json(
            successResponse(tracks, "Tracks successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve one Track by ID
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getTrackById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
        try {
        const id: string = req.params.id;

        const selectedTrack: Track = await trackService.getTrackById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(selectedTrack, "Track retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Uploads an audio file to a track
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const uploadAudioToTrack = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const audio = req.file;

        if (!audio) {
            throw new Error("No audio file uploaded")
        };

        const filePath = `/uploads/track/${audio.filename}`

        const uploadAudio: Track = await trackService.uploadAudioToTrack(id, {
            audio: filePath
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(uploadAudio, "Audio uploaded successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to update a Track
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateTrack = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updateTrack: Track = await trackService.updateTrack(id, {
            name
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updateTrack, "Track updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete a Track
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteTrack = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await trackService.deleteTrackAudio(id);
        await trackService.deleteTrack(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Track deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};