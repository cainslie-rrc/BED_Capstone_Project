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
        const { user, audio, name, genre } = req.body;

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
            successResponse(tracks, "Tracks successfully")
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
        const { audio } = req.body;

        const updateTrack: Track = await trackService.updateTrack(id, {
            audio
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

        await trackService.deleteTrack(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Track successfully deleted.")
        );
    } catch (error: unknown) {
        next(error);
    }
};