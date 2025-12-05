import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as stemService from "../services/stemService";
import { Stem } from "../models/stemModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to create one new Stem file
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createStem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { audio, user, name, trackId } = req.body;

        const newStem: Stem = await stemService.createStem({
            audio,
            user,
            name,
            trackId,
        });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newStem, "Stem created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Stems
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllStems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const stems: Stem[] = await stemService.getAllStems();
        res.status(HTTP_STATUS.OK).json(
            successResponse(stems, "Stems successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve one of the Stems by ID
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getStemById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
        try {
        const id: string = req.params.id;

        const selectedStem: Stem = await stemService.getStemById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(selectedStem, "Stem retrieved successfully.")
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
export const uploadAudioToStem = async (
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

        const filePath = `/uploads/stems/${audio.filename}`

        const uploadAudio: Stem = await stemService.uploadAudioToStem(id, {
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
 * Manages requests and responses to update one of the Stems
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateStem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { audio, user, name } = req.body;

        const updatedItem: Stem = await stemService.updateStem(id, {
            audio,
            user,
            name, 
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedItem, "Stem updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete one of the Stems
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteStem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await stemService.deleteStem(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Stem deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};